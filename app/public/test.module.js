(function(){
  angular
    .module('testapp', [])
    .controller('TestController', TestController);

  function TestController($scope, $http) {
    $scope.formData = {};

    $scope.submitForm = function() {
      $http.get('/api/process?text=' + $scope.formData.text)
      .success(function(data){
        $scope.responseData = data;
      });
    }
  }
})();
