app.controller('QRCtrl', function($scope, $cordovaBarcodeScanner) {
  $scope.Escanear = function(){
    try {
        // $cordovaBarcodeScanner.scan().then(function(imageData) {
        //     alert(imageData.text);
        //     console.log("Barcode Format -> " + imageData.format);
        //     console.log("Cancelled -> " + imageData.cancelled);
        // }, function(error) {
        //     console.log("An error happened -> " + error);
        // });
        cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          prompt : "Mantener el codigo QR dentro del rectangulo", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          //disableSuccessBeep: false // iOS
      }
   );
    } catch (error) {
        alert(error);
    }
  };
})