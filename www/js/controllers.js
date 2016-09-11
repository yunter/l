angular.module('starter.controllers', ['ngCordova'])
  .controller('AppCtrl', function ($scope) {
    $scope.platform = ionic.Platform.platform();
    $scope.home = 'Home';
    $scope.about_us = 'About Us';
  })
  .controller('DashCtrl', function ($scope, ApiHome) {
    ApiHome.getLamsin().then(function (result) {
      if (typeof result == "object") {

        //banner
        ApiHome.getSlideShow(result.bannerConfig.id, result.bannerConfig.width, result.bannerConfig.height)
          .then(function (result) {
            if (result.data.banners != undefined) {
              $scope.banners = result.data.banners;
            }
          }, function (error) {
            alert("ERROR:GetSlideShow, Request error.");
          });

        //intro
        ApiHome.getIntro(result.articleConfig.intro)
          .then(function (result) {
            if (typeof result == "object") {
              $scope.IntroTitle = result.data.title;
              $scope.IntroDesc  = result.data.meta_description;
            }
          }, function (error) {
            alert("ERROR:GetIntro, Request error.");
          });

      } else {
          alert("ERR:01, Service is not available.");
      }
    }, function (error) {
        alert("ERR:02, Request error.");
    });
  })
  .controller('DashIntroCtrl', function ($scope) {
    alert($scope.IntroId);
  })
  .controller('DashHotProductsCtrl', function ($scope, ApiHome) {
    //hot products
    ApiHome.getLatestProducts(3).then(
      function (result) {
        if (typeof result == "object") {
          $scope.latestProducts = result.data;
        }
      }, function (error) {
          alert("ERR:GetLatestProducts, Request error.");
      });
  })
  .controller('ProductsCtrl', function ($scope) {
    $scope.productId = 1;
    $scope.items = [1, 2, 3];
  })
  .controller('ProductDetailCtrl', function ($scope, $stateParams, Products) {
    //get product information
    Products.getProductInfo($stateParams.productId).then(
        function (result) {
          if (typeof result == "object") {
            $scope.productInfo = result.data;
          }
        }, function (error) {
          alert("ERR:GetProductInfo, Request error.");
        });
  })

  .controller('FeedbackCtrl', function ($scope, $ionicActionSheet, $timeout, Feedback) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.feedback = Feedback.all();
    $scope.remove = function (feedback) {
      Feedback.remove(feedback);
    };
  })

  .controller('AttachmentsCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout) {
    // Triggered on a button click, or some other target
    $scope.show = function () {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: 'Choose form album'},
          {text: 'Take Photos'}
        ],
        //destructiveText: 'Delete',
        titleText: 'Choose you action',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              alert('test');
              break;
            default:
              alert(index);
              break;
          }
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function () {
        hideSheet();
      }, 2500);

    };
    $scope.showCam = function () {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: 'Choose form album'},
          {text: 'Take Video'}
        ],
        //destructiveText: 'Delete',
        titleText: 'Choose you action',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              alert('test');
              break;
            default:
              alert(index);
              break;
          }
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function () {
        hideSheet();
      }, 2500);

    };
  })
  .controller('AddressCtrl', function ($scope) {
  })
  .controller('FeedbackDetailCtrl', function ($scope, $stateParams, Feedback) {
    $scope.feedback = Feedback.get($stateParams.feedbackId);
  })

  .controller('AccountCtrl', function ($scope) {
  })

  .controller("IntroBoxCtrl", function ($scope) {
    //var ctrl = this;

    //ctrl.showIntro = function () {
    //angular.element(document.getElementById('intro-box')).addClass("intro-box-full");
    //}
    $scope.showIntro = function () {
      return 'yes';
    }
  });
