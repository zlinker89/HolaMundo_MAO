app.controller('QRCtrl', function ($scope, $cordovaBarcodeScanner, $soap, $ionicLoading, $cordovaNetwork) {
    $scope.total = null;
    $scope.data = [];
    $scope.QR_Code = false;
    // $soap.post('http://192.168.1.12:8080/WebApp/Sumar$_$1'.split("$_$")[0], "GetProductos", { op: 'http://192.168.1.12:8080/WebApp/Sumar$_$1'.split("$_$")[1] }).then(function (d) {
    //                             console.log(d);
    //                             if (d.length > 0) {
    //                                 $scope.QR_Code = true;
    //                                 $scope.data = d;
    //                                 $ionicLoading.hide();
    //                                 $soap.post('http://192.168.1.12:8080/WebApp/Sumar$_$1'.split("$_$")[0], "GetTotal", { MesaId: 'http://192.168.1.12:8080/WebApp/Sumar$_$1'.split("$_$")[1] }).then(function (d) {
    //                                     console.log(d);
    //                                     $scope.total = d[0];
    //                                 },
    //                                     function (e) { console.log(e) });
    //                             }else{
    //                                 $ionicLoading.hide();
    //                                 alert("Error: No se encontraron datos en esta mesa. Intente de nuevo.")   
    //                             }
    //                         },
    //                             function (e) { console.log(e) });
    $scope.Escanear = function () {
        try {

            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (!result.cancelled) {
                        if ($cordovaNetwork.isOnline()) {
                            $ionicLoading.show({
                                template: '<ion-spinner class="spinner-energized"></ion-spinner>'
                            });
                            try {
                                $soap.post(result.text.split("$_$")[0], "GetProductos", { op: result.text.split("$_$")[1] }).then(function (d) {
                                    console.log(d);
                                    if (d.length > 0) {
                                        $scope.QR_Code = true;
                                        $scope.data = d;
                                        $ionicLoading.hide();
                                        $soap.post(result.text.split("$_$")[0], "GetTotal", { MesaId: result.text.split("$_$")[1] }).then(function (d) {
                                            console.log(d);
                                            $scope.total = d[0];
                                        },
                                            function (e) { alert(e); });
                                    } else {
                                        $ionicLoading.hide();
                                        alert("Error: No se encontraron datos en esta mesa. Intente de nuevo.")
                                    }
                                },
                                    function (e) { alert(e); });
                            } catch (error) {
                                $ionicLoading.hide();
                                alert(error);
                            }
                        } else {
                            alert("Compruebe su conexión.");
                        }

                    } else {
                        $ionicLoading.hide();
                        alert("Cancelado por el usuario");
                    }


                },
                function (error) {
                    $ionicLoading.hide();
                    alert("Scanning failed: " + error);
                },
                {
                    preferFrontCamera: false, // iOS and Android
                    showFlipCameraButton: true, // iOS and Android
                    showTorchButton: true, // iOS and Android
                    torchOn: true, // Android, launch with the torch switched on (if available)
                    prompt: "Mantener el codigo QR dentro del rectangulo", // Android
                    //resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                    orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: true, // iOS
                    //disableSuccessBeep: false // iOS
                }
            );
        } catch (error) {
            $ionicLoading.hide();
            alert(error);
        }
    };

    $scope.Reset = function () {
        $scope.total = null;
        $scope.data = [];
        $scope.QR_Code = false;
    }
})