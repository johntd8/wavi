'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require("../utils/utils");
var cheerio = require('cheerio');
var _ = require('underscore')._;
var db = require("../lib/database");
var estraverse = require('estraverse');
var esrecurse = require('esrecurse');
var escope = require('escope');
var assignmentExpression = require("./javascript/assignmentExpression");
var initStatement = require("./javascript/initStatement");
var umd = require('acorn-umd');
var acorn = require("acorn/dist/acorn_loose");
var parsersHelper = require("../utils/parsersHelper");
var instance = null;

var path = require('path');

var Javascript = function () {
        function Javascript() {
                _classCallCheck(this, Javascript);

                if (!instance) {
                        instance = this;
                }

                return instance;
        }

        _createClass(Javascript, [{
                key: 'operation',
                value: function operation(file) {
                        return new Promise(function (resolve, reject) {
                                Promise.resolve(file).then(utils.read).then(instance.parseAST).then(instance.findJsElements).catch(function (error) {
                                        console.log("err", error);
                                }).then(function () {
                                        resolve();
                                });
                        });
                }
        }, {
                key: 'parseAST',
                value: function parseAST(result) {
                        return new Promise(function (resolve, reject) {

                                var path = result[0];
                                var data = result[1];
                                var ast = acorn.parse_dammit(data, { locations: true, sourceType: 'module', ecmaVersion: 6, ranges: false });

                                resolve([path, ast]);
                        });
                }
        }, {
                key: 'getScope',
                value: function getScope(result) {
                        return new Promise(function (resolve, reject) {
                                var ast = result[1];
                                try {
                                        var scopeManager = escope.analyze(ast, { sourceType: "module", ecmaVersion: 6 });

                                        result[1] = scopeManager.acquire(ast);
                                        resolve(result);
                                } catch (e) {
                                        reject("Bad Scope");
                                }
                        });
                }
        }, {
                key: 'findJsElements',
                value: function findJsElements(result) {
                        return new Promise(function (resolve, reject) {
                                var path = result[0];
                                var ast = result[1];
                                var scopeManager = escope.analyze(ast, { sourceType: "module", ecmaVersion: 6 });
                                var allScopes = scopeManager.scopes;
                                //let classId = db.addClass({name:path});

                                var fileInfo = _.findWhere(db.getIdentifiedFiles(), { name: path });

                                var classId = fileInfo.id;
                                instance.checkImports(ast, fileInfo);

                                

                                var curClassId = classId;
                                

                                resolve(ast);
                        });
                }
        }, {
                key: 'checkImports',
                value: function checkImports(ast, parent) {

                        return new Promise(function (resolve, reject) {
                                var imports = umd(ast, { es6: true, amd: true, cjs: true });

                                _.each(imports, function (imp) {

                                        if (imp.source && imp.source.length === undefined) {
                                                imp.source = [imp.source];
                                        } else {
                                                imp.source = imp.sources;
                                        }

                                        _.each(imp.source, function (source) {
                                                if (!_.isUndefined(source) && source.type === "Literal") {
                                                        var correctedPath = utils.correctPathSync(source.value, parent.name, ".js");

                                                        // Find correspondance
                                                        var candidate = _.findWhere(db.getIdentifiedFiles(), { name: correctedPath });

                                                        if (candidate !== undefined) {
                                                                // Create Relation
                                                                db.addRelations({ from: parent.id, to: candidate.id, relationship: "generalization", cluster: true });
                                                        }
                                                }
                                        });
                                });
                                resolve();
                                //reject();
                        });
                }
        }]);

        return Javascript;
}();

module.exports = new Javascript();
//# sourceMappingURL=javascript.js.map