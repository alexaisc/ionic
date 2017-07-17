(function(){
  'use strict';
  angular.module('starter').service('SongsService',SongsService);
  SongsService.$inject=['$http', "API"];
  function SongsService($http,API){
    var service={
      getSongs:getSongs
    };

 function getSongs()
 {
      return $http({
        'method':'GET',
        'url':API.url+'recommendations'
      }).then(function (response){
        return response;
      })
        .catch(function(){
          console.log('Error');
      });
 }

  return service;
  }

})();
