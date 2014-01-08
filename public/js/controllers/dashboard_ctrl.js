// dashboard controller
function DashboardCtrl($rootScope, $scope, $http) {
  $rootScope.tab = 'login';
  $scope.formData = {};

}
DashboardCtrl.$inject = ['$rootScope', '$scope', '$http'];
