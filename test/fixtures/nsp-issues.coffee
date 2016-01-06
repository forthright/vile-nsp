_ = require "lodash"
nsp_check_fixture = require "./nsp-response"

module.exports = _.map nsp_check_fixture, (notice) ->
  "data": {
    module: notice.module,
    link: notice.advisory,
    path: notice.path,
    title: notice.title,
    version: notice.version,
    vulnerable: notice.vulnerable_versions,
    patched: notice.patched_versions
  },
  "file": "package.json",
  "msg": "#{notice.title} (#{_.trim(notice.path.join(" > "))}) " +
          "(patched in #{notice.patched_versions})",
  "type": "error",
  "where": { "end": {}, "start": {} }
