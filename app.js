var myApp = angular.module('myApp',['ngRoute','ngAnimate','toaster','angularCSS']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/login',{
    templateUrl: 'partials/login.html',
    controller: 'loginController',
    css: 'css/login.css'
  })
  .when('/signup',{
    templateUrl:'partials/signup.html',
    controller: 'signupController',
    css: 'css/login.css'
  })
  .when('/polls',{
    templateUrl: 'partials/polls.html',
    controller: 'pollController'
    })
  .otherwise({
    redirectTo: "index.html"
  });
  $locationProvider.html5Mode(true);
}]);

myApp.controller('loginController',['$scope', function($scope){
  $scope.pagename = 'login';
}]);

myApp.controller('signupController',['$scope', function($scope){
  $scope.pagename = 'signup';
}]);
myApp.controller('HeaderController',['$scope','$location',function($scope, $location)
{
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
        console.log($location.path());
    };
}]);


      // Custom Service for uploading File => uploadFile
    

       // use pollController for submit
  myApp.controller('pollController',  ['$scope','$http','toaster', function($scope,$http,toaster){
        $scope.createPoll = function() {
          var imgInclude = $scope.pollimage;
          var pollAnonymous = false;
          var pollPrivate = false;
          var file = {};

          if(!($scope.pollHeading) || !($scope.pollDescription))
          {
            toaster.pop('error', "Notificaton", "Can not leave any field empty", 5000, 'trustedHtml');
          }
          else
          {
                if(imgInclude === true)
                {
                  if(!($scope.files))
                  {
                    toaster.pop('error', "Notificaton", "Please choose image", 5000, 'trustedHtml');
                    return;
                  }
                  else
                  {
                  $scope.myFile = $scope.files[0];
                  file = $scope.myFile;
                  }
               }
               else
               {
                  imgInclude = false;
               }
                   pollAnonymous = $scope.pollAnonymous;
                   pollPrivate = $scope.pollPrivate;
                   if(!(pollAnonymous))
                   {
                     pollAnonymous = false;
                   }
                   if(!(pollPrivate))
                   {
                     pollPrivate = false;
                   }
                   var jsonObj =
                    {
                       heading: $scope.pollHeading,
                       description: $scope.pollDescription,
                       imageIncluded: imgInclude,
                       pollAnonymous: pollAnonymous,
                       pollPrivate: pollPrivate
                   };
                var url = "upload.php";
                console.log(pollPrivate+"  "+pollAnonymous);
                // uploadFile.uploadFiletoServer(file, url, jsonObj, imgInclude);

                     var formdata = new FormData();
                     if(imgInclude === true)
                     {
                     formdata.append('file', file);
                   }
                    formdata.append('json', angular.toJson(jsonObj));
                    //  console.log(fd);
                     $http.post(url, formdata, {
                         headers: {'Content-Type': undefined,'Process-Data': false}
                     })
                     .then(function(response){
                       console.log(response);

                          toaster.pop('success', "Notificaton", "Poll Created successfully", 5000, 'trustedHtml');
                            $('.emojionearea-editor').empty();
                            $("#poll-heading").val('');
                            $("#poll-description").val('');
                            $("#imageupload").val('');
                            $("#imageview").attr('src','');
                            $scope.showPolls();
                     });

                $scope.pollHeading='';
                $scope.pollDescription='';


          }

        };


         $scope.uploadedFile = function(element) {
       $scope.currentFile = element.files[0];
       var reader = new FileReader();

       reader.onload = function(event) {
         $scope.image_source = event.target.result
         $scope.$apply(function($scope) {
           $scope.files = element.files;
         });
       }
                   reader.readAsDataURL(element.files[0]);
     }

     $scope.showPolls = function()
     {
       $http.get("display.php")
        .then(function (success) {
            $scope.names = success.data;
            console.log($scope.names);
            },
            function (error)
            {
            });
     }
      }]);
