app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  // Each tab has its own nav history stack:

  .state('qr', {
    url: '/qr',
    templateUrl: 'templates/qr.html',
    controller: 'QRCtrl'
    
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/qr');

});