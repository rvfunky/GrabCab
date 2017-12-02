var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage']);
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
//States start here-----------------------------------------------------------------
        .state('app', {
            url: '/',
            views: {
                'header':{
                    templateUrl: 'resources/html/header.html'
                },
                'content':{
                	templateUrl: 'resources/html/login.html',
                	controller: 'loginController'
                }

            }
        })
        
//-------------------------------------------------------------------------------       
        .state('app.register',{
        	url: 'register',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/register.html',
        			controller: 'registerController'
        		}
        	}
        })
  //--------------------------------------------------------------------------      
        
        .state('app.home',{
        	url: 'mainTest',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/home.html',
        			controller: 'homeController'
        		}
        	}
        })
 //--------------------------------------------------------------------------------       
        .state('app.passengerHome',{
        	url: 'passengerHome',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/passenger/passengerHome.html',
        			controller: 'rideController'
        		}
        	}
        }) 
//-----------------------------------------------------------------------------------        
        .state('app.requested',{
        	url: 'requested',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/passenger/passengerRequestinprogress.html',
        			controller: 'Ctrl1'
        		}
        	}
        }) 
//----------------------------------------------------------------------------------------      
         .state('app.passengerHistory',{
        	url: 'passengerHistory',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/passenger/history.html',
        			controller: 'historyController'
        		}
        	}
        }) 
 //--------------------------------------------------------------------------------------------       
           .state('app.driver',{
        	url: 'driver',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/driver/driver.html',
        			controller: 'getRidesController'
        		}
        	}
        })
//----------------------------------------------------------------------------------------------        
        .state('app.rideStatus',{
        	url: 'rideStatus',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/driver/status.html',
        			controller: 'rideStatusController'
        		}
        	}
        })
//---------------------------------------------------------------------------------------------------        
        .state('app.rating',{
        	url: 'rating',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/driver/rating.html',
        			controller: 'passengerRatingController'
        		}
        	}
        })
//-----------------------------------------------------------------------------------------------------        
        .state('app.passengerRating',{
        	url: 'rating',
        	views: {
        		'header@':{
        			templateUrl: 'resources/html/header.html'
        		},
        		'content@':{
        			templateUrl: 'resources/html/driver/passengerRating.html',
        			controller: 'dRatingController'
        		}
        	}
        })
               
        
});

//States end here----------------------------------------------------------------------------------------------
///Controllers Start here--------------------------------------------------------------------------------------

//Raghu:Login Functionality
     routerApp.controller('loginController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
	   $scope.login=function(){
		   if($scope.driverOrPassenger=="driver"){
			   $http({
		           method:'post',
		           url:'/grabCab/',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		               username:$scope.email,
		               password:$scope.password,
		               type:"driver"
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);
		    		   $state.transitionTo("app.driver");
		            }
		           else{
		               
		
		           }
		       })
		   }
		   else{
			   $http({
		           method:'post',
		           url:'/grabCab/',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		               username:$scope.email,
		               password:$scope.password,
		               type:"passenger"
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);
		    		   $state.transitionTo("app.passengerHome");
		            }
		           else{
		               
		
		           }
		       })
		   }
	   }
	   $scope.switchToRegister=function(){
		   $state.transitionTo("app.register");
	   }
     }])
     
//Raghu:Home Redirection----------------------------------------------------------------------------------------------    
     
       routerApp.controller('homeController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
    	   $http({
    		   method:'post',
    		   url:'/grabCab/testing'
    	   }).then(function(data){
    		   console.log(data);
    	   }, function errorCallback(response) {
    		  console.log("error occured re!"); 
    	   });
     }])
     
 //Swati:Autohide and show driver and passenger form------------------------------------------------------------------
     routerApp.controller('MyController', function ($scope) {
         //This will hide the DIV by default.
         $scope.IsHidden = true;
         $scope.ShowHide = function () {
             //If DIV is hidden it will be visible and vice versa.
             $scope.IsHidden = $scope.IsHidden ? false : true;
         }
     });
     
