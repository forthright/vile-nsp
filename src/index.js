let path = require("path")
let nsp = require("nsp")
let Promise = require("bluebird")
let _ = require("lodash")
let vile = require("@brentlintner/vile")
let log = vile.logger.create("nsp")

const PACKAGE_JSON = "package.json"

let nsp_opts = (plugin_config) => {
  let opts = {}

  opts.package = path.join(
    process.cwd(), _.get(plugin_config, "package", PACKAGE_JSON)
  )

  if (_.has(plugin_config, "shrinkwrap")) {
    opts.shrinkwrap = path.join(process.cwd(), plugin_config.shrinkwrap)
  }

  if (plugin_config.offline) opts.offline = true

  if (_.has(plugin_config, "advisories")) {
    opts.advisoriesPath = path.join(process.cwd(), plugin_config.advisories)
  }

  return opts
}

let punish = (plugin_config) =>
  new Promise((resolve, reject) => {
    nsp.check(
      nsp_opts(_.get(plugin_config, "config", {})),
      (err, results) => {
        if (err) log.error(err)

        let issues = _.map(results, (result) => {
          // TODO: test branches where properties don't exist
          let title = _.get(result, "title", "[no title]")
          let patched = _.get(result, "patched_versions", "?")
          let dep_of = _.trim(_.get(result, "path", []).join(" => "))
          let name = _.get(result, "module")
          let version = _.get(result, "version")

          return vile.issue({
            type: vile.SEC,
            path: PACKAGE_JSON,
            title: title,
            message: `${ title } (${ dep_of }) (patched in ${ patched })`,
            signature: `nsp::${name}::${version}::${title}`,
            package: name,
            version: version,
            advisory: _.get(result, "advisory"),
            vulnerable: [ _.get(result, "vulnerable_versions") ],
            patched: [ _.get(result, "patched_versions") ]
          })
        })

        resolve(issues)
      }
    )
  })

module.exports = {
  punish: punish
}
