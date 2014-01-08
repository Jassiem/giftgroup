// login controller
function LoginCtrl($rootScope, $scope, $http, $location, $timeout) {
  $rootScope.tab = 'login';
  $scope.formData = {};
  $scope.errorMessage = '';

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
        $scope.errorMessage = 'invalid username or password';
      }
    }).
    error(function(data, status, headers, config) {
      // error connecting with server
      $scope.errorMessage = 'problem authenticating with server';
    });
  };

  // watch error message
  $scope.$watch('errorMessage', function(newValue, oldValue) {
    if (newValue !== '') {
      $timeout(function() {
        $scope.errorMessage = '';
      }, 3000);
    }
  }, true);

}
LoginCtrl.$inject = ['$rootScope', '$scope', '$http', '$location', '$timeout'];