//Swati:Registration Functionality------------------------------------------------------------------------------------
     routerApp.controller('registerController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  	   $scope.register=function(){
	       console.log($scope.passengerEmail);
	       console.log("inside register function");
  		   if(!($scope.passengerEmail)){
	  		   $http({
		           method:'post',
		           url:'/grabCab/driver',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		               username:$scope.username,
		               email:$scope.email,
		               phone:$scope.phone,
		               password:$scope.password,
		               licenseNumber:$scope.licenseNumber,
		               cardnumber:$scope.cardnumber,
		               cardname:$scope.cardname,
		               expirydate:$scope.expirydate,
		               type:'driver'
		               
		       
		           }
		
		       }).then(function(data){
		           console.log(data);
		           console.log("inside success");
		           console.log($scope.email);
		    	   if(data.status==200){
		               console.log(data.token);
		    		   $state.transitionTo("app");
		            }
		           else{
		               
		
		           }
		       })
	       }
	       else{
	  		   $http({
		           method:'post',
		           url:'/grabCab/passenger',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		               username:$scope.username,
		               email:$scope.passengerEmail,
		               password:$scope.password,
		               phone:$scope.phone,
		               cardnumber:$scope.cardnumber,
		               cardname:$scope.cardname,
		               expirydate:$scope.expirydate,
		               type:'passenger'
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);
		    		   $state.transitionTo("app");
		            }
		           else{
		               
		
		           }
		       })
	       }
	   }
  	   $scope.switchToLogin=function(){
  		   $state.transitionTo("app");
  	   }
     }])

//Swati:Requesting ride from passenger home -------------------------------------------------------------------------   
     routerApp.controller('rideController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  	   $scope.request=function(){  
	  		   $http({
		           method:'post',
		           url:'/grabCab/ride',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		        	   pickupLocation:$scope.pickupLocation,
		        	   dropOffLocation:$scope.dropOffLocation,
		        	   carType:$scope.carType
		           }
		
		       }).then(function(data){
		     //  }).then(function(){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);          
		    		   $state.transitionTo("app.requested");
		            }
		           else{
		               
		
		           }
		       })
	       
	   }
  	  //Swati:Redirection to history -----------------------------------------------------------------------
  	 $scope.history=function(){  	         
	    		   $state.transitionTo("app.passengerHistory");

 }
  	   
     }])
     
     
