//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as fuzzySearch from '../src/fuzzysearch';
import * as shelljs from 'shelljs';

// Defines a Mocha test suite to group tests of similar kind together
suite("Fuzzy Search Tests", () => {

    // Defines a Mocha unit test
    test("Test getFileList", () => {

        const expected_files = [
            {
                label: 'fuzzysearch.test.js'
            },
            {
                label: 'fuzzysearch.test.js.map'
            }
        ];

        const files = fuzzySearch.getFileList(__dirname);
        console.log(files);
        assert.equal(files[0].label, expected_files[0].label);
        assert.equal(files[1].label, expected_files[1].label);

    });
});
