angular.module('starter.services', [])
  .constant('ApiHost', {
    url: 'http://ok.cms.debug/index.php?route=openapi'
  })
  // For the real endpoint, we'd use this
  // .constant('ApiEndpoint', {
  //  url: 'http://cors.api.com/api'
  // })
  .factory('Api', function ($http, $httpParamSerializer, ApiHost) {
    function registerDevice (uuid) {
      try {
        var request = {
          method: 'POST',
          url: ApiHost.url + '/account/registerdevice',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Deviceid': 'deviceid',
            'Token': 'token',
            'Sysversion': 'com.lamsin.starter',
            'Sysname': 'iOS'
          },
          data: $httpParamSerializer({
            uuid: uuid,
            appversion: '0.0.0.1',
            sysversion: '9.3',
            bundleid: 'com.lamsin.starter',
            sysname: 'iOS'
          })
        };
        var ret = false;
        $http(request).then(function (response) {
          ret = true;
          console.log(response.message);
        }, function (response) {
          console.log(response.message);
        });

        return ret;

      } catch (err) {
        console.log("Error: " + err.message);
        return err.message;
      }
    }
    return {
      registerDevice: function(uuid){
        return registerDevice(uuid);
      }
    };

    /**
     var getApiData = function () {
      return $http.get(ApiEndpoint.url + '/tasks')
        .then(function (data) {
          console.log('Got some data: ', data);
          return data;
        });
    };

     return {
      getApiData: getApiData
    };**/
  })
.factory('Feedback', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feedback = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return feedback;
    },
    remove: function(feedback) {
      feedback.splice(feedback.indexOf(feedback), 1);
    },
    get: function(feedbackId) {
      for (var i = 0; i < feedback.length; i++) {
        if (feedback[i].id === parseInt(feedbackId)) {
          return feedback[i];
        }
      }
      return null;
    }
  };
})

.factory('Products', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return products;
    },
    remove: function(feedback) {
      products.splice(products.indexOf(feedback), 1);
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    }
  };
});
