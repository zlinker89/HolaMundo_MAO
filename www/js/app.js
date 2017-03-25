
var app = angular.module('starter', ['ionic', 'ngCordova', 'angularSoap'])

app.run(function($ionicPlatform, $ionicPopup, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
      //Keep in mind the function will return null if the token has not been established yet.
      FCMPlugin.getToken(
        function(token){
          //alert(token);
          $http.post("http://192.168.1.7/api/Token",{token: token}).then(function(d){
            console.log(d);
          },
            function(e){console.log(e);});
          console.log(token);
        },
        function(err){
          console.log('error retrieving token: ' + err);
        }
      );
      //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
      //Here you define your application behaviour based on the notification data.
      FCMPlugin.onNotification(
        function(data){
          if(data.wasTapped){
            //Notification was received on device tray and tapped by the user.
            $ionicPopup.alert({
                template: data.mensaje_foreground,
                title: data.title,
                cssClass: 'popPUP'
            });
          }else{
            //Notification was received in foreground. Maybe the user needs to be notified.
            $ionicPopup.alert({
                template: data.mensaje_foreground,
                title: data.title,
                cssClass: 'popPUP'
            });
          }
        },
        function(msg){
          console.log('onNotification callback successfully registered: ' + msg);
        },
        function(err){
          console.log('Error registering onNotification callback: ' + err);
        }
      );
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


