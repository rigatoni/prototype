(function(){
  angular
    .module('testapp', [])
    .controller('TestController', TestController);

  function TestController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/process', {params: $scope.formData})
      .success(function(data){
        $scope.responseData = data;
      });
  }
})();
