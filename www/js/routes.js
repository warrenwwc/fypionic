angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.paymentRecord', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paymentRecord.html',
        controller: 'paymentRecordCtrl'
      }
    }
  })

  .state('menu.setting', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/setting.html',
        controller: 'settingCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('payment', {
    url: '/page6',
    templateUrl: 'templates/payment.html',
    controller: 'paymentCtrl'
  })

  .state('confirmPayment', {
    url: '/page7',
    templateUrl: 'templates/confirmPayment.html',
    controller: 'confirmPaymentCtrl'
  })

  var privateKey = window.localStorage.getItem("privateKey");
  if (privateKey != null) {
    $urlRouterProvider.otherwise('/side-menu21/page1');
  }
  else {
    $urlRouterProvider.otherwise('/page5');
  }


  

});