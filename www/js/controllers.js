angular.module('starter.controllers', ['ngCordova', 'ngStorage'])
    .controller('AppCtrl', function ($scope, localstorage, $translate) {
        $scope.platform = ionic.Platform.platform();
        $scope.home = 'Home';
        $scope.about_us = 'About Us';
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
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
                        alert("ERROR:GetSlideShow, request error.");
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
                        alert("ERROR:GetIntro, request error.");
                    });

            } else {
                alert("ERR:01, Service is not available.");
            }
        }, function (error) {
            alert("ERR:02, request error.");
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
                alert("ERROR:DashIntro, request error.");
            });
    })
    .controller('DashHotProductsCtrl', function ($scope, localstorage, ApiHome) {
        //hot products
        ApiHome.getLatestProducts(0, 3).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function (error) {
                alert("ERR:GetLatestProducts, request error.");
            });
    })
    .controller('DashHotProductsListCtrl', function ($scope, localstorage, ApiHome) {
        //hot products
        ApiHome.getLatestProducts(0, 10).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function (error) {
                alert("ERR:GetLatestProducts, request error.");
            });
        $scope.doRefresh = function () {
            ApiHome.getLatestProducts(0, 30).then(
                function (result) {
                    if (typeof result == "object") {
                        $scope.latestProducts = result.data;
                    }
                }, function (error) {
                    alert("ERR:GetLatestProducts, request error.");
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
    })
    .controller('ProductsCtrl', function ($scope, $stateParams, localstorage, Products) {
        Products.getProductVideos('DESC', 1, 1).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideo = result.data;
                }
            }, function (error) {
                alert("ERR:GetProductVideo, request error.");
            });
        Products.getProductCategories(0, 2).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductCategories = result.data;
                }
            }, function (error) {
                alert("ERR:GetProductCategories, request error.");
            });
    })
    .controller('ProductVideoListCtrl', function ($scope, $stateParams, localstorage, Products) {
        Products.getProductVideos('DESC', 1, 100).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideoList = result.data;
                }
            }, function (error) {
                alert("ERR:GetProductVideoList, request error.");
            });
    })
    .controller('ProductListCtrl', function ($scope, $stateParams, localstorage, Products, $ionicScrollDelegate, $rootScope) {
        $rootScope.slideHeader = false;
        $rootScope.slideHeaderPrevious = 0;
        var categoryId = $stateParams.categoryId;
        var hasChild = $stateParams.hasChild;

        $scope.hasChild = hasChild;
        if (categoryId) {
            console.log(hasChild);
            if (hasChild == 1) {
                Products.getProductCategories(categoryId, 1).then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.ProductCategories = result.data;
                        }
                    }, function (error) {
                        alert("ERR:GetProductCategories, request error.");
                    });
            } else {
                Products.getProducts('DESC', 1, 100, categoryId, '').then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.Products = result.data;
                        }
                    }, function (error) {
                        alert("ERR:GetProducts, request error.");
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
                alert("ERR:GetProductInfo, request error.");
            });
    })

    .controller('FeedbackCtrl', function ($scope, $stateParams, localstorage, $ionicActionSheet, $timeout, UIHelper, Feedback) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.sendFeedback = function () {
            var title    = 'Please Make a choice';
            var msg      = 'Are you sure submit ? ';
            var uuid     = localstorage.get('uuid');
            var usage    = $scope.feedback.usage;
            var planting = $scope.feedback.planting;

            var username     = $scope.feedback.username;
            var phone_number = $scope.feedback.phone_number;

            var getAddress   = localstorage.get('getAddress');
            var getImageSrc   = localstorage.get('getImageSrc');
            if(typeof getImageSrc != "undefined" && getImageSrc != '') {
                $scope.feedback.getImageSrc = getImageSrc;
            } else {
                getImageSrc = '';
            }
            if(typeof getAddress != "undefined" && getAddress != '') {
                $scope.feedback.address = getAddress;
            } else {
                getAddress = '';
            }

            console.log(UIHelper.getCurrentLanguage());
            if(typeof usage == "undefined" || usage == ''){
                UIHelper.showAlert('Please fill the Usage.');
                return false;
            }
            if(typeof planting == "undefined" || planting == ''){
                UIHelper.showAlert("Please fill the planting.");
                return false;
            }
            UIHelper.confirmAndRun(title, msg, function () {
                Feedback.addFeedback(uuid, usage, planting, username, phone_number, getAddress, getImageSrc).then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.resetForm('noConfirm');
                            UIHelper.showAlert('Add success!');
                        }
                    }, function (error) {
                        UIHelper.blockScreen("ERR:AddFeedback, request error.", 3);
                    });
            });
        };

        $scope.resetForm = function (hasConfirm) {
            var title    = 'Please Make a choice';
            var msg      = 'Are you sure cancel ? ';

            if(hasConfirm == 'noConfirm') {
                $scope.feedback.usage        = '';
                $scope.feedback.planting     = '';
                $scope.feedback.username     = '';
                $scope.feedback.phone_number = '';


                localstorage.set('getImageSrc', '');
                localstorage.set('getAddress', '');
            } else {
                UIHelper.confirmAndRun(title, msg, function () {
                    $scope.feedback.usage        = '';
                    $scope.feedback.planting     = '';
                    $scope.feedback.username     = '';
                    $scope.feedback.phone_number = '';

                    localstorage.set('getAddress', '');
                    localstorage.set('getImageSrc', '');
                });
            }
        };
        var customerId = localstorage.get('customerId');
        if(typeof customerId == "undefined" || customerId == '') {
            customerId = localstorage.get('deviceid');
        }
        if(typeof customerId != "undefined" && customerId != '') {
            Feedback.getFeedbackList(customerId).then(function (result) {
                if (typeof result == "object") {
                    $scope.feedbacks = result.data;
                }
            }, function (error) {
                alert("ERR:GetFeedbackList, request error.");
            });
        } else {
            $scope.feedbacks = [];
        }
    })

    .controller('AttachmentsCtrl', function ($scope, localstorage, $cordovaCamera, $state, UIHelper) {
        // Triggered on a button click, or some other target

        $scope.saveImage = function () {
            var title    = 'Please Make a choice';
            var msg      = 'Are you sure ? ';
            UIHelper.confirmAndRun(title, msg, function () {
                $scope.feedback.attachment = '';
                $state.go("tab.feedback");
            });
        };

        $scope.takePics = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 800,
                targetHeight: 800,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                encodingType: 0,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                var image = document.getElementById('showImage');
                image.src = "data:image/jpeg;base64," + imageData;
                localstorage.set('getImageSrc', "data:image/jpeg;base64," + imageData);
            }, function(err) {
                alert("ERR:" + err);
            });
        }
    })
    .controller('AddressCtrl', function ($scope, $state, $stateParams, localstorage) {
        $scope.saveAddress = function(){
            var getAddress = $scope.feedback.editAddress;

            if(getAddress != undefined && getAddress != '') {
                localstorage.set('getAddress', $scope.feedback.editAddress);
                $scope.feedback.editAddress = '';
            }
            $state.go("tab.feedback");
        }
    })
    .controller('FeedbackDetailCtrl', function ($scope, $stateParams, localstorage, Feedback) {
        $scope.feedback = Feedback.get($stateParams.feedbackId);
    })

    .controller('AccountCtrl', function ($scope, $stateParams, localstorage) {
    })

    .controller("IntroBoxCtrl", function ($scope, $stateParams, localstorage) {
        //var ctrl = this;

        //ctrl.showIntro = function () {
        //angular.element(document.getElementById('intro-box')).addClass("intro-box-full");
        //}
        $scope.showIntro = function () {
            return 'yes';
        }
    })
    .directive('scrollWatch', function ($rootScope) {
        return function (scope, elem) {
            var start = 0;
            var threshold = 150;

            elem.bind('scroll', function (e) {
                if (e.detail.scrollTop - start > threshold) {
                    $rootScope.slideHeader = true;
                } else {
                    $rootScope.slideHeader = false;
                }
                if ($rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
                    $rootScope.slideHeader = false;
                }
                $rootScope.slideHeaderPrevious = e.detail.scrollTop - start;
                $rootScope.$apply();
            });
        };
    });
