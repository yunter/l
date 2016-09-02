angular.module('starter.services', [])
    .constant('ApiHost', {
        url: 'http://ok.cms.debug/index.php?route=openapi'
    })
    // For the real endpoint, we'd use this
    // .constant('ApiEndpoint', {
    //  url: 'http://cors.api.com/api'
    // })
    .factory('ApiRegDevice', function ($http, $q, $httpParamSerializer, ApiHost) {
        function regDevice(uuid, Platform, sysVersion, AppVersion) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.url + '/account/registerdevice',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token',
                        'Sysversion': sysVersion,
                        'Sysname': Platform
                    },
                    data: $httpParamSerializer({
                        uuid: uuid,
                        appversion: AppVersion,
                        sysversion: sysVersion,
                        sysname: Platform
                    })
                };
              var deferred = $q.defer();       // This will handle your promise

              $http(request).then(function (response) {
                if (typeof response.data === 'object') {
                  deferred.resolve(response.data);
                } else {
                  deferred.reject(response.data);
                }
              }, function (error) {
                console.log(error.data);
                return deferred.error(response.data);
              });

              return deferred.promise;

            } catch (err) {
                console.log("Error: " + err.message);
                return err.message;
            }
        }

        return {
          regDevice: function (uuid, Platform, sysVersion, AppVersion) {
                return regDevice(uuid, Platform, sysVersion, AppVersion);
            }
        }
    })

    .factory('ApiSlideShow', function ($http, $httpParamSerializer, ApiHost) {
        function getShow(uuid, Platform, sysVersion, AppVersion) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.url + '/account/registerdevice',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token',
                        'Sysversion': sysVersion,
                        'Sysname': Platform
                    },
                    data: $httpParamSerializer({
                        uuid: uuid,
                        appversion: AppVersion,
                        sysversion: sysVersion,
                        sysname: Platform
                    })
                };
                var ret = false;
                $http(request).then(function (response) {
                    ret = true;
                    console.log(response.message);
                }, function (response) {
                    console.log(response.message);
                });

                return ret;

            } catch (err) {
                console.log("Error: " + err.message);
                return err.message;
            }
        }

        return {
            registerDevice: function (uuid, Platform, sysVersion, AppVersion) {
                return registerDevice(uuid, Platform, sysVersion, AppVersion);
            }
        }
    })


    .factory('Feedback', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var feedback = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return feedback;
            },
            remove: function (feedback) {
                feedback.splice(feedback.indexOf(feedback), 1);
            },
            get: function (feedbackId) {
                for (var i = 0; i < feedback.length; i++) {
                    if (feedback[i].id === parseInt(feedbackId)) {
                        return feedback[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('Products', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var products = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return products;
            },
            remove: function (feedback) {
                products.splice(products.indexOf(feedback), 1);
            },
            get: function (productId) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].id === parseInt(productId)) {
                        return products[i];
                    }
                }
                return null;
            }
        };
    });
