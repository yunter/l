angular.module('starter.controllers', ['ngCordova', 'ngStorage'])
    .controller('AppCtrl', function ($scope) {
        $scope.platform = ionic.Platform.platform();
        $scope.home = 'Home';
        $scope.about_us = 'About Us';
    })
    .controller('DashCtrl', function ($scope, localstorage, ApiHome) {

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
                localstorage.set('IntroId', result.articleConfig.intro);

                ApiHome.getIntro(result.articleConfig.intro)
                    .then(function (result) {
                        if (typeof result == "object") {
                            $scope.IntroTitle = result.data.title;
                            $scope.IntroDesc = result.data.meta_description;
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
    .controller('DashIntroCtrl', function ($scope, localstorage, ApiHome) {
        var IntroId = localstorage.get('IntroId');
        ApiHome.getIntro(IntroId)
            .then(function (result) {
                if (typeof result == "object") {
                    $scope.IntroTitle = result.data.title;
                    $scope.IntroDesc = result.data.meta_description;
                    $scope.IntroDescription = result.data.description;
                }
            }, function (error) {
                alert("ERROR:DashIntro, Request error.");
            });
    })
    .controller('DashHotProductsCtrl', function ($scope, ApiHome) {
        //hot products
        ApiHome.getLatestProducts(0, 3).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function (error) {
                alert("ERR:GetLatestProducts, Request error.");
            });
    })
    .controller('DashHotProductsListCtrl', function ($scope, ApiHome) {
        //hot products
        ApiHome.getLatestProducts(0, 10).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function (error) {
                alert("ERR:GetLatestProducts, Request error.");
            });
        $scope.doRefresh = function () {
            ApiHome.getLatestProducts(0, 30).then(
                function (result) {
                    if (typeof result == "object") {
                        $scope.latestProducts = result.data;
                    }
                }, function (error) {
                    alert("ERR:GetLatestProducts, Request error.");
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
    })
    .controller('ProductsCtrl', function ($scope, $stateParams, localstorage,  Products) {
        Products.getProductVideos('DESC', 1, 1).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideo = result.data;
                }
            }, function (error) {
                alert("ERR:GetProductVideo, Request error.");
            });
        Products.getProductCategories(0, 2).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductCategories = result.data;
                }
            }, function (error) {
                alert("ERR:GetProductCategories, Request error.");
            });
    })
    .controller('ProductVideoListCtrl', function ($scope, $stateParams, localstorage,  Products) {
        Products.getProductVideos('DESC', 1, 100).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideoList = result.data;
                }
            }, function (error) {
                alert("ERR:GetProductVideoList, Request error.");
            });
    })
    .controller('ProductListCtrl', function ($scope, $stateParams, localstorage,  Products) {
         var categoryId  = $stateParams.categoryId;
         var hasChild    = $stateParams.hasChild;

         $scope.hasChild = hasChild;
         if(categoryId){
             console.log(hasChild);
             if(hasChild == 1) {
                 Products.getProductCategories(categoryId, 1).then(
                     function (result) {
                         if (typeof result == "object") {
                             $scope.ProductCategories = result.data;
                         }
                     }, function (error) {
                         alert("ERR:GetProductCategories, Request error.");
                     });
             } else {
                 Products.getProducts('DESC', 1, 100, categoryId, '').then(
                     function (result) {
                         console.log(result.data);
                         if (typeof result == "object") {
                             $scope.Products = result.data;
                         }
                     }, function (error) {
                         alert("ERR:GetProducts, Request error.");
                     });
             }

         }
    })
    .controller('ProductDetailCtrl', function ($scope, $stateParams, localstorage, Products) {
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
