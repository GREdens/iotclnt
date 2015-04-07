/*global define, mxtest, $ */
define(function (require) {
    'use strict';

    // Load library/vendor modules using
    // full IDs, like:
    var text = require('text'),
        template = require('text!app/components/selenium/template/selenium.html');

    function exec(renderTo) {

        var id = mxtest.components.render(renderTo, template, {});

        $(id + '.run-test').on('click', function () {
            // We do a test now..
            $.ajax({
                dataType: "json",
                url: '/selenium/',
                data: '',
                success: function (data) {
                    $(id + '.selenium-result').html('<img src="data:image/png;base64,' + data.screenshot + '" width="250">');
                }
            });
        });

    }

    return {
        execute: exec
    };
});