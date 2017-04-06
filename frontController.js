(function() {

    'use strict';

var app =  angular
        .module('StarterApp');

        app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);

        app.filter('month', function() {
          return function(date) {
            var time = date.split(" ");
            var date = time[0].split("-");
            var day = date[2];
            var year = date[0];
            var month = date[1];

            var d = new Date(year, month, day);

            var months = new Array(12);
            months[1] = "January";
            months[2] = "February";
            months[3] = "March";
            months[4] = "April";
            months[5] = "May";
            months[6] = "June";
            months[7] = "July";
            months[8] = "August";
            months[9] = "September";
            months[10] = "October";
            months[11] = "November";
            months[12] = "December";

            var eventDate = new Array(3);
            eventDate[0] = day;
            eventDate[1] = months[d.getMonth()];
            eventDate[2] = year;

            return months[d.getMonth()];
            //return eventDate;

          };
        });

        app.filter('day', function() {
          return function(date) {


            var time = date.split(" ");
            var date = time[0].split("-");
            var day = date[2];
            var year = date[0];
            var month = date[1];

            var d = new Date(year, month, day);

            return day;
            //return eventDate;

          };
        });

        app.filter('maxLines', function() {
          return function(txt,  limit) {

              var parts = txt.split("\n");

              if(limit == 0) return parts.join('\n');
              var htmldata = parts.slice(0,limit).join('\n');

              return htmldata;
              }
        });

        app.filter('textSize', function() {
          return function(txt, letterLimit, linesLimit) {

              var length = txt.length;
              var parts = txt.split("\n");
              var flag = false;

              if(length > letterLimit) {
                flag = true;
                }

              if(parts[linesLimit]){
                flag = true;
              }

              return flag;
              }
        });

        app.controller('AdminController', function($scope, $http) {



          $scope.letterLimit = 250;
          $scope.linesLimit = 5;

          $http.get('http://admin.ledfx:8888/api/data').then(function(data) {
              $scope.data = data;
            });

          console.log('hi');

        });


        app.controller('FrontController', function($scope, $http) {



          $scope.letterLimit = 250;
          $scope.linesLimit = 5;

          $http.get('http://admin.ledfx:8888/api/data').then(function(data) {
              $scope.data = data;

              $scope.homepage_image_object = $scope.data.data.meta.filter(function(item){
                    return item.key === 'homepage_image';
              });

              $scope.homepage_image_url = $scope.homepage_image_object[0].value;

            });





        });

  })(); // EO controller file
