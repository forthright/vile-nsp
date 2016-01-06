"use strict";

var path = require("path");
var nsp = require("nsp");
var Promise = require("bluebird");
var _ = require("lodash");
var vile = require("@brentlintner/vile");
var log = vile.logger.create("nsp");

var PACKAGE_JSON = "package.json";

var nsp_opts = function nsp_opts(plugin_config) {
  var opts = {};

  opts["package"] = path.join(process.cwd(), _.get(plugin_config, "package", PACKAGE_JSON));

  if (_.has(plugin_config, "shrinkwrap")) {
    opts.shrinkwrap = path.join(process.cwd(), plugin_config.shrinkwrap);
  }

  if (plugin_config.offline) opts.offline = true;

  if (_.has(plugin_config, "advisories")) {
    opts.advisoriesPath = path.join(process.cwd(), plugin_config.advisories);
  }

  return opts;
};

var punish = function punish(plugin_config) {
  return new Promise(function (resolve, reject) {
    nsp.check(nsp_opts(_.get(plugin_config, "config", {})), function (err, results) {
      if (err) log.error(err);

      var issues = _.map(results, function (result) {
        // TODO: test branches where properties don't exist
        var title = _.get(result, "title", "[no title]");
        var patched = _.get(result, "patched_versions", "?");
        var dep_of = _.trim(_.get(result, "path", []).join(" > "));

        return vile.issue(
        // TODO: send vile.DEPENDENCY when implemented
        vile.ERROR, PACKAGE_JSON, title + " (" + dep_of + ") (patched in " + patched + ")", undefined, undefined, {
          module: _.get(result, "module"),
          link: _.get(result, "advisory"),
          path: _.get(result, "path"),
          title: _.get(result, "title"),
          version: _.get(result, "version"),
          vulnerable: _.get(result, "vulnerable_versions"),
          patched: _.get(result, "patched_versions")
        });
      });

      resolve(issues);
    });
  });
};

module.exports = {
  punish: punish
};