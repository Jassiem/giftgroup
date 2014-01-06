// signup controller
function SignupCtrl($rootScope, $scope, $http) {
  $rootScope.tab = 'signup';
  $scope.formData = {};
  $scope.spinner = false;

  

  // $scope.saveCustomer = function() {
  //   $scope.spinner = true;

  //   $http({ method: 'POST', url: '/ajax/createUser', timeout: 10000, data: $scope.formData }).
  //   success(function(data, status, headers, config) {
  //     $scope.spinner = false;
  //     console.log(data);
  //   }).
  //   error(function(data, status, headers, config) {
  //     $scope.spinner = false;
  //     // error
  //   });
  // };
}
SignupCtrl.$inject = ['$rootScope', '$scope', '$http'];
