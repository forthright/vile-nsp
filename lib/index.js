"use strict";

var path = require("path");
var nsp = require("nsp");
var Promise = require("bluebird");
var _ = require("lodash");
var vile = require("@forthright/vile");

var PACKAGE_JSON = "package.json";

var nsp_opts = function nsp_opts(plugin_config) {
  var opts = {};

  opts.package = path.join(process.cwd(), _.get(plugin_config, "package", PACKAGE_JSON));

  if (_.has(plugin_config, "shrinkwrap")) {
    opts.shrinkwrap = path.join(process.cwd(), plugin_config.shrinkwrap);
  }

  if (plugin_config.offline) opts.offline = true;

  if (_.has(plugin_config, "advisories")) {
    opts.advisoriesPath = path.join(process.cwd(), plugin_config.advisories);
  }

  return opts;
};

var get_config = function get_config(plugin_config) {
  return _.get(plugin_config, "config", {});
};

var into_issues = function into_issues(nsp_results) {
  return _.map(nsp_results, function (result) {
    // TODO: test branches where properties don't exist
    var title = _.get(result, "title", "[no title]");
    var patched = _.get(result, "patched_versions", "?");
    var dep_of = _.trim(_.get(result, "path", []).join(" => "));
    var name = _.get(result, "module");
    var version = _.get(result, "version");

    return vile.issue({
      type: vile.SEC,
      path: PACKAGE_JSON,
      title: title,
      message: title + " (" + dep_of + ") (patched in " + patched + ")",
      signature: "nsp::" + name + "::" + version + "::" + title,
      security: {
        package: name,
        version: version,
        advisory: _.get(result, "advisory"),
        vulnerable: [_.get(result, "vulnerable_versions")],
        patched: [_.get(result, "patched_versions")]
      }
    });
  });
};

var is_empty_after_trim = function is_empty_after_trim(arr) {
  return _.isEmpty(_.reject(arr, function (item) {
    return _.isEmpty(item);
  }));
};

var punish = function punish(plugin_config) {
  return new Promise(function (resolve, reject) {
    nsp.check(nsp_opts(get_config(plugin_config)), function (err, results) {
      if (err) {
        reject(err);
      } else if (is_empty_after_trim(results)) {
        resolve([]);
      } else {
        resolve(into_issues(results));
      }
    });
  });
};

module.exports = {
  punish: punish
};