angular.module('starter.controllers', ['ngCordova', 'ngStorage'])
    .controller('AppCtrl', function ($scope, localstorage, $translate, UIHelper) {
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
                    $scope.IntroDesc  = result.data.meta_description;
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
    .controller('DashHotProductsListCtrl', function ($scope, localstorage, $timeout, $ionicLoading, ApiHome) {
        // Setup the loader
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
          //hot products
          ApiHome.getLatestProducts(0, 5).then(
            function (result) {
              if (typeof result == "object") {
                $scope.latestProducts = result.data;
              }
            }, function (error) {
              alert("ERR:GetLatestProducts, request error.");
            });
        });

        // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide();
        // method whenever everything is ready or loaded.
        $timeout(function () {
          $ionicLoading.hide();
        }, 1500);

        var page = 1;
        $scope.doRefresh = function () {
            ApiHome.getLatestProducts((++page - 1) * 5, 5).then(
                function (result) {
                    if (typeof result == "object") {
                        $scope.latestProducts = result.data;
                    }
                }, function (error) {
                    alert("ERR:" + error);

                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.moreDataCanBeLoaded = function () {
          if(page >= 1){
            return true;
          } else {
            return false;
          }
        };
        $scope.loadMore = function () {
            page = --page;
            if(page < 0) {
              page = 0;
            }
            ApiHome.getLatestProducts( page * 5, 5).then(
              function (result) {
                if (typeof result == "object") {
                  $scope.latestProducts = result.data;
                  $scope.$broadcast('scroll.infiniteScrollComplete');

                }
              }, function (error) {
                alert("ERR:" + error);

              });
        };
        $scope.$on('$stateChangeSuccess', function() {
          $scope.loadMore();
        });
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
    .controller('ProductVideoListCtrl', function ($scope, $state, $stateParams, localstorage, $ionicLoading, $timeout, Products) {
        // Setup the loader
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
          Products.getProductVideos('DESC', 0, 5).then(
            function (result) {
              if (typeof result == "object") {
                $scope.ProductVideoList = result.data;
              }
            }, function (error) {
              alert("ERR:GetProductVideoList, request error.");
            });
        });

        // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide();
        // method whenever everything is ready or loaded.
        $timeout(function () {
          $ionicLoading.hide();
        }, 1500);

        var page = 1;
        $scope.doRefresh = function () {
          Products.getProductVideos('DESC', ++page, 5).then(
            function (result) {
              if (typeof result == "object") {
                $scope.latestProducts = result.data;
              }
            }, function (error) {
              alert("ERR:" + error);

            })
            .finally(function () {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.moreDataCanBeLoaded = function () {
          if(page >= 1){
            return true;
          } else {
            return false;
          }
        };
        $scope.loadMore = function () {
          if(page < 0) {
            page = 1;
          }
          Products.getProductVideos('DESC', --page, 5).then(
            function (result) {
              if (typeof result == "object") {
                $scope.latestProducts = result.data;
                $scope.$broadcast('scroll.infiniteScrollComplete');

              }
            }, function (error) {
              alert("ERR:" + error);

            });
        };
        $scope.$on('$stateChangeSuccess', function() {
          $scope.loadMore();
        });
    })
    .controller('ProductListCtrl', function ($scope, $state, $stateParams, localstorage, $ionicLoading, $timeout, Products) {
        var categoryId = $stateParams.categoryId;
        var hasChild = $stateParams.hasChild;
        $scope.hasFilters  = false;
        $scope.openFilters = function (hasFilters) {
          if(hasFilters) {
            $scope.hasFilters = false;
          } else {
            $scope.hasFilters = true;
          }
        };
        $scope.searchKey = '';
        $scope.searchProduct = function (searchKey, newChild) {
          $scope.hasChild = newChild;
          var searchKey = searchKey.trim();
          $scope.Products = {};
          if(searchKey) {
            $ionicLoading.show({
              template: 'Loading...'
            }).then(function(){
              Products.getProducts('DESC', 0, 30, '', searchKey).then(
                function (result) {
                  if (typeof result == "object") {
                    $scope.Products = result.data;
                  }
                }, function (error) {
                  alert("ERR:GetProducts, request error.");
                });
            });

            // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide();
            // method whenever everything is ready or loaded.
            $timeout(function () {
              $ionicLoading.hide();
            }, 1500);
          }
          //$state.transitionTo($state.current, $stateParams, {
          //  reload: true, inherit: false, notify: true
          //});
        };
        if (categoryId && hasChild < 2) {
          $scope.hasChild = hasChild;
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

    .controller('FeedbackCtrl', function ($scope, $state, $stateParams, $ionicPopup, $timeout, localstorage, UIHelper, Feedback) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.usage    = '';
        $scope.planting = '';

        $scope.username     = '';
        $scope.phone_number = '';
        $scope.sendFeedback = function () {
          UIHelper.showAlert('Add success!');
            var title    = 'Please Make a choice';
            var msg      = 'Are you sure submit ? ';
            var uuid     = localstorage.get('uuid');
            var usage    = $scope.usage;
            var planting = $scope.planting;

            var username     = $scope.username;
            var phone_number = $scope.phone_number;

            var getAddress   = localstorage.get('getAddress');
            var getImageSrc   = localstorage.get('getImageSrc');
            if(typeof getImageSrc != "undefined" && getImageSrc != '') {
                $scope.getImageSrc = getImageSrc;
            } else {
                getImageSrc = '';
            }
            if(typeof getAddress != "undefined" && getAddress != '') {
                $scope.address = getAddress;
            } else {
                getAddress = '';
            }
            if(typeof usage == "undefined" || usage == ''){
                UIHelper.showAlert('Please fill the Usage.', 'test');
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
                            $state.go('tab.feedback-state',{status:'success'});
                        } else {
                          UIHelper.showAlert('Add failed!');
                        }
                    }, function (error) {
                        UIHelper.blockScreen("ERR:AddFeedback, request error.", 3);
                    });
            });
        };

        $scope.resetForm = function (hasConfirm) {
            var title    = 'Please Make a choice';
            var msg      = 'Are you sure Reset ? ';

            if(hasConfirm == 'noConfirm') {
                $scope.usage        = '';
                $scope.planting     = '';
                $scope.username     = '';
                $scope.phone_number = '';


                localstorage.set('getImageSrc', '');
                localstorage.set('getAddress', '');
            } else {
                UIHelper.confirmAndRun(title, msg, function () {
                    $scope.usage        = '';
                    $scope.planting     = '';
                    $scope.username     = '';
                    $scope.phone_number = '';

                    localstorage.set('getAddress', '');
                    localstorage.set('getImageSrc', '');
                });
            }
        };
    })
    .controller('FeedbackStateCtrl', function ($scope, $stateParams, localstorage, $state) {
        var status    = $stateParams.status;
        $scope.status = status;
        $scope.goBack = function () {
          $state.go('tab.feedback');
        }
    })
    .controller('FeedbackHistoryCtrl', function ($scope, $stateParams, localstorage, $ionicLoading, $timeout, Feedback) {
    var customerId = localstorage.get('customerId');
    if(typeof customerId == "undefined" || customerId == '') {
      customerId = localstorage.get('deviceid');
    }
    var page = 1;
    if(typeof customerId != "undefined" && customerId != '') {
      // Setup the loader
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function(){
        Feedback.getFeedbackList(customerId, 0, 5).then(function (result) {
          if (typeof result == "object") {
            $scope.feedbacks = result.data;
          }
        }, function (error) {
          alert("ERR:GetFeedbackList, request error.");
        });
      });

      // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide();
      // method whenever everything is ready or loaded.
      $timeout(function () {
        $ionicLoading.hide();
      }, 1500);

      $scope.doRefresh = function () {
        Feedback.getFeedbackList(customerId, (++page - 1) * 5, 5).then(
          function (result) {
            if (typeof result == "object") {
              $scope.feedbacks = result.data;
            }
          }, function (error) {
            alert("ERR:" + error);

          })
          .finally(function () {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
          });
      };

      $scope.moreDataCanBeLoaded = function () {
        if(page >= 1){
          return true;
        } else {
          return false;
        }
      };
      $scope.loadMore = function () {
        page = --page;
        if(page < 0) {
          page = 0;
        }
        Feedback.getFeedbackList(customerId, page * 5,  5).then(
          function (result) {
            if (typeof result == "object") {
              $scope.feedbacks = result.data;
              $scope.$broadcast('scroll.infiniteScrollComplete');

            }
          }, function (error) {
            alert("ERR:" + error);

          });
      };
      $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
      });
    } else {
      $scope.feedbacks = {};
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
            var getAddress = $scope.editAddress;

            if(getAddress != undefined && getAddress != '') {
                localstorage.set('getAddress', $scope.editAddress);
                $scope.editAddress = '';
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
    });
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}
