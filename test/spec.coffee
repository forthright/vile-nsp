path = require "path"
mimus = require "mimus"
chai = require "./helpers/sinon_chai"
nsp_check_fixture = require "./fixtures/nsp-response"
nsp_issues_fixture = require "./fixtures/nsp-issues"
nsp = mimus.require "./../lib", __dirname, [ "nsp" ]
nsp_lib = mimus.get nsp, "nsp"
vile = mimus.get nsp, "vile"
log = mimus.get nsp, "log"

expect = chai.expect
cwd_package_json = path.join process.cwd(), "package.json"
cwd_custom_package_json = path.join process.cwd(), "custom", "package.json"
cwd_shrinkwrap_json = path.join process.cwd(), "shrinkwrap.json"

expect_to_call_nsp_check = (opts, check_opts, done) ->
  nsp
    .punish { config: opts }
    .should.be.fulfilled.notify ->
      setTimeout ->
        expect(nsp_lib.check).to.have.been.calledWith check_opts
        done()
  return

describe "nsp", ->
  afterEach mimus.reset
  after mimus.restore

  before -> mimus.stub log, "error"

  describe "#punish", ->
    error = new Error "nsp check failed"

    describe "when there is an error", (done) ->
      beforeEach -> nsp_lib.check.callsArgWith 1, error

      it "logs the error", (done) ->
        nsp
          .punish {}
          .should.be.fulfilled.notify ->
            setTimeout ->
              log.error.should.have.been.calledWith error
              done()
        return

    describe "with no errors", ->
      beforeEach ->
        nsp_lib.check.callsArgWith 1, undefined, nsp_check_fixture

      describe "parsing a package.json, by default", ->
        it "converts a nsp v2 node api call to issues", ->
          nsp
            .punish {}
            .should.eventually.eql nsp_issues_fixture

      describe "specifying a no package/shrinkwrap file via config", ->
        it "sets the package option", (done) ->
          check_opts = package: cwd_package_json
          expect_to_call_nsp_check {}, check_opts, done

      describe "specifying a package file path via config", ->
        it "sets the package option", (done) ->
          opts = package: "custom/package.json"
          check_opts = package: path.join(
            process.cwd(), "custom", "package.json")

          expect_to_call_nsp_check opts, check_opts, done

      describe "when given a shrinkwrap file via config", ->
        it "sets both the shrinkwrap and package option", (done) ->
          opts = shrinkwrap: "shrinkwrap.json"
          check_opts =
            package: cwd_package_json
            shrinkwrap: path.join process.cwd(), "shrinkwrap.json"

          expect_to_call_nsp_check opts, check_opts, done

      describe "when given a custom advisories path", ->
        it "sets both the advisories path option", (done) ->
          opts = advisories: "advisories.json"

          check_opts =
            package: cwd_package_json
            advisoriesPath: path.join process.cwd(), "advisories.json"

          expect_to_call_nsp_check opts, check_opts, done

      describe "when offline is set", ->
        it "sets both the shrinkwrap and package option", (done) ->
          opts = offline: true
          check_opts = package: cwd_package_json, offline: true
          expect_to_call_nsp_check opts, check_opts, done
