angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($rootScope, $scope, $state, $stateParams, $window, $cordovaNetwork, localstorage, $translate, UIHelper) {
        document.addEventListener("deviceready", function () {

            var isOnline = $cordovaNetwork.isOnline();
            $rootScope.offline = false;

            if (!isOnline) {
                $rootScope.offline = true;
            }
            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', function () {
                $window.location.reload(true);
            });

            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', function () {
                $rootScope.offline = true;
            });

        }, false);
        $scope.changeLanguage = function (key) {
            $translate.use(key);
            $window.localStorage['language'] = key;
            UIHelper.changeLanguage(key);
            if (ionic.Platform.exitApp) {
                UIHelper.showAlert('tabs.account.language.tip');
                ionic.Platform.exitApp();
            }


        };

    })
    .controller('DashCtrl', function ($scope, $cordovaBadge, $window, localstorage, $ionicSlideBoxDelegate, $timeout, ApiHome, UIHelper) {
        $scope.$on('$ionicView.enter', function () {
            document.addEventListener("deviceready", function () {
                $cordovaBadge.hasPermission().then(function() {
                    $cordovaBadge.get().then(function(badge) {
                        if(badge) {
                            $window.plugins.jPushPlugin.setBadge(0);
                            $window.plugins.jPushPlugin.resetBadge();
                            $window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                        }
                    }, function(err) {
                        // You do not have permission.
                    });
                }, function(no) {
                    // You do not have permission
                });
            });
        });
        $scope.banners = [];
        ApiHome.getLamsin().then(function (result) {
            if (typeof result == "object") {
                //banner
                ApiHome.getSlideShow(result.bannerConfig.id, result.bannerConfig.width, result.bannerConfig.height)
                    .then(function (result) {
                        if (result.data.banners != "undefined") {
                            $scope.banners = result.data.banners;
                            $ionicSlideBoxDelegate.update();
                        }
                    }, function () {
                        UIHelper.blockScreen('controllers.GetSlideShow.request.error', 3);
                    });

                //intro
                localstorage.set('IntroId', result.articleConfig.intro);
                localstorage.set('aboutId', result.articleConfig.about);

                ApiHome.getIntro(result.articleConfig.intro)
                    .then(function (result) {
                        if (typeof result == "object") {
                            $scope.IntroTitle = result.data.title;

                            if(localstorage.get('language') == 'zh') {
                                var introDesc = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + result.data.meta_description;
                            } else {
                                var introDesc = result.data.meta_description;
                            }
                            $scope.IntroDesc = introDesc;
                        }
                    }, function () {
                        UIHelper.blockScreen('controllers.GetIntro.request.error', 3);
                    });

            } else {
                UIHelper.blockScreen('controllers.getLamsin.Service.err1', 3);
            }
        }, function () {
            UIHelper.blockScreen('controllers.getLamsin.Service.err2', 3);
        });
    })
    .controller('DashIntroCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        var IntroId = localstorage.get('IntroId');
        ApiHome.getIntro(IntroId)
            .then(function (result) {
                if (typeof result == "object") {
                    $scope.IntroTitle = result.data.title;
                    $scope.IntroDesc = result.data.meta_description;
                    $scope.IntroDescription = result.data.description;
                }
            }, function () {
                UIHelper.blockScreen('controllers.GetDashIntro.error', 3);
            });
    })
    .controller('DashHotProductsCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        //hot products
        ApiHome.getLatestProducts(0, 3).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function () {
                UIHelper.blockScreen('controllers.GetLatestProducts.error', 3);
            });
    })
    .controller('DashHotProductsListCtrl', function ($scope, localstorage, ApiHome, UIHelper) {
        //UIHelper.blockScreen('general.common.loading', 1.5);
        // Setup the loader
        ApiHome.getLatestProducts(0, 5).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.latestProducts = result.data;
                }
            }, function () {
                UIHelper.blockScreen('controllers.GetLatestProducts.error2', 3);
            });
        var page = 1;
        $scope.doRefresh = function () {
            ApiHome.getLatestProducts((++page - 1) * 5, 5).then(
                function (result) {
                    if (typeof result == "object") {
                        $scope.latestProducts = result.data;
                    }
                }, function () {
                    UIHelper.blockScreen('controllers.GetLatestProducts.error', 3);

                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.moreDataCanBeLoaded = function () {
            if (page >= 1) {
                return true;
            } else {
                return false;
            }
        };
        $scope.loadMore = function () {
            page = --page;
            if (page < 0) {
                page = 0;
            }
            ApiHome.getLatestProducts(page * 5, 5).then(
                function (result) {
                    if (typeof result == "object") {
                        $scope.latestProducts = result.data;
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    }
                }, function () {
                    UIHelper.blockScreen('controllers.GetLatestProducts.error3', 3);
                });
        };
        $scope.$on('$stateChangeSuccess', function () {
            $scope.loadMore();
        });
    })
    .controller('ProductsCtrl', function ($scope, $stateParams, localstorage, Products, UIHelper) {
        Products.getProductVideos('DESC', 1, 1).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideo = result.data;
                }
            }, function () {
                UIHelper.blockScreen('controllers.GetProductVideos.error', 3);
            });
        Products.getProductCategories(0, 2).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductCategories = result.data;
                }
            }, function () {
                UIHelper.blockScreen('controllers.GetProductCategories.error', 3);
            });
    })
    .controller('ProductVideoListCtrl', function ($scope, $state, $stateParams, localstorage, Products, UIHelper) {
        //UIHelper.blockScreen('general.common.loading', 1.5);
        Products.getProductVideos('DESC', 0, 5).then(
            function (result) {
                if (typeof result == "object") {
                    $scope.ProductVideoList = result.data;
                }
            }, function () {
                UIHelper.blockScreen('controllers.GetProductVideos.error', 3);
            });

        var page = 1;
        $scope.doRefresh = function () {
            Products.getProductVideos('DESC', ++page, 5).then(
                function (result) {
                    if (typeof result == "object") {
                        $scope.latestProducts = result.data;
                    }
                }, function () {
                    UIHelper.blockScreen('controllers.GetProductVideos.error', 3);

                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.moreDataCanBeLoaded = function () {
            if (page >= 1) {
                return true;
            } else {
                return false;
            }
        };
        $scope.loadMore = function () {
            if (page < 0) {
                page = 1;
            }
            Products.getProductVideos('DESC', --page, 5).then(
                function (result) {
                    if (typeof result == "object") {
                        $scope.latestProducts = result.data;
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    }
                }, function () {
                    UIHelper.blockScreen('controllers.GetProductVideos.error', 3);

                });
        };
        $scope.$on('$stateChangeSuccess', function () {
            $scope.loadMore();
        });
    })
    .controller('ProductListCtrl', function ($scope, $state, $stateParams, localstorage, Products, UIHelper) {
        var categoryId = $stateParams.categoryId;
        var hasChild = $stateParams.hasChild;
        $scope.hasFilters = false;
        $scope.openFilters = function (hasFilters) {
            if (hasFilters) {
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
            if (searchKey) {
                //UIHelper.blockScreen('general.common.loading', 1.5);
                Products.getProducts('DESC', 0, 30, '', searchKey).then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.Products = result.data;
                        }
                    }, function () {
                        UIHelper.blockScreen('controllers.GetProducts.error', 3);
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
                    }, function () {
                        UIHelper.blockScreen('controllers.GetProductCategories.error', 3);
                    });
            } else {
                Products.getProducts('DESC', 1, 100, categoryId, '').then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.Products = result.data;
                        }
                    }, function () {
                        UIHelper.blockScreen('controllers.GetProducts.error', 3);
                    });
            }

        }
    })
    .controller('ProductDetailCtrl', function ($scope, $state, $stateParams, localstorage, Products, UIHelper) {

        $scope.goProductList = function () {
            $state.go('tab.products');
        };
        //get product information
        Products.getProductInfo($stateParams.productId).then(
            function (result) {
                if (typeof result == "object") {
                    if(!result.data.name) {
                        $state.goBack();
                        UIHelper.blockScreen('controllers.GetProductInfo.none', 3);
                    }
                    $scope.productInfo = result.data;
                }
            }, function () {
                UIHelper.blockScreen('controllers.GetProductInfo.error', 3);
            });
    })

    .controller('FeedbackCtrl', function ($scope, $state, $window, $ionicPopup, $timeout, localstorage, Feedback, UIHelper) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.$on('$ionicView.beforeEnter', function () {

            $scope.usage        = '';
            $scope.email        = '';
            $scope.address      = '';
            $scope.planting     = '';
            $scope.username     = '';
            $scope.phone_number = '';
            $scope.foreign      = false;

            var customerId    = localstorage.get('customerId');
            $scope.customerId = (typeof customerId != "undefined") ? customerId : '';
            var getImageSrc   = localstorage.get('getImageSrc');

            if(localstorage.get('usage')) {
                $scope.usage    = localstorage.get('usage');
            }
            if(localstorage.get('planting')) {
                $scope.planting = localstorage.get('planting');
            }
            if(localstorage.get('address')) {
                $scope.address  = localstorage.get('address');
            }
            if(localstorage.get('language') != 'zh'){
                $scope.foreign   = true;
                if(localstorage.get('email')) {
                    $scope.email = localstorage.get('email');
                }
            } else {
                if(localstorage.get('username')) {
                    $scope.username = localstorage.get('username');
                }
                if(localstorage.get('phone_number')) {
                    $scope.phone_number = localstorage.get('phone_number');
                }
            }

            if (getImageSrc) {
                $scope.haveFile = true;
            } else {
                $scope.haveFile = false;
            }

            if($scope.customerId != '') {
                if($scope.foreign) {
                    $scope.hideInputs = true;
                    $scope.hideEmailInputs = true;
                } else {
                    $scope.hideInputs = true;
                    $scope.hideEmailInputs = true;
                }
            } else {
                if($scope.foreign) {
                    $scope.hideInputs = true;
                    $scope.hideEmailInputs = false;
                } else {
                    $scope.hideInputs = false;
                    $scope.hideEmailInputs = true;
                }
            }

        });

        $scope.$on('$ionicView.beforeLeave', function () {
            if($scope.usage) {
                localstorage.set('usage', $scope.usage);
            }
            if($scope.email) {
                localstorage.set('email', $scope.email);
            }
            if($scope.planting) {
                localstorage.set('planting', $scope.planting);
            }
            if($scope.username) {
                localstorage.set('username', $scope.username);
            }
            if($scope.phone_number) {
                localstorage.set('phone_number', $scope.phone_number);
            }

        });

        $scope.sendFeedback = function () {
            var title = 'controllers.addFeedback.confirm.title';
            var msg   = 'controllers.addFeedback.confirm.msg';
            var uuid  = localstorage.get('uuid');
            var usage = $scope.usage;
            var email = $scope.email;

            var planting     = $scope.planting;
            var username     = $scope.username;
            var phone_number = $scope.phone_number;
            var getAddress   = localstorage.get('address');
            var getImageSrc  = localstorage.get('getImageSrc');

            if (!usage) {
                UIHelper.showAlert('controllers.addFeedback.notice.1');
                return false;
            }
            if (!planting) {
                UIHelper.showAlert('controllers.addFeedback.notice.2');
                return false;
            }
            if(!$scope.hideInputs) {
                if (!username) {
                    UIHelper.showAlert('controllers.addFeedback.notice.5');
                    return false;
                }
                if(!UIHelper.checkPhoneNumber(phone_number)) {
                    UIHelper.showAlert('controllers.addFeedback.notice.3');
                    return false;
                }
            }
            if(!$scope.hideEmailInputs) {
                if(!UIHelper.checkEmail(email)) {
                    UIHelper.showAlert('controllers.addFeedback.notice.4');
                    return false;
                }
            }

            UIHelper.confirmAndRun(title, msg, function () {
                //UIHelper.blockScreen('general.common.waiting', 10);

                if(!$scope.foreign) {
                    Feedback.addFeedback(uuid, usage, planting, $scope.customerId, username, phone_number, getAddress, getImageSrc).then(
                        function (result) {
                            if (typeof result == "object") {
                                $scope.resetForm('noConfirm');
                                $state.go('tab.feedback-state', {status: 'success'});
                            } else {
                                UIHelper.blockScreen('controllers.addFeedback.error', 3);
                            }
                        }, function () {
                            UIHelper.blockScreen('controllers.addFeedback.error', 3);
                        });
                } else {
                    Feedback.addEmailFeedback(uuid, usage, planting, $scope.customerId, email, getImageSrc).then(
                        function (result) {
                            if (typeof result == "object") {
                                $scope.resetForm('noConfirm');
                                $state.go('tab.feedback-state', {status: 'success'});
                            } else {
                                UIHelper.blockScreen('controllers.addFeedback.error', 3);
                            }
                        }, function () {
                            UIHelper.blockScreen('controllers.addFeedback.error', 3);
                        });
                }

            });
        };

        $scope.resetForm = function (hasConfirm) {
            var title = 'controllers.addFeedback.confirm.title';
            var msg = 'controllers.addFeedback.confirm.msg2';

            if (hasConfirm == 'noConfirm') {
                $scope.usage = '';
                $scope.planting = '';
                $scope.username = '';
                $scope.phone_number = '';
                $scope.email = '';

                localstorage.set('getImageSrc', '');
                localstorage.set('address', '');
            } else {
                UIHelper.confirmAndRun(title, msg, function () {
                    $scope.usage = '';
                    $scope.planting = '';
                    $scope.username = '';
                    $scope.phone_number = '';
                    $scope.email = '';

                    localstorage.set('getImageSrc', '');
                    localstorage.set('address', '');
                    $window.location.reload(true);
                });
            }
            //$state.go($state.current, $stateParams, {
            //    reload: true, inherit: false, notify: true
            //});
        };
    })
    .controller('FeedbackStateCtrl', function ($scope, $stateParams, localstorage, $state) {
        var status = $stateParams.status;
        $scope.status = status;
        $scope.goBack = function () {
            $state.go('tab.feedback');
        }
    })
    .controller('FeedbackHistoryCtrl', function ($scope, $state, $stateParams, localstorage, $ionicLoading, $timeout, Feedback, UIHelper) {
        var customerId = localstorage.get('customerId');
        if (typeof customerId == "undefined" || customerId == '') {
            customerId = localstorage.get('deviceid');
        }
        var page = 1;
        if (typeof customerId != "undefined" && customerId != '') {
            //UIHelper.blockScreen('general.common.loading', 1.5);

            $scope.$on('$ionicView.afterEnter', function () {
                Feedback.getFeedbackList(customerId, 0, 5).then(function (result) {
                    if (typeof result == "object") {
                        $scope.feedbacks = result.data;
                    }
                }, function () {
                    UIHelper.blockScreen('controllers.getFeedbackList.error', 3);
                });
                $scope.doRefresh = function () {
                    Feedback.getFeedbackList(customerId, (++page - 1) * 5, 5).then(
                        function (result) {
                            if (typeof result == "object") {
                                $scope.feedbacks = result.data;
                            }
                        }, function () {
                            UIHelper.blockScreen('controllers.getFeedbackList.error', 3);

                        })
                        .finally(function () {
                            // Stop the ion-refresher from spinning
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                };

                $scope.moreDataCanBeLoaded = function () {
                    if (page >= 1) {
                        return true;
                    } else {
                        return false;
                    }
                };
                $scope.loadMore = function () {
                    page = --page;
                    if (page < 0) {
                        page = 0;
                    }
                    Feedback.getFeedbackList(customerId, page * 5, 5).then(
                        function (result) {
                            if (typeof result == "object") {
                                $scope.feedbacks = result.data;
                                $scope.$broadcast('scroll.infiniteScrollComplete');

                            }
                        }, function () {
                            UIHelper.blockScreen('controllers.getFeedbackList.error', 3);

                        });
                };
                $scope.$on('$stateChangeSuccess', function () {
                    if($state.$current.name != 'tab.feedback') {
                        $scope.loadMore();
                    }
                });
            });
        } else {
            $scope.feedbacks = {};
        }
    })
    .controller('AttachmentsCtrl', function ($scope, localstorage, $cordovaCamera, $cordovaImagePicker, $state, UIHelper) {
        // Triggered on a button click, or some other target
        var image = document.getElementById('showImage');
        var imageSrc = localstorage.get('getImageSrc');

        if(imageSrc) {
            image.src = imageSrc;
            $scope.attachment = true;
        }

        $scope.clearImage = function () {
            var title = 'controllers.addFeedback.confirm.title';
            var msg = 'controllers.addFeedback.confirm.msg3';
            UIHelper.confirmAndRun(title, msg, function () {
                $scope.attachment = '';
                image.src = '';
                localstorage.set('getImageSrc', '');
                $state.go("tab.feedback");
            });
        };

        $scope.takePics = function () {
            var options = {
                quality: 60,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $scope.imageSrc = false;
            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.attachment = true;
                image.src = "data:image/jpeg;base64," + imageData;
                localstorage.set('getImageSrc', "data:image/jpeg;base64," + imageData);
            }, function (err) {
                //alert("ERR:" + err);
            });
        };
        $scope.choosePics = function () {
            var options = {
                maximumImagesCount: 1,
                width: 500,
                height: 500,
                quality: 60
            };
            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    $scope.attachment = true;
                    for (var i = 0; i < results.length; i++) {
                        $scope.convertImgToBase64URL(results[i], function (base64Image) {
                            image.src = base64Image;
                            localstorage.set('getImageSrc', base64Image);
                        });

                    }

                }, function (err) {
                    //alert("ERR:" + err);
                });
        };

        $scope.convertImgToBase64URL = function (url, callback, outputFormat) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
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
        $scope.$on('$ionicParentView.beforeEnter', function () {
            if(localstorage.get('address')){
                $scope.editAddress = localstorage.get('address');
            }
        });
        $scope.saveAddress = function () {
            var address = $scope.editAddress;

            if (address != "undefined" && address != '') {
                localstorage.set('address', $scope.editAddress);
            }
            $state.go("tab.feedback");
        }
    })
    .controller('FeedbackDetailCtrl', function ($scope, $stateParams, localstorage, Feedback, UIHelper) {
        $scope.feedback = Feedback.get($stateParams.feedbackId);
    })

    .controller('AccountCtrl', function ($scope, $state, $window, localstorage, $ionicHistory, $ionicPopover, Account, UIHelper) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.loginAccount = {phoneNumber: '', password: '', islogin: false};
            $scope.accountData = {customerId: '', username: '', avatar: '', address: '', language: ''};
            if(localstorage.get('customerId')) {
                $scope.loginAccount = {islogin: true};
                $scope.accountData = {
                    customerId: localstorage.get('customerId'),
                    username  : localstorage.get('username'),
                    avatar    : localstorage.get('avatar'),
                };
            }
        });

        $ionicPopover.fromTemplateUrl('templates/account-login.html', {
            scope: $scope
        }).then(function (popover) {
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
            if (!$scope.loginAccount.phoneNumber || !$scope.loginAccount.password) {
                UIHelper.showAlert('controllers.account.popover.login.validate');
            } else {
                //UIHelper.blockScreen('controllers.account.popover.login.loading', 1.5);
                Account.accountLogin($scope.loginAccount.phoneNumber, $scope.loginAccount.password, '').then(
                    function (result) {
                        if (typeof result == "object") {
                            $scope.loginAccount.islogin = true;
                            $scope.accountData.username = result.data.fullname;
                            $scope.accountData.customerId = result.data.uid;
                            $scope.accountData.avatar = result.data.custom_field;
                            localstorage.set('customerId', result.data.uid);
                            localstorage.set('token', result.data.token);
                            localstorage.set('addressId', result.data.address_id);
                            localstorage.set('address', result.data.address);
                            localstorage.set('username', result.data.fullname);
                            localstorage.set('phoneNumber', result.data.telephone);
                            localstorage.set('avatar', result.data.custom_field);
                            $scope.popover.hide();
                        }
                    }, function (error) {
                        UIHelper.blockScreen('controllers.account.popover.login.error', 3);
                    });
            }
        };

        $scope.accountLogout = function () {
            $window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $window.location.reload(true);

        };
    })
    .controller('AccountAvatarCtrl', function ($scope, $state, $ionicActionSheet, $cordovaCamera, $cordovaImagePicker, $timeout, $stateParams, localstorage, Account, UIHelper) {

        $scope.$on('$ionicView.afterEnter', function () {
            var avatar = document.getElementById('avatar');
            var avatarSrc = localstorage.get('avatar');

            if (avatarSrc) {
                avatar.src = avatarSrc;
            }
        });

        $scope.saveAvatar = function () {
            var avatarNew = document.getElementById('avatar').src;
            if (avatarNew) {
                localstorage.set('avatar', avatarNew);
            }

            var customerId = localstorage.get('customerId');
            if(customerId) {
                Account.saveAvatar(customerId, avatarNew).then(
                    function (result) {
                        if (typeof result == "object") {
                            $state.go('tab.account');
                        } else {
                            UIHelper.blockScreen('controllers.account.saveAvatar.error', 3);
                        }
                    }, function () {
                        UIHelper.blockScreen('controllers.account.saveAvatar.error', 3);
                    });
            }
        }
        $scope.takeAvatar = function () {
            var options = {
                quality: 60,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $scope.imageSrc = false;
            $cordovaCamera.getPicture(options).then(function (imageData) {
                avatar.src = "data:image/jpeg;base64," + imageData;
                localstorage.set('avatar', "data:image/jpeg;base64," + imageData);
            }, function () {
                //alert("ERR:" + err);
            });
        };
        $scope.chooseAvatar = function () {
            var options = {
                maximumImagesCount: 1,
                width: 300,
                height: 300,
                quality: 60
            };
            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        switch (i) {
                            case 0:
                                $scope.convertImgToBase64URL(results[i], function (base64Image) {
                                    avatar.src = base64Image;
                                    localstorage.set('avatar', base64Image);
                                });
                                break;
                            default:
                                break;
                        }

                    }

                }, function () {
                    //alert("ERR:" + err);
                });
        };

        $scope.convertImgToBase64URL = function (url, callback, outputFormat) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
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
            $scope.showActions = function () {
                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        {text: '<b>' + t[0] + '</b>'},
                        {text: t[1]}
                    ],
                    titleText: t[2],
                    cancelText: t[3],
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
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
                $timeout(function () {
                    hideSheet();
                }, 3000);

            };
        });
    })
    .controller('AccountUsernameCtrl', function ($scope, $state, $stateParams, localstorage, Account, UIHelper) {

        $scope.account_username = localstorage.get('username');

        $scope.saveUserName = function () {
            var username = $scope.account_username;
            if (username) {
                localstorage.set('username', username);
            }

            var customerId = localstorage.get('customerId');
            if(customerId) {
                Account.saveUserName(customerId, username).then(
                    function (result) {
                        if (typeof result == "object") {
                            $state.go('tab.account');
                        } else {
                            UIHelper.blockScreen('controllers.account.saveuUserName.error', 3);
                        }
                    }, function () {
                        UIHelper.blockScreen('controllers.account.saveuUserName.error', 3);
                    });
            }
        }
    })
    .controller('AccountAddressCtrl', function ($scope, $state, $stateParams, localstorage, Account, UIHelper) {

        $scope.account_address = localstorage.get('address');

        $scope.saveAddress = function () {
            var address = $scope.account_address;
            if (address) {
                localstorage.set('address', address);
            }

            var customerId = localstorage.get('customerId');
            if(customerId) {
                var addressId = localstorage.get('addressId');
                Account.saveAddress(customerId, addressId, address).then(
                    function (result) {
                        if (typeof result == "object") {
                            $state.go('tab.account');
                        } else {
                            UIHelper.blockScreen('controllers.account.saveAddress.error', 3);
                        }
                    }, function () {
                        UIHelper.blockScreen('controllers.account.saveAddress.error', 3);
                    });
            }
        }
    })
    .controller('AccountChooseLanguageCtrl', function ($scope, $window, UIHelper) {
        $scope.languages = {
            available: ['en', 'zh'],
            selected: UIHelper.getCurrentLanguage()
        };
        $scope.$watch('languages.selected', function (newLang) {
            $window.localStorage['language'] = newLang;
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
            }, function () {
                UIHelper.blockScreen('controllers.dashIntro.error', 3);
            });
    });

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
