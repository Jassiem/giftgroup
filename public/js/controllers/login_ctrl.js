// login controller
function LoginCtrl($rootScope, $scope, $http, $location) {
  $rootScope.tab = 'login';
  $scope.formData = {};

  // send off ajax request
  $scope.login = function() {

    $http({ method: 'POST', url: '/login', timeout: 10000, data: $scope.formData }).
    success(function(data, status, headers, config) {

      /*
       data: {
        login: 'success' or 'fail'
        message: server side login error message
       }
      */

      if (data.login === 'success') {
        $location.path('/home');
      } else {
        // invalid login
      }
    }).
    error(function(data, status, headers, config) {
      // error connecting with server
    });
  };

}
LoginCtrl.$inject = ['$rootScope', '$scope', '$http', '$location'];
