angular.module('starter.services', [])
    .constant('ApiHost', {
        domain: 'http://lamsin.bluemorpho.cn',
        uri: '/index.php?route=openapi'
    })
    .factory('ApiRegDevice', function ($http, $q, $httpParamSerializer, ApiHost) {
        function regDevice(uuid, Platform, sysVersion, AppVersion) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/registerdevice',
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
                    return deferred.reject(error.data);
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
    .factory('ApiHome', function ($http, $q, $httpParamSerializer, ApiHost) {

        function getLamsin() {
            try {
                var request = {
                    method: 'GET',
                    url: ApiHost.domain + '/lamsin.json',
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }

        function getSlideShow(bannerId, bWidth, bHeight) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/slideshow/getshow',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        bannerId: bannerId,
                        bWidth: bWidth,
                        bHeight: bHeight
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }

        function getIntro(articleId) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/articles/getArticle',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        article_id: articleId,
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }

        function getLatestProducts(start, limit) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/products/getLatestProducts',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        start: start,
                        limit: limit
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }

        return {
            getLamsin: function () {
                return getLamsin();
            },
            getSlideShow: function (bannerId, bWidth, bHeight) {
                return getSlideShow(bannerId, bWidth, bHeight);
            },
            getIntro: function (articleId) {
                return getIntro(articleId);
            },
            getLatestProducts: function (start, limit) {
                return getLatestProducts(start, limit);
            }
        };
    })

    .factory('Products', function ($http, $q, $httpParamSerializer, ApiHost) {
        function getProductInfo(productId) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/products/productInfo',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        product_id: productId,
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }
        function getProductVideos(order, page, limit) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/videos/getList',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        order: order,
                        page: page,
                        limit: limit
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }
        function getProductCategories(parent, level) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/products/categories',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        parent: parent,
                        level: level
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }
        function getProducts(order, page, limit, category_id, keyword) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/products/getProducts',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        order: order,
                        page: page,
                        limit: limit,
                        category_id: category_id,
                        keyword: keyword
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
                    return deferred.reject(error.data);
                });

                return deferred.promise;

            } catch (err) {
                return err;
            }
        }

        return {
            getProductInfo: function (productId) {
                return getProductInfo(productId);
            },
            getProductVideos: function (order, page, limit) {
                return getProductVideos(order, page, limit);
            },
            getProductCategories: function (parent, level) {
                return getProductCategories(parent, level);
            },
            getProducts: function (order, page, limit, category_id, keyword) {
                return getProducts(order, page, limit, category_id, keyword);
            }
        };
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
    .factory('localstorage', ['$window', '$localStorage', '$q', function ($window, $localStorage, $q) {
        return {
            set: function (key, value) {
                var deferred = $q.defer();
                $window.localStorage[key] = value;
                deferred.resolve(1);
                return deferred.promise;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }

    }]);