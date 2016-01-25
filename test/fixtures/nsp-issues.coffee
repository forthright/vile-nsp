_ = require "lodash"
nsp_check_fixture = require "./nsp-response"

module.exports = _.map nsp_check_fixture, (notice) ->
  type: "security",
  path: "package.json",
  title: notice.title,
  message: "#{notice.title} " +
            "(#{_.trim(notice.path.join(" => "))}) " +
            "(patched in #{notice.patched_versions})",
  signature: "nsp::#{notice.module}::#{notice.version}::#{notice.title}",
  security: {
    package: notice.module,
    version: notice.version,
    advisory: notice.advisory,
    vulnerable: [ notice.vulnerable_versions ],
    patched: [ notice.patched_versions ],
  }
