/*global window, $, alert, mxtest */

(function () {
    'use strict';

    window.mxtest = {

        alert : function (msg) {
            alert(msg);
        },
        
        // Fixed ID's
        body : $('body'),
        main : $('#main'),
        content : $('#content'),

        // Components
        components : {

            count : 0,
            collection : [],
            render : function (node, template, state) {
                node.html('');
                node.html('<div id="mx_component_' + mxtest.components.count + '">' + template + '</div>');

                // Remember the component and state
                mxtest.components.collection.push({
                    component: $('#mx_component_' + mxtest.components.count),
                    state: state,
                    node: node,
                    template: template
                });

                mxtest.components.count = mxtest.components.count + 1;

                return '#mx_component_' + (mxtest.components.count - 1) + ' ';
            }

        }


    };

}());