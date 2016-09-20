angular.module('starter.services', [])
    .constant('ApiHost', {
        domain: 'http://ok.cms.debug',
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
        };
    })
    .factory('Customer', function ($http, $q, $httpParamSerializer, ApiHost) {
        function login(telephone, password) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token',
                        'Sysversion': sysVersion,
                        'Sysname': Platform
                    },
                    data: $httpParamSerializer({
                        telephone:telephone,
                        password: password
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
        function register(telephone, password) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/register',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token',
                        'Sysversion': sysVersion,
                        'Sysname': Platform
                    },
                    data: $httpParamSerializer({
                        telephone:telephone,
                        password: password
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
            login: function (telephone, password) {
                return login(telephone, password);
            },
            register: function (telephone, password) {
                return register(telephone, password);
            }
        };
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
    .factory('Feedback', function ($http, $q, $httpParamSerializer, ApiHost) {
        // Might use a resource here that returns a JSON array
        function addFeedback(uuid, usage, planting, username, phone_number, getAddress, getImageSrc) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/feedback/addfeedback',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        feedback_uuid: uuid,
                        feedback_usage: usage,
                        feedback_planting: planting,
                        feedback_username: username,
                        feedback_address: getAddress,
                        feedback_phone_number: phone_number,
                        feedback_getImageSrc: getImageSrc,
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
        function getFeedbackList(customerId, start, limit) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/feedback/getFeedbackList',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        //'Deviceid': 'deviceid',
                        //'Token': 'token'
                    },
                    data: $httpParamSerializer({
                        customer_id: customerId,
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
            addFeedback: function (uuid, usage, planting, username, phone_number, getAddress, getImageSrc) {
                return addFeedback(uuid, usage, planting, username, phone_number, getAddress, getImageSrc);
            },
            getFeedbackList: function (customerId, start, limit) {
                return getFeedbackList(customerId, start, limit);
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

    }])
    .factory('UIHelper',  function($rootScope, $ionicLoading, $ionicPopup, $timeout, $translate){
      return {
        showAlert: function (captionRes, plainSuffix) {
          $translate(captionRes).then(function (caption) {

            if (plainSuffix)
              caption+=plainSuffix;
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: caption
            });
          });
        },
        confirmAndRun: function (captionRes, textRes, onConfirm) {
          this.translate([captionRes, textRes, 'general.btn.ok', 'general.btn.cancel']).then(function (t) {
            $ionicLoading.hide();
            var popup = $ionicPopup.confirm({
              title: t[0],
              template: t[1],
              okText: t[2],
              cancelText: t[3]
            });
            popup.then(function (res) {
              if (res) {
                onConfirm();
              }
            });
          });
        },
        blockScreen: function (textRes, timeoutSec) {
          $translate(textRes).then(function (text) {
            $ionicLoading.show({
              template: text
            });
            $timeout(function () {
              $ionicLoading.hide();
            }, timeoutSec * 1000);
          });
        },
        shareText: function(captionRes, textRes){
          $translate([captionRes, textRes]).then(function (translations) {
            var caption = translations[captionRes];
            var text = translations[textRes];
            if (window.plugins) {
              window.plugins.socialsharing.share(text, caption);
            }
            else {
              var subject = caption.replace(' ', '%20').replace('\n', '%0A');
              var body = text.replace(' ', '%20').replace('\n', '%0A');
              window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
            }
          });
        },
        translate : function(keys){
          var promise = new Promise(function (resolve, reject) {
            $translate(keys).then(function (translations) {
              var t = [];
              for (i = 0; i < keys.length; i++) {
                var key = keys[i];
                t.push(translations[key]);
              }
              resolve(t);
            })
              .catch(reject);
          });
          return promise;
        },
        getCurrentLanguage: function () {
          return $translate.use();
        },
        changeLanguage: function(newLang){
          $translate.use(newLang);
        }
      }
    });
