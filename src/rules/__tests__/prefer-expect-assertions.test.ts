import { TSESLint } from '@typescript-eslint/experimental-utils';
import resolveFrom from 'resolve-from';
import rule from '../prefer-expect-assertions';

const ruleTester = new TSESLint.RuleTester({
  parser: resolveFrom(require.resolve('eslint'), 'espree'),
  parserOptions: {
    ecmaVersion: 6,
  },
});

ruleTester.run('prefer-expect-assertions', rule, {
  invalid: [
    {
      code: 'it("it1", () => {})',
      errors: [{ messageId: 'haveExpectAssertions' }],
    },
    {
      code: 'it("it1", () => { foo()})',
      errors: [{ messageId: 'haveExpectAssertions' }],
    },
    {
      code:
        'it("it1", function() {' +
        '\n\t\t\tsomeFunctionToDo();' +
        '\n\t\t\tsomeFunctionToDo2();\n' +
        '\t\t\t})',
      errors: [{ messageId: 'haveExpectAssertions' }],
    },
    {
      code: 'it("it1", function() {var a = 2;})',
      errors: [{ messageId: 'haveExpectAssertions' }],
    },
    {
      code: 'it("it1", function() {expect.assertions();})',
      errors: [{ messageId: 'haveExpectAssertions' }],
    },
    {
      code: 'it("it1", function() {expect.assertions(1,2);})',
      errors: [{ messageId: 'haveExpectAssertions' }],
    },
    {
      code: 'it("it1", function() {expect.assertions("1");})',
      errors: [{ messageId: 'haveExpectAssertions' }],
    },
  ],

  valid: [
    {
      code: 'test("it1", () => {expect.assertions(0);})',
    },
    'test("it1", function() {expect.assertions(0);})',
    'test("it1", function() {expect.hasAssertions();})',
    'it("it1", function() {expect.assertions(0);})',
    'it("it1", function() {\n\t\t\texpect.assertions(1);' +
      '\n\t\t\texpect(someValue).toBe(true)\n' +
      '\t\t\t})',
    'test("it1")',
    'itHappensToStartWithIt("foo", function() {})',
    'testSomething("bar", function() {})',
  ],
});
