app.controller('QRCtrl', function ($scope, $cordovaBarcodeScanner, $soap, $ionicLoading, $cordovaNetwork, $ionicPopup) {
    $scope.total = null;
    $scope.data = [];
    $scope.QR_Code = false;
    $scope.Intervalo = null;
    // $soap.post("http://192.168.1.13:81/prueba.asmx$_$1".split("$_$")[0], "GetProductos", { MesaId: "http://192.168.1.13:81/prueba.asmx$_$1".split("$_$")[1] }).then(function (d) {

    //         console.log(d);
    //         if (d[0].length != 0) {
    //             $scope.QR_Code = true;
    //             if (d[0].Productos) {
    //                 console.log(d);

    //                 $scope.data = d[0];
    //             } else if (d.Productos) {
    //                 $scope.data = d;
    //             } else {
    //                 $scope.Reset();
    //                 ShowMensaje("Error: No se encontraron datos en esta mesa. Intente de nuevo.");
    //             }
    //         } else {
    //             $scope.Reset();
    //             ShowMensaje("Error: No se encontraron datos en esta mesa. Intente de nuevo.");
    //         }
    //         $ionicLoading.hide();

    //     },
    //         function (e) { ShowMensaje("Error!", e); });
    function ShowMensaje(titulo, mensaje) {
        $ionicPopup.alert({
            template: mensaje,
            title: titulo,
            cssClass: 'popPUP'
        });
    }

    function SOAP(result) {
        $soap.post(result.text.split("$_$")[0], "GetProductos", { MesaId: result.text.split("$_$")[1] }).then(function (d) {

            console.log(d);
            if (d[0].length != 0) {
                $scope.QR_Code = true;
                if (d[0].Productos) {
                    console.log(d);

                    $scope.data = d[0];
                } else if (d.Productos) {
                    $scope.data = d;
                } else {
                    $scope.Reset();
                    ShowMensaje("Error: No se encontraron datos en esta mesa. Intente de nuevo.");
                }
            } else {
                $scope.Reset();
                ShowMensaje("Error: No se encontraron datos en esta mesa. Intente de nuevo.");
            }
            $ionicLoading.hide();

        },
            function (e) { ShowMensaje("Error!", e); });
        $scope.$apply();
    }

    function LogicaConsulta(data) {
        if ($cordovaNetwork.isOnline()) {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-energized"></ion-spinner>'
            });
            try {
                SOAP(data);
            } catch (error) {
                $ionicLoading.hide();
                ShowMensaje(error);
                $scope.Reset();

            }
        } else {
            $scope.Reset();
            $ionicLoading.hide();
            ShowMensaje("Error!", "Compruebe su conexión.");
        }
    }

    $scope.Escanear = function () {
        try {

            ScanQR();
        } catch (error) {
            $ionicLoading.hide();
            ShowMensaje("Error!", error);
        }
    };

    $scope.Reset = function () {
        $scope.total = null;
        $scope.data = [];
        $scope.QR_Code = false;
        clearInterval($scope.Intervalo);
    }

    function ScanQR() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    $scope.Intervalo = setInterval(function () {
                        LogicaConsulta(result);
                    }, 20000);
                    LogicaConsulta(result);
                } else {
                    $ionicLoading.hide();
                    ShowMensaje("Notificación:", "Cancelado por el usuario");
                }
            },
            function (error) {
                $ionicLoading.hide();
                ShowMensaje("Error!", "Scanning failed: " + error);
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
    }


})