let fs = require("fs")
let path = require("path")
// TODO: HACK project needs a main file
let nsp_audit = require("./../node_modules/nsp/lib/auditPackage")
let Promise = require("bluebird")
let _ = require("lodash")
let vile = require("@brentlintner/vile")
let log = vile.logger.create("nsp")

Promise.promisifyAll(fs)

const PACKAGE_JSON = "package.json"

let package_json = () =>
  path.join(process.cwd(), PACKAGE_JSON)

let punish = (plugin_config) =>
  new Promise((resolve, reject) => {
    nsp_audit(package_json(), (err, results) => {
      if (err) log.error(err)

      let issues = _.map(results, (result) => {
        let title = _.get(result, "advisory.title")
        let patched = _.get(result, "advisory.patched_versions")
        let dep_of = _.trim(_.get(result, "dependencyOf", []).join(" > "))

        return vile.issue(
          vile.ERROR,
          PACKAGE_JSON,
          `${ title } (${ dep_of }) (patched in ${ patched })`
        )
      })

      resolve(issues)
    })
  })

module.exports = {
  punish: punish
}
