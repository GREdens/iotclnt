/*global define, mxtest, $, Chart */
define(function (require) {
    'use strict';

    // Load library/vendor modules using
    // full IDs, like:
    var text = require('text'),
        template = require('text!app/components/dashboard/template/dashboard.html'),
        defaultTemplate = require('text!app/components/dashboard/template/default.html'),

        // selenium
        selenium = require('app/components/selenium/selenium'),

        // Visual test builder!
        inspector = require('app/components/inspector/inspector');

    function createDashboard() {
        
        var data, options, ctxHeatChart, myHeatChart, ctxHumidityChart, myHumidityChart,
            ctxElectricityLabelChart, myElectricityLabelChart, ctxEnergyLabelChart, myEnergyLabelChart, today;
        
        $('#dashboard-main').html(defaultTemplate);
        
        data = [
            {
                value: 300,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

        options = {

            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,

            //String - The colour of each segment stroke
            segmentStrokeColor : "#fff",

            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 50, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps : 100,

            //String - Animation easing effect
            animationEasing : "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : false,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

        };
        
        ctxHeatChart = $("#myHeatChart").get(0).getContext("2d");
        myHeatChart = new Chart(ctxHeatChart).Pie(data, options);
        
        ctxHumidityChart = $("#myHumidityChart").get(0).getContext("2d");
        myHumidityChart = new Chart(ctxHumidityChart).Pie(data, options);
        
        ctxElectricityLabelChart = $("#myElectricityLabelChart").get(0).getContext("2d");
        myElectricityLabelChart = new Chart(ctxElectricityLabelChart).Pie(data, options);
        
        ctxEnergyLabelChart = $("#myEnergyLabelChart").get(0).getContext("2d");
        myEnergyLabelChart = new Chart(ctxEnergyLabelChart).Pie(data, options);

        today = new Date();
        $('#heatTime').html(today.toLocaleTimeString());
        $('#humidityTime').html(today.toLocaleTimeString());
        
    }
    
    function destroy() {
        // Destroy buttons!
        createDashboard();
    }
    
    function exec() {
        
        var id;

        $('body').removeClass('signin');

        id = mxtest.components.render(mxtest.main, template, {});

        createDashboard();
        
        $('#btnInspector').on('click', function () {
            inspector.execute();
        });

        $('#btnDashboard').on('click', function (evt) {
            destroy();
        });
        
        
    }

    return {
        execute: exec
    };
});