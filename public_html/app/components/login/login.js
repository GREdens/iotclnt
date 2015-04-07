/*global define, mxtest, $, console, alert, location */
define(function (require) {
    'use strict';

    var text = require('text'),
        template = require('text!app/components/login/template/login.html'),

        // Require
        dashboard = require('app/components/dashboard/dashboard'),

        // Button
        btnLogin = null;

    function destroy() {
        if (btnLogin !== null) {
            btnLogin.off();
        }
    }

    function exec() {

        $('body').addClass('signin');

        // Render a component
        var id = mxtest.components.render(mxtest.main, template, {});

        btnLogin = $(id + '.btnLogin').on('click', function () {

            if (location.host === 'localhost:3000') {
                // Destroy myself.
                destroy();

                // Execute.
                dashboard.execute();
                return;
            }

            console.log('check');
            console.log({ usr: $('#inputEmail').val(), pwd: $('#inputPassword').val() });
            $.get("/msrv/", { usr: $('#inputEmail').val(), pwd: $('#inputPassword').val() }).done(function (data) {
                if (data.code === 500) {
                    $('#resultError').html('<div class="alert alert-danger" role="alert">' + data.status + '</div>');
                } else {
                    // Destroy myself.
                    destroy();

                    // Execute.
                    dashboard.execute();
                }
            }).error(function (err) {
                alert(err);
            });


        });



    }

    return {
        execute: exec
    };
});