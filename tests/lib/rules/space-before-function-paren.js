/**
 * @fileoverview Tests for space-before-function-paren.
 * @author Mathias Schreck <https://github.com/lo1tuma>
 * @copyright 2015 Mathias Schreck
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("../../../lib/testers/eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/space-before-function-paren", {

    valid: [
        { code: "function foo () {}" },
        { code: "var foo = function () {}" },
        { code: "var bar = function foo () {}" },
        { code: "var obj = { get foo () {}, set foo (val) {} };" },
        {
            code: "var obj = { foo () {} };",
            ecmaFeatures: { objectLiteralShorthandMethods: true }
        },
        { code: "function* foo () {}", ecmaFeatures: { generators: true } },
        { code: "var foo = function *() {};", ecmaFeatures: { generators: true } },

        { code: "function foo() {}", options: ["never"] },
        { code: "var foo = function() {}", options: ["never"] },
        { code: "var bar = function foo() {}", options: ["never"] },
        { code: "var obj = { get foo() {}, set foo(val) {} };", options: ["never"] },
        {
            code: "var obj = { foo() {} };",
            options: ["never"],
            ecmaFeatures: { objectLiteralShorthandMethods: true }
        },
        {
            code: "function* foo() {}",
            options: ["never"],
            ecmaFeatures: { generators: true }
        },
        {
            code: "var foo = function*() {};",
            options: ["never"],
            ecmaFeatures: { generators: true }
        },

        {
            code: [
                "function foo() {}",
                "var bar = function () {}",
                "function* baz() {}",
                "var bat = function*() {};",
                "var obj = { get foo() {}, set foo(val) {}, bar() {} };"
            ].join("\n"),
            options: [ { named: "never", anonymous: "always" } ],
            ecmaFeatures: {
                generators: true,
                objectLiteralShorthandMethods: true
            }
        },
        {
            code: [
                "function foo () {}",
                "var bar = function() {}",
                "function* baz () {}",
                "var bat = function* () {};",
                "var obj = { get foo () {}, set foo (val) {}, bar () {} };"
            ].join("\n"),
            options: [ { named: "always", anonymous: "never" } ],
            ecmaFeatures: {
                generators: true,
                objectLiteralShorthandMethods: true
            }
        },
        {
            code: "class Foo { constructor() {} *method() {} }",
            options: [ { named: "never", anonymous: "always" } ],
            ecmaFeatures: {
                classes: true,
                generators: true
            }
        },
        {
            code: "class Foo { constructor () {} *method () {} }",
            options: [ { named: "always", anonymous: "never" } ],
            ecmaFeatures: {
                classes: true,
                generators: true
            }
        }
    ],

    invalid: [
        {
            code: "function foo() {}",
            errors: [
                {
                    type: "FunctionDeclaration",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 13
                }
            ]
        },
        {
            code: "var foo = function() {}",
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "var bar = function foo() {}",
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 23
                }
            ]
        },
        {
            code: "var obj = { get foo() {}, set foo(val) {} };",
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 20
                },
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 34
                }
            ]
        },
        {
            code: "var obj = { foo() {} };",
            ecmaFeatures: { objectLiteralShorthandMethods: true },
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 16
                }
            ]
        },
        {
            code: "function* foo() {}",
            ecmaFeatures: { generators: true },
            errors: [
                {
                    type: "FunctionDeclaration",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 14
                }
            ]
        },

        {
            code: "function foo () {}",
            options: ["never"],
            errors: [
                {
                    type: "FunctionDeclaration",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 13
                }
            ]
        },
        {
            code: "var foo = function () {}",
            options: ["never"],
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "var bar = function foo () {}",
            options: ["never"],
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 23
                }
            ]
        },
        {
            code: "var obj = { get foo () {}, set foo (val) {} };",
            options: ["never"],
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 20
                },
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 35
                }
            ]
        },
        {
            code: "var obj = { foo () {} };",
            options: ["never"],
            ecmaFeatures: { objectLiteralShorthandMethods: true },
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 16
                }
            ]
        },
        {
            code: "function* foo () {}",
            options: ["never"],
            ecmaFeatures: { generators: true },
            errors: [
                {
                    type: "FunctionDeclaration",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 14
                }
            ]
        },

        {
            code: [
                "function foo () {}",
                "var bar = function() {}",
                "var obj = { get foo () {}, set foo (val) {}, bar () {} };"
            ].join("\n"),
            options: [ { named: "never", anonymous: "always" } ],
            ecmaFeatures: { objectLiteralShorthandMethods: true },
            errors: [
                {
                    type: "FunctionDeclaration",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 13
                },
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 2,
                    column: 19
                },
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 3,
                    column: 20
                },
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 3,
                    column: 35
                },
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 3,
                    column: 49
                }
            ]
        },
        {
            code: "class Foo { constructor () {} *method () {} }",
            options: [ { named: "never", anonymous: "always" } ],
            ecmaFeatures: { classes: true, generators: true },
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 24
                },
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 38
                }
            ]
        },
        {
            code: "var foo = { bar () {} }",
            options: [ { named: "never", anonymous: "always" } ],
            ecmaFeatures: { objectLiteralShorthandMethods: true },
            errors: [
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 1,
                    column: 16
                }
            ]
        },
        {
            code: [
                "function foo() {}",
                "var bar = function () {}",
                "var obj = { get foo() {}, set foo(val) {}, bar() {} };"
            ].join("\n"),
            options: [ { named: "always", anonymous: "never" } ],
            ecmaFeatures: { objectLiteralShorthandMethods: true },
            errors: [
                {
                    type: "FunctionDeclaration",
                    message: "Missing space before function parentheses.",
                    line: 1,
                    column: 13
                },
                {
                    type: "FunctionExpression",
                    message: "Unexpected space before function parentheses.",
                    line: 2,
                    column: 19
                },
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 3,
                    column: 20
                },
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 3,
                    column: 34
                },
                {
                    type: "FunctionExpression",
                    message: "Missing space before function parentheses.",
                    line: 3,
                    column: 47
                }
            ]
        }
    ]
});
