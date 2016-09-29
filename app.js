var app = angular.module('app', ['ngRoute']);
    app.config(['$routeProvider',function($routeProvider) {
    	$routeProvider
    	.when('/home',{
    		templateUrl: 'FrontEnd/View/Principal.html',
    		controller: 'Ctrl'
    	})
    	.when('/loginAdministrador',{
    		templateUrl: 'FrontEnd/View/LoginAdmnistrador.html',
			controller: 'ControllerAdmin'
    	})
      .when('/interfaceAdministrador',{
        templateUrl: 'FrontEnd/View/InterfaceAdministrador.html',
        controller: 'ControllerInterfaceAdmin'
      })
      .when('/loginProfesor',{
        templateUrl: 'FrontEnd/View/loginProfesor.html',
        controller: 'ControllerProfe'
      })
      .when('/interfaceProfesor',{
        templateUrl : 'FrontEnd/View/interfaceProfesor.html',
        controller:'controllerInterfaceProf'
      })
    	.otherwise({
    		redirectTo: '/home'
    	});
    }]);


  app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
         }
      };
   }]);

   app.service('fileUpload', ['$http', function ($http) {
      this.uploadFileToUrl = function(file, uploadUrl){
         var fd = new FormData();
         fd.append('file', file);

         $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': 'application/json'}
         })

         .success(function(){
         })

         .error(function(){
         });
      }
   }]);

  //Servicio utilizado para compartir datos entre algunos controladores
  app.factory("ServicioDatos" ,function(){
    var ret = function(){}
    ret.datosCompatidos = "Valor";
    ret.logAdmin = false;
    ret.logProf = "false"
    ret.estud = "false";
    return ret;
  });

	app.controller('ControllerAdmin', function($scope, $http, $location, ServicioDatos){

    //Usado para los avisos de datos ingresados correcto o incorrectos
    $scope.comprobar = "";
    $scope.comprobar2 = true;

		$scope.verificarAdmi = function(){

      $http.post('BackEnd/LoginAdmin/validarAdmin.php', {username: $scope.Adm.user , pass: $scope.Adm.password })
            .then(function(res){
              console.log('Success', res.data);
                $scope.comprobar = res.data.Respuesta;
                $scope.comprobar2 = false;

                if ($scope.comprobar == true) {


                  ServicioDatos.logAdmin = true;


                  $location.path('/interfaceAdministrador');

                }else{
                    ServicioDatos.logAdmin = false;
                }

            });
		};
	});

  app.controller('ControllerProfe', function($scope, $http, $location, ServicioDatos){

    //Usado para los avisos de datos ingresados correcto o incorrectos
    $scope.comprobar = "";
    $scope.comprobar2 = true;
    $scope.vara = "";
    $scope.servicio = ServicioDatos;

		$scope.verificarProf = function(){

      $http.post('BackEnd/LoginProf/LoginProf.php', {username: $scope.Adm.user , pass: $scope.Adm.password })
            .then(function(res){
              console.log('Success', res.data);
                $scope.comprobar = res.data.Respuesta;
                $scope.comprobar2 = false;

                if ($scope.comprobar == true) {


                  ServicioDatos.logAdmin = true;


                  $location.path('/interfaceAdministrador');

                }else{
                    ServicioDatos.logAdmin = false;
                }

            });
		};

    //
    // $scope.verificarProf = function(){
    //
    //   var req = {
    //     method : 'POST',
    //     url : "http://localhost:8888/AutentificacionProf",
    //     headers: {
    //       'Content-Type' : 'application/json'
    //     },
    //     data: $.param({ name : $scope.Profe.nomb , password : $scope.Profe.pass})
    //   };
    //
    //   $http(req)
    //   .then(function(res){
    //     //window.alert(res.data.query.NombreRsquest + " " + res.data.query.NombreDB);
    //     console.log('Success', res.data);
    //     $scope.comprobar = res.data.Respuesta;
    //     $scope.comprobar2 = false;
    //
    //     if ($scope.comprobar == true) {
    //
    //       ServicioDatos.datosCompatidos = res.data.Materia;
    //
    //       $location.path('/interfaceProfesor');
    //
    //
    //     }
    //
    //   });
    //
    //
    //   //window.alert("$scope.Adm.user + $scope.Adm.password");
    // };

  });

  app.controller('ControllerInterfaceAdmin', function($scope, $http, $location, $route, ServicioDatos){

    //esto ocurrira si se quiere acceder a la interfaz de admin sin logearse
    if (ServicioDatos.logAdmin == false){

      $location.path('/home');

    }

      $scope.nombreProfesor = "";
      $scope.asignatura = "";
      $scope.contras = "";
      $scope.oferta = [];

      //Peticion para obtener datos y llenar la tabla con la oferta academica

      $http.get('BackEnd/LoginAdmin/loginAdmin.php')
          .then(function(res){

            console.log('Success', res.data);
            $scope.oferta = res.data;

          });

      $scope.agregarProfesor = function(){

        $http.post('BackEnd/LoginAdmin/loginAdmin.php', {operacion : "agregar",nam : $scope.nombreProfesor , Asignatura : $scope.asignatura, Contrasena : $scope.contras })
              .then(function(res){
                console.log('Success', res.data);
                  $scope.comprobar = res.data.Respuesta;
                  $scope.comprobar2 = false;

                  if ($scope.comprobar == true) {

                      ServicioDatos.logAdmin = true;

                      $location.path('/interfaceAdministrador');
                       $route.reload();

                  }else{
                      ServicioDatos.logAdmin = false;
                  }

              });


      }

      $scope.eliminarProfesor = function(){

        $http.post('BackEnd/LoginAdmin/loginAdmin.php', {operacion : "borrar",nam : $scope.nombreProfesor , Asignatura : $scope.asignatura })
              .then(function(res){
                console.log('Success', res.data);
                  $scope.comprobar = res.data.Respuesta;
                  $scope.comprobar2 = false;

                  if ($scope.comprobar == true) {

                      ServicioDatos.logAdmin = true;

                      $location.path('/interfaceAdministrador');
                       $route.reload();

                  }else{
                      ServicioDatos.logAdmin = false;
                  }

              });

      }

      $scope.cerrarSesion = function(){

          $location.path('/loginAdministrador');

      }



  });

  app.controller('controllerInterfaceProf',function($scope,ServicioDatos, $http, fileUpload){

    $scope.servicio = ServicioDatos;
    console.log($scope.servicio.datosCompatidos);

    $scope.uploadFile = function(){
       var file = $scope.myFile;

       console.log('file is ' );
       console.dir(file);

       var uploadUrl = "http://localhost:8888/interfaceProfesor";
       fileUpload.uploadFileToUrl(file, uploadUrl);
    };



    // //1. Used to list all selected files
    // $scope.files = [];
    //
    // //2. a simple model that want to pass to Web API along with selected files
    // $scope.jsonData = {
    //     name: "Jignesh Trivedi",
    //     comments: "Multiple upload files"
    // };
    // //3. listen for the file selected event which is raised from directive
    // $scope.$on("seletedFile", function (event, args) {
    //     $scope.$apply(function () {
    //         //add the file object to the scope's files collection
    //         $scope.files.push(args.file);
    //     });
    // });
    //
    // //4. Post data and selected files.
    // $scope.save = function () {
    //     $http({
    //         method: 'POST',
    //         url: "http://localhost:8888/interfaceProfesor",
    //         headers: { 'Content-Type': 'application/json' },
    //
    //         transformRequest: function (data) {
    //             var formData = new FormData();
    //             formData.append("model", angular.toJson(data.model));
    //             for (var i = 0; i < data.files.length; i++) {
    //                 formData.append("file" + i, data.files[i]);
    //             }
    //             return formData;
    //         },
    //         data: { model: $scope.jsonData, files: $scope.files }
    //     }).
    //     success(function (data, status, headers, config) {
    //         alert("success!");
    //         console.log(data);
    //     }).
    //     error(function (data, status, headers, config) {
    //         alert("failed!");
    //     });
    // };

  })
