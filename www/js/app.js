// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'ngStorage', 'pascalprecht.translate', 'starter.controllers', 'starter.directives', 'starter.services', 'starter.filters'])

    .run(function ($ionicPlatform, $state, $cordovaDevice, $translate, localstorage, ApiRegDevice, UIHelper) {

        var init = function () {
            console.log("initializing device");
            try {
                //console.log("UUID: " + $cordovaDevice.getUUID());
                return $cordovaDevice.getUUID();
            } catch (err) {
                //console.log("Error: " + err.message);
                return '';
            }

        };

        $ionicPlatform.ready(function () {

            //register deivce
            var uuid       = init();
            var AppVersion = '1.0';
            if (uuid != '' && typeof uuid != "undefined") {
                ApiRegDevice.regDevice(uuid, $cordovaDevice.getPlatform(), $cordovaDevice.getVersion(), AppVersion)
                    .then(function (result) {
                        localstorage.set('deviceid', result.data.deviceid);
                    }, function (error) {
                        //console.log(error);
                    });
            } else {
                uuid = 'localtest';
                ApiRegDevice.regDevice('localtest', 'browser', '1.0', AppVersion).then(function (result) {
                    localstorage.set('deviceid', result.data.deviceid);
                }, function (error) {
                    //console.log(error);
                });

            }
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            localstorage.set('uuid', uuid);

            try{
                window.plugins.jPushPlugin.init();
                window.plugins.jPushPlugin.setDebugMode(true);
                window.plugins.jPushPlugin.getRegistrationID(function(data) {
                    try {
                        console.log("JPushPlugin:registrationID is " + data);
                    } catch(exception) {
                        console.log(exception);
                    }
                });
            } catch (error) {
                console.log(error);
            }
            try {
                document.addEventListener("jpush.receiveNotification", function () {
                    var alertContent;
                    if(device.platform == "Android") {
                        alertContent = event.alert;
                    } else {
                        alertContent = event.aps.alert;
                    }

                    if(alertContent.indexOf("#") != -1) {
                        var arr   = alertContent.split("#");
                        var title = 'general.msg.confirm.title';
                        var msg   = arr[1];
                        UIHelper.confirmNotification(title, msg, function () {
                            $state.go('tab.product-detail', {productId:arr[0], formNotification:true});
                        });
                    } else {
                        if(alertContent == 'New products was added') {
                            var title = 'general.msg.confirm.title';
                            var msg   = alertContent;
                            UIHelper.confirmNotification(title, msg, function () {
                                $state.go('tab.dash-hotProducts');
                            });
                        } else {
                            UIHelper.showAlert(alertContent);
                        }
                    }
                }, false);
            } catch (error){
                console.log(error);
            }
            try {
                document.addEventListener("jpush.openNotification", function () {
                    var alertContent;
                    if(device.platform == "Android") {
                        alertContent = event.alert;
                    } else {
                        alertContent = event.aps.alert;
                    }
                    if(alertContent.indexOf("#") != -1) {
                        var arr   = alertContent.split("#");
                        var title = 'general.msg.confirm.title';
                        var msg   = arr[1];
                        UIHelper.confirmNotification(title, msg, function () {
                            $state.go('tab.product-detail', {productId:arr[0], formNotification:true});
                        });
                    } else {
                        if(alertContent == 'New products was added') {
                            var title = 'general.msg.confirm.title';
                            var msg   = alertContent;
                            UIHelper.confirmNotification(title, msg, function () {
                                $state.go('tab.dash-hotProducts');
                            });
                        } else {
                            UIHelper.showAlert(alertContent);
                        }
                    }

                    window.plugins.jPushPlugin.getApplicationIconBadgeNumber(function(data) {
                        if(data > 0 ) {
                            var badgeNum = data - 1;
                            window.plugins.jPushPlugin.setBadge(badgeNum);
                            window.plugins.jPushPlugin.resetBadge();
                            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(badgeNum);
                            window.plugins.jPushPlugin.setLatestNotificationNum(badgeNum);
                        }
                    });
                }, false);
            } catch (error) {
                console.log(error);
            }
        });
    })
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $ionicConfigProvider.views.swipeBackEnabled(false);
        //$ionicConfigProvider.views.maxCache(5);
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show')
                    return config;
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide')
                    return response;
                }
            }
        })
    })
    .config(function ($stateProvider, $urlRouterProvider, $sceProvider, $translateProvider) {

        $sceProvider.enabled(false);

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('tab.dash-intro', {
                url: '/intro',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/dash-intro.html',
                        controller: 'DashIntroCtrl'
                    }
                }
            })
            .state('tab.dash-hotProducts', {
                url: '/hotProducts',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/dash-hotProducts.html',
                        controller: 'DashHotProductsCtrl'
                    }
                }
            })
            .state('tab.hot-product-detail', {
                url: '/hot-product-detail/:productId/:formNotification',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/product-detail.html',
                        controller: 'ProductDetailCtrl'
                    }
                }
            })

            .state('tab.products', {
                url: '/products',
                views: {
                    'tab-products': {
                        templateUrl: 'templates/tab-products.html',
                        controller: 'ProductsCtrl'
                    }
                }
            })
            .state('tab.product-list', {
                url: '/product-list/:categoryId/:hasChild',
                views: {
                    'tab-products': {
                        templateUrl: 'templates/product-list.html',
                        controller: 'ProductListCtrl'
                    }
                }
            })
            .state('tab.product-video-list', {
                url: '/product-video-list',
                views: {
                    'tab-products': {
                        templateUrl: 'templates/product-video-list.html',
                        controller: 'ProductsCtrl'
                    }
                }
            })
            .state('tab.product-detail', {
                url: '/product-detail/:productId/:formNotification',
                views: {
                    'tab-products': {
                        templateUrl: 'templates/product-detail.html',
                        controller: 'ProductDetailCtrl'
                    }
                }
            })

            .state('tab.feedback', {
                url: '/feedback',
                views: {
                    'tab-feedback': {
                        templateUrl: 'templates/tab-feedback.html',
                        controller: 'FeedbackCtrl'
                    }
                }
            })
          .state('tab.feedback-state', {
                url: '/feedback-state/:status',
                views: {
                    'tab-feedback': {
                        templateUrl: 'templates/feedback-state.html',
                        controller: 'FeedbackStateCtrl'
                    }
                }
            })
            .state('tab.feedback-history', {
                url: '/feedback-history',
                cache:false,
                views: {
                    'tab-feedback': {
                        templateUrl: 'templates/feedback-history.html',
                        controller: 'FeedbackHistoryCtrl'
                    }
                }
            })
            .state('tab.feedback-attachments', {
                url: '/feedback-attachments',
                cache: false,
                views: {
                    'tab-feedback': {
                        templateUrl: 'templates/feedback-attachments.html',
                        controller: 'AttachmentsCtrl'
                    }
                }
            })
            .state('tab.feedback-address', {
                url: '/feedback-address',
                views: {
                    'tab-feedback': {
                        templateUrl: 'templates/feedback-address.html',
                        controller: 'AddressCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.account-avatar', {
                url: '/account-avatar',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-avatar.html',
                        controller: 'AccountAvatarCtrl'
                    }
                }
            })
            .state('tab.account-username', {
                url: '/account-username',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-username.html',
                        controller: 'AccountUsernameCtrl'
                    }
                }
            })
            .state('tab.account-address', {
                url: '/account-address',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-address.html',
                        controller: 'AccountAddressCtrl'
                    }
                }
            })
            .state('tab.account-msg', {
                url: '/account-msg',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-msg.html',
                        controller: 'AccountMsgCtrl'
                    }
                }
            })
            .state('tab.account-language', {
                url: '/account-language',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-language.html',
                        controller: 'AccountChooseLanguageCtrl'
                    }
                }
            })
            .state('tab.account-about', {
                url: '/account-about',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-about.html',
                        controller: 'AccountAboutCtrl'
                    }
                }
            });


        $translateProvider.useSanitizeValueStrategy('escapeParameters');

        //translate
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        $translateProvider
            .registerAvailableLanguageKeys(['en', 'zh'], {
                'zh_*': 'zh',
                '*': 'en'
            });

        var lang = window.localStorage['language'];
        if (typeof lang != "undefined") {
            $translateProvider.preferredLanguage(lang);
        } else {
            //get local language
            var language = window.navigator.userLanguage || window.navigator.language;
            if(language) {
                lang = language.split("-")[0];
                window.localStorage['language'] = lang;
                $translateProvider.preferredLanguage(lang);
            }
        }
        $translateProvider.fallbackLanguage("zh");

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });
    angular.module("pascalprecht.translate")
    .factory("$translateStaticFilesLoader", ["$q", "$http", function (a, b) {
        return function (c) {
            if (!c || !angular.isString(c.prefix) || !angular.isString(c.suffix))
                throw new Error("Couldn't load static files, no prefix or suffix specified");
            var d = a.defer();
            return b({url: [c.prefix, c.key, c.suffix].join(""), method: "GET", params: ""})
                .success(function (a) {
                    d.resolve(a);
                })
                .error(function () {
                    d.reject(c.key);
                }), d.promise;
        }
    }])
    .run(function($rootScope, $ionicLoading, $translate) {
        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({template: $translate('general.common.waiting')});
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        });
    });
