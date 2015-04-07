/*global define, mxtest, $, console, window */
define(function (require) {
    'use strict';

    // Load library/vendor modules using
    // full IDs, like:
    var text = require('text'),
        template = require('text!app/components/inspector/template/inspector.html'),
        row = require('text!app/components/inspector/template/row.html'),
        count = 1;

    function receiveMessage(event) {
        // Do we trust the sender of this message?  (might be
        // different from what we originally opened, for example).
        //if (event.origin !== "http://localhost:8080")
        //    return;

        console.log(event);

        var jevent = JSON.parse(event.data),
            action = '';

        if (typeof jevent.event !== 'undefined') {
            if (jevent.event === 'click') {
                action = row;
                action = action.replace('{{id}}', count);
                action = action.replace('{{action}}', '<i class="fa fa-arrow-right"></i> Clicked ' + jevent.target.id);
                action = action.replace('{{element}}', ' ');
                action = action.replace('{{wait}}', 'no');
                $('#inputActions').html($('#inputActions').html() + action);
                count = count + 1;
            }
        }

    }

    function exec() {

        $('#dashboard-main').html(template);

        $('#inputSite').load(function () {
            window.addEventListener("message", receiveMessage, false);
        });

        $('#btnGoToUrl').on('click', function () {
            var action = '';
            $('#inputSite').attr('src', $('#inputUrl').val());
            $('#inputActions').html('');
            action = row;
            action = action.replace('{{id}}', count);
            action = action.replace('{{action}}', '<i class="fa fa-globe"></i> Goto ' + $('#inputUrl').val());
            action = action.replace('{{element}}', '');
            action = action.replace('{{wait}}', 'no');
            $('#inputActions').html(action);
            count = count + 1;
        });

    }

    return {
        execute: exec
    };
});