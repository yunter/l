// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services'])

  .run(function ($ionicPlatform, $state, $cordovaDevice, ApiRegDevice) {
    var init = function () {
      console.log("initializing device");
      try {
        console.log("UUID: " + $cordovaDevice.getUUID());
        return $cordovaDevice.getUUID();
      } catch (err) {
        console.log("Error: " + err.message);
        return '';
      }

    };

    $ionicPlatform.ready(function () {
      //
      var uuid = init();
      var AppVersion = '1.0';
      if (uuid != '' && uuid != undefined) {
        ApiRegDevice.regDevice(uuid, $cordovaDevice.getPlatform(), $cordovaDevice.getVersion(), AppVersion)
          .then(function (result) {
            console.log(result.data.deviceid);
          }, function (error) {
            alert(error);
          }, function (msg) {
            alert(msg);
          });
      } else {
        ApiRegDevice.regDevice('localtest', 'browser', '1.0', AppVersion).then(function (result) {
          console.log(result.data.deviceid);
        }, function (error) {
          console.log(error);
        }, function (msg) {
          console.log(msg);
        });

      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $sceProvider) {

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
        url: '/hot-product-detail/:productId',
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
        url: '/product-detail/:productId',
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
      .state('tab.feedback-detail', {
        url: '/feedback/:feedbackId',
        views: {
          'tab-feedback': {
            templateUrl: 'templates/feedback-detail.html',
            controller: 'FeedbackDetailCtrl'
          }
        }
      })
      .state('tab.feedback-history', {
        url: '/feedback-history',
        views: {
          'tab-feedback': {
            templateUrl: 'templates/feedback-history.html',
            controller: 'FeedbackCtrl'
          }
        }
      })
      .state('tab.feedback-attachments', {
        url: '/feedback-attachments',
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
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.account-username', {
        url: '/account-username',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-username.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.account-address', {
        url: '/account-address',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-address.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.account-language', {
        url: '/account-language',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-language.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.account-about', {
        url: '/account-about',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-about.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
