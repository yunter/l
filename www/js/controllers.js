angular.module('starter.controllers', ['ngCordova'])
    .controller('AppCtrl', function ($scope) {
        $scope.platform = ionic.Platform.platform();
        $scope.home = 'Home';
        $scope.about_us = 'About Us';
    })
    .controller('DashCtrl', function ($scope) {
    })
    .controller('DashIntroCtrl', function ($scope) {
    })
    .controller('DashHotProductsCtrl', function ($scope, $http) {
        $scope.items = [1, 2, 3];
        $scope.doRefresh = function () {
            $http.get('/')
                .success(function (newItems) {
                    $scope.items = newItems;
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    })
    .controller('ProductsCtrl', function ($scope) {
        $scope.productId = 1;
        $scope.items = [1, 2, 3];
    })
    .controller('ProductDetailCtrl', function ($scope, $stateParams, Products) {
        $scope.product = Products.get($stateParams.productId);
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