//Swati:polling and presenting driver details   on on progress page in passenger's application page ----------------------
     routerApp.controller('Ctrl1',['$scope','$http','$state','$window','$interval',function($scope,$http,$state,$window,$interval){
    	 var poll=function(){
    		 
    		 $interval(function(){
    			 $http({
			           method:'GET',
			           url:'/grabCab/isRideAccepted',
			           headers: {"Content-Type":"application/x-www-form-urlencoded"}
			       }).then(function (response){ 
			        	   if(response.rideStatus== 'R'){
			    	        	 console.log("in progress");
			    			   	poll();
			        	   }
			    	       else if(response.rideStatus=='A')
			    	       { 
				    		   $scope.RideID=response.RideID;
				        	   $scope.driverName=response.driverName;
				        	   $scope.driverPhoneNumber=response.driverPhoneNumber;
				        	   $scope.carType=response.carType; 		          
				        	   return;
			    	       }
			    	       else if(response.rideStatus=='C'){
			    	    	   $state.transitionTo("app.passengerRating");
			    	       }
			        });
			        	   
			        	   //case1.parent().parent().css({'display': 'none'});
			       },1000);
    		

    	    };     
    	   poll();
     
     }])
         
 //Swati:Ride Cancellation  by passenger------------------------------------------------------------------------------
     routerApp.controller('requestController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  	   $scope.Cancel=function(){  
	  		   $http({
		           method:'PUT',
		           url:'/grabCab/ride',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{

		        	   Reason:$scope.Reason,
		        	   rideStatus:'C'
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);          
		    		   $state.transitionTo("app.passengerHome");
		            }
		           else{
		               
		
		           }
		       })
	       
	   }
     }])
     
 //Kanika:Driver Homepage-------------------------------------------------------------------------------------------     
     //Kanika: getting all rides in a radio and accepting one----------------------------------------------------------
     routerApp.controller('getRidesController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
    	 //get request for requested rides
    	 
    	 $http({
             method:'get',
             url:'/grabCab/driver',
             headers: {"Content-Type":"application/x-www-form-urlencoded"},
             
             data:{
            	 
             }

         }).success(function(data){
             if(data.statusCode==200){
             $scope.rideID=data.rideID;
        	 $scope.pickupLocation=data.ride_ID;
             }
    	       
    	            else{


    	            }
    	        }).error(function(error){

    	        })
    	 
    	 //post request for accepting selected ride
  	   $scope.accept=function(){  
	  		   $http({
		           method:'PUT',
		           url:'/grabCab/ride',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		        	   RideId:$scope.RideId,
		        	   rideStatus:'A'
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);          
		    		   $state.transitionTo("app.rideStatus");
		            }
		           else{
		               
		
		           }
		       })
	       
	   }
     }])
     
     
 //Kanika:Driver Ride Status Information---------------------------------------------------------------------------------
     
      routerApp.controller('rideStatusController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  	   $scope.endRide=function(){  
	  		   $http({
		           method:'PUT',
		           url:'/grabCab/ride',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		        	   RideId:$scope.RideId,
		        	   rideStatus:'Ended'
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);          
		    		   $state.transitionTo("app.rating");
		            }
		           else{
		               
		
		           }
		       })
	       
	   }
     }])
     
     //
  //Kanika:Rating a passenger  ------------------------------------------------------------------------------------------------
      routerApp.controller('passengerRatingController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  	   $scope.rate=function(){  
	  		   $http({
		           method:'PUT',
		           url:'/grabCab/ride',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{
		        	   RideId:$scope.RideId,
		        	   UserRating:$scope.UserRating
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);          
		    		   $state.transitionTo("app.driver");
		            }
		           else{
		               
		
		           }
		       })
	   }
     }])
     //Swati:Rating Driver---------------------------------------------------------------------------------------------
      routerApp.controller('dRatingController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
  	   $scope.rate=function(){  
	  		   $http({
		           method:'PUT',
		           url:'/grabCab/ride',
		           headers: {"Content-Type":"application/x-www-form-urlencoded"},
		           transformRequest: function(obj) {
		               var str = [];
		               for(var p in obj)
		               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		               return str.join("&");
		           },
		           data:{//confirm raghu if we can do addition like this
		        	   tip:$scope.tip,
		        	   driverrating:$scope.driverrating
		        	   
		           }
		
		       }).then(function(data){
		           console.log(data);
		    	   if(data.status==200){
		               console.log(data.token);  
		               console.log("Driver successfully rated");
		    		   $state.transitionTo("app.passengerHome");
		            }
		           else{
		               
		
		           }
		       })
	   }
     }])
     
 //Swati: Controller for passenger history get and going back to passenger homepage    
     
  routerApp.controller('historyController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
	  //-----------Go Back
      $scope.GoBack=function(){  
		   $state.transitionTo("app.passengerHome");
}

	  
	  {   $http({
	           method:'GET',
	           url:'/grabCab/passenger/history',
	           headers: {"Content-Type":"application/x-www-form-urlencoded"},
	           transformRequest: function(obj) {
	               var str = [];
	               for(var p in obj)
	               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	               return str.join("&");
	           },
	           data:{
	        	   rideid:response.rideid,
	        	   username:response.username, //Drivers username
	        	   pickuplocation:response.pickuplocation,
	        	   starttime:response.starttime,
	        	   dropofflocation:response.dropofflocation,
	        	   endtime:response.endtime,
	        	   cost:response.cost,
	        	   cartype:response.cartype,
	        	   cardnumber:response.cardnumber
	        	   
	           }
	
	       }).then(function(data){
	           console.log(data);
	    	   if(data.status==200){
	               console.log(data.token); 
	               console.log("history data fetched");  
	            }
	           else{
	               
	
	           }
	       }) }
 
     }])
        
     //Controllers end here---------------------------------------------------------------------------------------------------
