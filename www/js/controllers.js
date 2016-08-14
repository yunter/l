angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope) {
  $scope.platform = ionic.Platform.platform();
  $scope.home     = 'Home';
  $scope.about_us = 'About Us';
})
.controller('DashCtrl', function($scope) {
})
.controller('DashIntroCtrl', function($scope) {})
.controller('DashHotProductsCtrl', function($scope, $http) {
  $scope.items = [1,2,3];
  $scope.doRefresh = function() {
    $http.get('/')
      .success(function(newItems) {
        $scope.items = newItems;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  };
})
.controller('ProductsCtrl', function($scope) {
  $scope.productId = 1;
  $scope.items = [1,2,3];
})
.controller('ProductDetailCtrl', function($scope, $stateParams, Products) {
  $scope.product = Products.get($stateParams.productId);
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("IntroBoxCtrl", function ($scope) {
  //var ctrl = this;

  //ctrl.showIntro = function () {
    //angular.element(document.getElementById('intro-box')).addClass("intro-box-full");
  //}
  $scope.showIntro = function () {
    return 'yes';
  }
})
.directive('hideTabs', function ($rootScope) {
  return {
    restrict: 'A',
    link: function (scope, element, attributes) {
      scope.$on('$ionicView.beforeEnter', function () {
        scope.$watch(attributes.hideTabs, function (value) {
          $rootScope.hideTabs = 'tabs-item-hide';
        });
      });
      scope.$on('$ionicView.beforeLeave', function () {
        scope.$watch(attributes.hideTabs, function (value) {
          $rootScope.hideTabs = 'tabs-item-hide';
        });
        scope.$watch('$destroy', function () {
          $rootScope.hideTabs = false;
        })
      });
    }
  };
});
