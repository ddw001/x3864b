/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", function() {
            console.log("**** on resume");

            ui.setAppResumed();
        }, false);

        document.addEventListener("pause", function() {
            console.log("**** on pause");
            ui.setAppPaused();

        }, false);

        document.addEventListener("backbutton", function() {
            appNav.goBack();
        }, false);

        document.addEventListener("offline", function() {
            console.log("**** Offline");
            ui.setOffline();
        }, false);

        document.addEventListener("online", function() {
            console.log("**** Online");
            ui.setOnline();
        }, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        init();
        console.log("**** onDeviceReady");
        navigator.geolocation.getCurrentPosition(function(location) {
            console.log("**** calling update position from get current");
            console.log(location);
            session.updatePosition(location.coords.longitude, location.coords.latitude);
        }, function(error) {
            console.log("**** GPS ERROR: " + error.message);

        }, {
            timeout: 31000,
            enableHighAccuracy: true,
            maximumAge: 90000
        });

        navigator.geolocation.watchPosition(function(location) {
            console.log("**** calling update position from watch position");
            console.log(location);
            session.updatePosition(location.coords.longitude, location.coords.latitude);
        }, function(error) {
            console.log("**** GPS ERROR: " + error.message);
        }, {
            timeout: 31000,
            enableHighAccuracy: true,
            maximumAge: 90000
        });
        console.log("**** Calling setupPush");
        ui.setupPush();
        //ui.setLocationUpdate();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('***** Received Event: ' + id);
    }
};

app.initialize();
