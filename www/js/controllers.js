angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, localstorage, $translate, UIHelper) {
        $scope.changeLanguage = function (key) {
            $translate.use(key);
            window.localStorage['language'] = key;
            UIHelper.changeLanguage(key);

        };
    })
    .controller('DashCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        ApiHome.getLamsin().then(function (result) {
            if (typeof result == "object") {
                //banner
                ApiHome.getSlideShow(result.bannerConfig.id, result.bannerConfig.width, result.bannerConfig.height)
                    .then(function (result) {
                        if (result.data.banners != undefined) {
                            $scope.banners = result.data.banners;
                        }
                    }, function (error) {
                        UIHelper.showAlert('controllers.GetSlideShow.request.error');
                    });

                //intro
                localstorage.set('IntroId', result.articleConfig.intro);
                localstorage.set('aboutId', result.articleConfig.about);

                ApiHome.getIntro(result.articleConfig.intro)
                    .then(function (result) {
                        if (typeof result == "object") {
                            $scope.IntroTitle = result.data.title;
                            $scope.IntroDesc = result.data.meta_description;
                        }
                    }, function (error) {
                        UIHelper.showAlert('controllers.GetIntro.request.error');
                    });

            } else {
                UIHelper.showAlert('controllers.getLamsin.Service.err1');
            }
        }, function (error) {
            UIHelper.showAlert('controllers.getLamsin.Service.err2');
        });
    })
    .controller('DashIntroCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        var IntroId = localstorage.get('IntroId');
        ApiHome.getIntro(IntroId)
            .then(function (result) {
                if (typeof result == "object") {
                    $scope.IntroTitle = result.data.title;
                    $scope.IntroDesc  = result.data.meta_description;
                    $scope.IntroDescription = result.data.description;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.GetDashIntro.error');
            });
    })
    .controller('DashHotProductsCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        //hot products
        ApiHome.getLatestProducts(0, 3).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.GetLatestProducts.error');
            });
    })
    .controller('DashHotProductsListCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        UIHelper.blockScreen('general.common.loading', 1.5);
        // Setup the loader
        ApiHome.getLatestProducts(0, 5).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.GetLatestProducts.error2');
            });
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
                  UIHelper.showAlert('controllers.GetLatestProducts.error3');
              });
        };
        $scope.$on('$stateChangeSuccess', function() {
          $scope.loadMore();
        });
    })
    .controller('ProductsCtrl', function ($scope, $stateParams, localstorage, Products, UIHelper) {
        Products.getProductVideos('DESC', 1, 1).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideo = result.data;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.GetProductVideos.error');
            });
        Products.getProductCategories(0, 2).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductCategories = result.data;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.GetProductCategories.error');
            });
    })
    .controller('ProductVideoListCtrl', function ($scope, $state, $stateParams, localstorage, Products, UIHelper) {
        UIHelper.blockScreen('general.common.loading', 1.5);
        Products.getProductVideos('DESC', 0, 5).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideoList = result.data;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.GetProductVideos.error');
            });

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
    .controller('ProductListCtrl', function ($scope, $state, $stateParams, localstorage, Products, UIHelper) {
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
              UIHelper.blockScreen('general.common.loading', 1.5);
              Products.getProducts('DESC', 0, 30, '', searchKey).then(
                  function (result) {
                      if (typeof result == "object") {
                          $scope.Products = result.data;
                      }
                  }, function (error) {
                      UIHelper.showAlert('controllers.GetProducts.error');
                  });
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
                        UIHelper.showAlert('controllers.GetProductCategories.error');
                    });
            } else {
                Products.getProducts('DESC', 1, 100, categoryId, '').then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.Products = result.data;
                        }
                    }, function (error) {
                        UIHelper.showAlert('controllers.GetProducts.error');
                    });
            }

        }
    })
    .controller('ProductDetailCtrl', function ($scope, $stateParams, localstorage, Products, UIHelper) {
        //get product information
        Products.getProductInfo($stateParams.productId).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.productInfo = result.data;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.GetProductInfo.error');
            });
    })

    .controller('FeedbackCtrl', function ($scope, $state, $stateParams, $ionicPopup, $timeout, localstorage, Feedback, UIHelper) {
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
        var getImageSrc  = localstorage.get('getImageSrc');
        if(getImageSrc) {
            $scope.haveFile = true;
        } else {
            $scope.haveFile = false;
        }
        $scope.sendFeedback = function () {
            var title    = 'controllers.addFeedback.confirm.title';
            var msg      = 'controllers.addFeedback.confirm.msg';
            var uuid     = localstorage.get('uuid');

            var usage    = $scope.usage;
            var planting = $scope.planting;

            var username     = $scope.username;
            var phone_number = $scope.phone_number;

            var getAddress   = localstorage.get('getAddress');
            var getImageSrc  = localstorage.get('getImageSrc');
            if(getImageSrc) {
                $scope.haveFile = true;
            } else {
                $scope.haveFile = false;
            }
            if(!usage) {
                UIHelper.showAlert('controllers.addFeedback.notice.1');
                return false;
            }
            if(!planting) {
                UIHelper.showAlert('controllers.addFeedback.notice.2');
                return false;
            }
            /***
            var images       = '';
            var image1       = localstorage.get('image1');
            var image2       = localstorage.get('image2');
            var image3       = localstorage.get('image3');
            if(getImageSrc) {
                images += getImageSrc + "#";
            }
            if(image1) {
                images += image1 + "#";
            }
            if(image2) {
                images += image2 + "#";
            }
            if(image3) {
                images += image3 + "#";
            }
             **/
            UIHelper.confirmAndRun(title, msg, function () {
                Feedback.addFeedback(uuid, usage, planting, username, phone_number, getAddress, getImageSrc).then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.resetForm('noConfirm');
                            $state.go('tab.feedback-state', {status:'success'});
                        } else {
                            UIHelper.showAlert('controllers.addFeedback.error');
                        }
                    }, function (error) {
                        //alert(error);
                    });
            });
        };

        $scope.resetForm = function (hasConfirm) {
            var title    = 'controllers.addFeedback.confirm.title';
            var msg      = 'controllers.addFeedback.confirm.msg2';

            if(hasConfirm == 'noConfirm') {
                $scope.usage        = '';
                $scope.planting     = '';
                $scope.username     = '';
                $scope.phone_number = '';

                //localstorage.set('image1', '');
                //localstorage.set('image2', '');
                //localstorage.set('image3', '');
                localstorage.set('getImageSrc', '');
                localstorage.set('getAddress', '');
            } else {
                UIHelper.confirmAndRun(title, msg, function () {
                    $scope.usage        = '';
                    $scope.planting     = '';
                    $scope.username     = '';
                    $scope.phone_number = '';

                    //localstorage.set('image1', '');
                    //localstorage.set('image2', '');
                    //localstorage.set('image3', '');
                    localstorage.set('getImageSrc', '');
                    localstorage.set('getAddress', '');

                });
            }
            localstorage.set('formClear', true);
        };
    })
    .controller('FeedbackStateCtrl', function ($scope, $stateParams, localstorage, $state) {
        var status    = $stateParams.status;
        $scope.status = status;
        $scope.goBack = function () {
          $state.go('tab.feedback');
        }
    })
    .controller('FeedbackHistoryCtrl', function ($scope, $stateParams, localstorage, $ionicLoading, $timeout, Feedback, UIHelper) {
    var customerId = localstorage.get('customerId');
    if(typeof customerId == "undefined" || customerId == '') {
      customerId = localstorage.get('deviceid');
    }
    var page = 1;
    if(typeof customerId != "undefined" && customerId != '') {
        UIHelper.blockScreen('general.common.loading', 1.5);
        Feedback.getFeedbackList(customerId, 0, 5).then(function (result) {
            if (typeof result == "object") {
                $scope.feedbacks = result.data;
            }
        }, function (error) {
            UIHelper.showAlert('controllers.getFeedbackList.error');
        });
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
    .controller('AttachmentsCtrl', function ($scope, localstorage, $cordovaCamera, $cordovaImagePicker, $state, UIHelper) {
        // Triggered on a button click, or some other target
        var image = document.getElementById('showImage');
        /**
        var image1 = document.getElementById('attachments1');
        var image2 = document.getElementById('attachments2');
        var image3 = document.getElementById('attachments3');
        */
        if(localstorage.get('formClear') === true) {
            image.src = '';
            //image1.src = '';
            //image2.src = '';
            //image3.src = '';
        } else {
            localstorage.set('formClear', false);
        }

        $scope.saveImage = function () {
            var title    = 'controllers.addFeedback.confirm.title';
            var msg      = 'controllers.addFeedback.confirm.msg3';
            UIHelper.confirmAndRun(title, msg, function () {
                $scope.attachment = '';
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
                targetWidth: 600,
                targetHeight: 600,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };
            $scope.imageSrc = false;
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.attachment = true;
                image.src = "data:image/jpeg;base64," + imageData;
                localstorage.set('getImageSrc', "data:image/jpeg;base64," + imageData);
            }, function(err) {
                //alert("ERR:" + err);
            });
        };
        $scope.choosePics = function () {
            var options = {
              maximumImagesCount: 1,
              width: 600,
              height: 600,
              quality: 50
            };
            $cordovaImagePicker.getPictures(options)
              .then(function (results) {
                  $scope.attachment = true;
                for (var i = 0; i < results.length; i++) {
                    $scope.convertImgToBase64URL(results[i], function(base64Image){
                        image.src = base64Image;
                        localstorage.set('getImageSrc', base64Image);
                    });
                    /**
                    switch (i) {
                        case 0:
                            $scope.convertImgToBase64URL(results[i], function(base64Image){
                                image.src = base64Image;
                                localstorage.set('image1', base64Image);
                            });
                            break;
                        case 1:
                            $scope.convertImgToBase64URL(results[i], function(base64Image){
                                image2.src = base64Image;
                                localstorage.set('image2', base64Image);
                            });
                            break;
                        case 2:
                            $scope.convertImgToBase64URL(results[i], function(base64Image){
                                image3.src = base64Image;
                                localstorage.set('image3', base64Image);
                            });
                            break;
                        default:
                            break;
                    }
                     **/

                }

              }, function(err) {
                  //alert("ERR:" + err);
              });
        };

        $scope.convertImgToBase64URL = function (url, callback, outputFormat){
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'), dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        };
    })
    .controller('AddressCtrl', function ($scope, $state, $stateParams, localstorage, UIHelper) {
        $scope.saveAddress = function(){
            var getAddress = $scope.editAddress;

            if(getAddress != undefined && getAddress != '') {
                localstorage.set('getAddress', $scope.editAddress);
                $scope.editAddress = '';
            }
            $state.go("tab.feedback");
        }
    })
    .controller('FeedbackDetailCtrl', function ($scope, $stateParams, localstorage, Feedback, UIHelper) {
        $scope.feedback = Feedback.get($stateParams.feedbackId);
    })

    .controller('AccountCtrl', function ($scope, $state, localstorage, $ionicPopover, Account, UIHelper) {

      $scope.loginAccount = {phoneNumber:'', password:'', islogin:false};
      $scope.accountData  = {customerId:'', username:'', address:'', language:''};

      $ionicPopover.fromTemplateUrl('templates/account-login.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });
      $scope.openPopover = function ($event, action) {
        var avatar = localstorage.get('avatar');
        var token = localstorage.get('token');
        if (token) {
          $state.go(action);
        } else {
          $scope.popover.show($event);
        }
      };

      $scope.closePopover = function () {
        $scope.popover.hide();
      };

      //Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.popover.remove();
      });

      // Execute action on hide popover
      $scope.$on('popover.hidden', function () {
        // Execute action
      });

      // Execute action on remove popover
      $scope.$on('popover.removed', function () {
        // Execute action
      });

      $scope.accountLogin = function () {
        if(!$scope.loginAccount.phoneNumber || !$scope.loginAccount.password) {
          UIHelper.showAlert('controllers.account.popover.login.validate');
        } else {
          UIHelper.blockScreen('controllers.account.popover.login.loading', 1.5);
          Account.accountLogin($scope.loginAccount.phoneNumber, $scope.loginAccount.password, '').then(
            function (result) {
              if (typeof result == "object") {
                $scope.loginAccount.islogin   = true;
                $scope.accountData.username   = result.data.fullname;
                $scope.accountData.customerId = result.data.uid;
                localstorage.set('customerId', result.data.uid);
                localstorage.set('token', result.data.token);
                localstorage.set('username', result.data.fullname);
                localstorage.set('phoneNumber', result.data.telephone);
                $scope.popover.hide();
              }
            }, function (error) {
              UIHelper.showAlert('controllers.account.popover.login.error');
            });
        }
      };
    })
    .controller('AccountAvatarCtrl', function ($scope, $ionicActionSheet, $cordovaCamera, $cordovaImagePicker, $timeout, $stateParams, localstorage, UIHelper) {

        $scope.saveAvatar = function () {
            var title    = 'controllers.addFeedback.confirm.title';
            var msg      = 'controllers.addFeedback.confirm.msg5';
            UIHelper.confirmAndRun(title, msg, function () {
                $state.go("tab.account");
            });
        };
        var avatar    = document.getElementById('avatar');
        var avatarSrc = localstorage.get('avatar');

        if(avatarSrc){
            avatar.src = avatarSrc;
        }

        $scope.takeAvatar = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };
            $scope.imageSrc = false;
            $cordovaCamera.getPicture(options).then(function(imageData) {
                avatar.src = "data:image/jpeg;base64," + imageData;
                localstorage.set('avatar', "data:image/jpeg;base64," + imageData);
            }, function(err) {
                alert("ERR:" + err);
            });
        };
        $scope.chooseAvatar = function () {
            var options = {
                maximumImagesCount: 1,
                width: 300,
                height: 300,
                quality: 50
            };
            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        switch (i) {
                            case 0:
                                $scope.convertImgToBase64URL(results[i], function(base64Image){
                                    avatar.src = base64Image;
                                    localstorage.set('avatar', base64Image);
                                });
                                break;
                            default:
                                break;
                        }

                    }

                }, function(err) {
                    alert("ERR:" + err);
                });
        };

        $scope.convertImgToBase64URL = function (url, callback, outputFormat){
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'), dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        };
        UIHelper.translate(
            ['controllers.addFeedback.avatar.TakeAnAvatar'
                , 'controllers.addFeedback.avatar.ChooseFromAlbum'
                , 'controllers.addFeedback.avatar.ChooseTitle'
                , 'general.btn.cancel'
            ]).then(function (t) {
            $scope.showActions = function() {
                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        { text: '<b>' + t[0] + '</b>' },
                        { text: t[1] }
                    ],
                    titleText: t[2],
                    cancelText: t[3],
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0:
                                $scope.takeAvatar();
                                break;
                            case 1:
                                $scope.chooseAvatar();
                                break;
                            default:
                                break;
                        }
                        return true;
                    }
                });

                // For example's sake, hide the sheet after two seconds
                $timeout(function() {
                    hideSheet();
                }, 3000);

            };
        });
    })
    .controller('AccountUsernameCtrl', function ($scope, $state, $stateParams, localstorage, ApiHome, UIHelper) {

        $scope.account_username = localstorage.get('username');

        $scope.saveUserName = function () {
            var username = $scope.account_username;
            if(username) {
                localstorage.set('username', username);
                console.log(localstorage.get('username'));

            }
            $state.go('tab.account');
        }
    })
    .controller('AccountChooseLanguageCtrl', function ($scope, UIHelper) {
        $scope.languages = {
            available: ['en', 'zh'],
            selected: UIHelper.getCurrentLanguage()
        };
        $scope.$watch('languages.selected', function (newLang) {
            window.localStorage['language'] = newLang;
            UIHelper.changeLanguage(newLang);
        });
    })
    .controller('AccountAboutCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        var aboutId = localstorage.get('aboutId');
        ApiHome.getIntro(aboutId)
            .then(function (result) {
                if (typeof result == "object") {
                    $scope.AboutTitle = result.data.title;
                    $scope.AboutDesc = result.data.description;
                }
            }, function (error) {
                UIHelper.showAlert('controllers.dashIntro.error');
            });
    });

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}
