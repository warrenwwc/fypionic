var url = "https://mint1.coms.hk";
var mint1 = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxf17kB0kRznB/NH9/bokZ635UrIsO7q8NekNLUqxJDxCrCoesvqSz0Wln9tCPtfLGpwK9AXXlOtuSjxlx+yxsbIm0eNoV6TBvBnVAHHB2kehJmq/s1LYjVCbw9zQcfJBDw1K+BXirG6ExHwixxV6I8nM/JStDjqM8jUVeX3HkFqmXMKrwqloeKQ/USRHC4l11uZ8WEUQTyFloKpafGv1c2PRbLDt5UGpIxos/9hfHmpvbDA/13/IVTf0oeYLURP5+tYIVdx2tHnyKypNnZgdqYfHIrMv2bRECAsZquBOEyTZKombtIjMunafoxXn7tPAIUrG02uOnJB9UDCIxA3eZQIDAQAB";


angular.module('app.controllers', ['ionic', 'ngCordova', 'ja.qr'])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])

.controller('paymentRecordCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
  $scope.recordList = [];

  $scope.record = async function() {
    req = await req(await recordData(), "record");
    var response = await $http(req);
    $scope.recordList = response.data;
    console.log($scope.recordList);
  }

}])

.controller('settingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams' , '$http', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state) {

  $scope.register = async function() {


    var rsakey = await GenRSAKeyPair();
    console.log(rsakey);
    var publicKey = await getPublicKey(rsakey);
    publicKey = spkiToPEM(publicKey);

    var data = {
       "faddr": publicKey,
        "taddr": mint1,
        "type":"RU",
        "device_id":FCMPlugin.getToken(),
    };

    var sortedData = sortByKeys(_.clone(data));

    var sign = await signData(rsakey.privateKey, str2ab(JSON.stringify(sortedData)));
    sortedData["sign"] = buf2hex(sign);

    console.log(sortedData);

    var req = {
     method: 'POST',
     url: url + "/api",
     headers: {
       'Content-Type': "application/json"
     },
     data: sortedData
    }

    $http(req).then(async function(response){
      console.log(response.data.message);
      if (response.data.message == "SUCCESS_CREATE_TICKET") {
        localStorage.setItem("privateKey", JSON.stringify(await exportKey(rsakey.privateKey)));
        localStorage.setItem("publicKey", JSON.stringify(await exportKey(rsakey.publicKey)));
        localStorage.setItem("publicKeyPEM", publicKey);
        $state.transitionTo('menu.home');
      }
    }, function(){});

  }

}])

.controller('paymentCtrl', ['$scope', '$stateParams', '$cordovaBarcodeScanner', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaBarcodeScanner) {

  $scope.scanBarcode = function () {
      $cordovaBarcodeScanner.scan().then(function (result) {                   
          $scope.barcode = result.text;
          $scope.format = result.format;
      }, function (error) {
          console.warn("An error happened -> " + error);
      });

      $scope.Pay = function() {
        strArr = $scope.barcode.split(",");

      }
  };

}])

.controller('confirmPaymentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('transferCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
  $rootScope.amount = "";
  $scope.Add = function(num) {
    $rootScope.amount += num;
  }
  $scope.Del = function() {
    $rootScope.amount = $rootScope.amount.substring(0, $rootScope.amount.length - 1);
  }

}])

.controller('qRCodeCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
  $scope.qrcodeString = localStorage.getItem("publicKeyPEM") + "," + $rootScope.amount;
  $scope.size = 250;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.image = true;

}])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})