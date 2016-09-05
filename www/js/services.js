angular.module('starter.services', [])
    .constant('ApiHost', {
        url: 'http://lamsin.bluemorpho.cn/index.php?route=openapi'
    })
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
                return deferred.error(error.data);
              });

              return deferred.promise;

            } catch (err) {
                return err;
            }
        }

        return {
          regDevice: function (uuid, Platform, sysVersion, AppVersion) {
                return regDevice(uuid, Platform, sysVersion, AppVersion);
            }
        }
    })

    .factory('ApiHome', function ($http, $q, ApiHost) {
        function getSlideShow() {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.url + '/slideshow/getshow',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    }
                };
              var deferred = $q.defer();       // This will handle your promise

              $http(request).then(function (response) {
                if (typeof response.data === 'object') {
                  deferred.resolve(response.data);
                } else {
                  deferred.reject(response.data);
                }
              }, function (error) {
                return deferred.error(error.data);
              });

              return deferred.promise;

            } catch (err) {
                return err;
            }
        }

        return {
          getSlideShow: function () {
                return getSlideShow();
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
