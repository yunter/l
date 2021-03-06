angular.module('starter.services', [])
    .constant('ApiHost', {
        domain: 'http://lamsin.bluemorpho.cn',
        uri: '/index.php?route=openapi'
    })
    .factory('ApiRegDevice', function ($http, $q, $httpParamSerializer, localstorage, ApiHost, Headers) {
        function regDevice(uuid, Platform, sysVersion, AppVersion) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/registerdevice',
                    headers: Headers,
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
    .factory('ApiHome', function ($http, $q, $httpParamSerializer, ApiHost, Headers) {

        function getLamsin() {
            try {
                var request = {
                    method: 'GET',
                    url: ApiHost.domain + '/lamsin.json'
                    //headers: Headers
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
                    headers: Headers,
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
                    headers: Headers,
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
                    headers: Headers,
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
    .factory('Customer', function ($http, $q, $httpParamSerializer, ApiHost, Headers) {
        function login(telephone, password) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/login',
                    headers: Headers,
                    data: $httpParamSerializer({
                        telephone: telephone,
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
                    headers: Headers,
                    data: $httpParamSerializer({
                        telephone: telephone,
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
    .factory('Products', function ($http, $q, $httpParamSerializer, ApiHost, Headers) {
        function getProductInfo(productId) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/products/productInfo',
                    headers: Headers,
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
                    headers: Headers,
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
                    headers: Headers,
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
                    headers: Headers,
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
    .factory('Feedback', function ($http, $q, $httpParamSerializer, ApiHost, Headers) {
        // Might use a resource here that returns a JSON array
        function addFeedback(uuid, usage, planting, customerId, username, phone_number, getAddress, getImageSrc) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/feedback/addfeedback',
                    headers: Headers,
                    data: $httpParamSerializer({
                        feedback_uuid: uuid,
                        feedback_usage: usage,
                        feedback_planting: planting,
                        feedback_customerId: customerId,
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

        function addEmailFeedback(uuid, usage, planting, customerId, email, getImageSrc) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/feedback/addfeedback',
                    headers: Headers,
                    data: $httpParamSerializer({
                        feedback_uuid: uuid,
                        feedback_usage: usage,
                        feedback_planting: planting,
                        feedback_customerId: customerId,
                        feedback_email: email,
                        feedback_getImageSrc: getImageSrc
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
                    headers: Headers,
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
            addFeedback: function (uuid, usage, planting, customerId, username, phone_number, getAddress, getImageSrc) {
                return addFeedback(uuid, usage, planting, customerId, username, phone_number, getAddress, getImageSrc);
            },
            addEmailFeedback: function (uuid, usage, planting, customerId, email, getImageSrc) {
                return addEmailFeedback(uuid, usage, planting, customerId, email, getImageSrc);
            },
            getFeedbackList: function (customerId, start, limit) {
                return getFeedbackList(customerId, start, limit);
            }
        };
    })
    .factory('Account', function ($http, $q, $httpParamSerializer, ApiHost, Headers) {
        function saveUserName(customerId, username) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/saveCustomerInfo',
                    headers: Headers,
                    data: $httpParamSerializer({
                        customer_id: customerId,
                        username: username

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
        function saveAddress(customerId, addressId, address) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/saveCustomerInfo',
                    headers: Headers,
                    data: $httpParamSerializer({
                        customer_id: customerId,
                        address_id: addressId,
                        address: address

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

        function saveAvatar(customerId, avatar) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/saveCustomerInfo',
                    headers: Headers,
                    data: $httpParamSerializer({
                        customer_id: customerId,
                        avatar: avatar

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

        function accountLogin(phone_number, password, verifyCode) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/account/login',
                    headers: Headers,
                    data: $httpParamSerializer({

                        param: 'telephone=' + phone_number + '&password=' + password,
                        verifyCode: verifyCode
                    })
                };
                var deferred = $q.defer();       // This will handle your promise
                $http(request).then(function (response) {
                    if (typeof response.data === 'object' && response.data.code == 200) {
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

        function getMsgList(start, limit) {
            try {
                var request = {
                    method: 'POST',
                    url: ApiHost.domain + ApiHost.uri + '/message/getMessageList',
                    headers: Headers,
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
            accountLogin: function (phone_number, password, sms_code) {
                return accountLogin(phone_number, password, sms_code);
            },
            saveUserName: function (customerId, username) {
                return saveUserName(customerId, username);
            },
            saveAvatar: function (customerId, avatar) {
                return saveAvatar(customerId, avatar);
            },
            saveAddress: function (customerId, addressId, address) {
                return saveAddress(customerId, addressId, address);
            },
            getMsgList: function (start, limit) {
                return getMsgList(start, limit);
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
    .factory('Headers', function (localstorage) {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Code': localstorage.get('language')
        }
    })
    .factory('UIHelper', function ($rootScope, $ionicLoading, $ionicPopup, $timeout, $translate) {
        return {
            showAlert: function (captionRes) {
                $ionicLoading.hide();
                this.translate([captionRes, 'general.btn.ok', 'general.alert.title']).then(function (t) {
                    $ionicPopup.alert({
                        title: t[2],
                        template: '<p class="text-center">' + t[0] + '</p>',
                        okText: t[1]
                    });
                }, function () {
                    $ionicPopup.alert({
                        title: t[2],
                        template: '<p class="text-center">' + t[0] + '</p>',
                        okText: t[1]
                    });
                });
            },
            confirmAndRun: function (captionRes, textRes, onConfirm) {
                this.translate([captionRes, textRes, 'general.btn.ok', 'general.btn.cancel']).then(function (t) {
                    $ionicLoading.hide();
                    var popup = $ionicPopup.confirm({
                        title: t[0],
                        template: '<p class="text-center">' + t[1] + '</p>',
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
            confirmNotification: function (captionRes, textRes, onConfirm) {
                this.translate([captionRes, textRes, 'general.msg.confirm.ok', 'general.btn.cancel']).then(function (t) {
                    $ionicLoading.hide();
                    var popup = $ionicPopup.confirm({
                        title: t[0],
                        template: '<p class="text-center">' + t[1] + '</p>',
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
            shareText: function (captionRes, textRes) {
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
            checkPhoneNumber: function (Number) {
                var TelNumber = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8,14}$/;
                var PhoneNumber = /^1[3|4|5|7|8]\d{9}$/;
                if (TelNumber.test(Number) || PhoneNumber.test(Number)) {
                    return true
                } else {
                    return false;
                }
            },
            checkEmail: function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            translate: function (keys) {
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
            changeLanguage: function (newLang) {
                $translate.use(newLang);
            }
        }
    });
