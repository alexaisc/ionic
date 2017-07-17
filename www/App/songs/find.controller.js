(function(){
 'use strict';
 angular.module('starter')
        .controller('FindController',FindController, 'starter.controllers', 'starter.services', 'ionic-audio');
 FindController.$inject=['$scope','$rootScope','SongsService','$ionicPlatform'];
 function FindController($scope, $rootScope,SongsService,$ionicPlatform){

   var vm=this;
   vm.getSong=getSong;
   vm.concatSongs=concatSongs;
   vm.start=start;
   vm.addFavorite=addFavorite;
   vm.discardSong=discardSong;
   $ionicPlatform.ready(start);
    vm.audio = new Audio();
   $scope.playSong=playSong;
   function playSong(url){
     try{
      vm.audio.src=url;
       vm.audio.play();
     }
     catch(e){
       alert(e);
     }
   }

   vm.songs=[];
    function start(){
    vm.concatSongs();

    }
function getSong(){
  return SongsService.getSongs();
}

function removeFirstSong(){
  vm.songs.splice(0,1);
  if(vm.songs.length<3){
    concatSongs();
  }
    playSong(vm.songs[0].preview_url);
}

function concatSongs(){

   getSong().then(function(songs){
    vm.songs=vm.songs.concat(songs.data);
      playSong(vm.songs[0].preview_url);
  })

}

     function addFavorite(){
       $rootScope.favorites.push(vm.songs[0]);
       removeFirstSong();

       //console.log( $rootScope.favorites.length);
     }

     function discardSong(){
       removeFirstSong();

       //console.log(vm.songs.length);
     }

}


})();
