'use strict';

/**
 * @ngdoc function
 * @name tpDesapMockupsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tpDesapMockupsApp
 */
angular.module('tp-dapp-eiroa-lando')
  .controller('NewNameEntityCtrl', function ($scope,$log,$http,$modalInstance,data,
		  growl,globalService,dialogs,$location,$translate) {
	//-- Variables --//
	   $scope.user = {name : ''};
	   $scope.additionalData= data;
	   console.log(data);
	   
	   //Traducimos el titulo
	   $translate($scope.additionalData.title).then(function (text) {
			$scope.title = text;;
		    });

	   //-- Methods --//

		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		}; // end cancel

		
		$scope.registerOk = function(response) {
				$modalInstance.close($scope.user.name);			
		}
		
		$scope.hitEnter = function(evt){
		    if(angular.equals(evt.keyCode,13) && 
		    		!(angular.equals($scope.user.name,null) || 
		    				angular.equals($scope.user.name,'')))
						$scope.save();
		  };

		 $scope.save = function(){
			 data = mergeJSONs({name: $scope.user.name}, $scope.additionalData);
			 console.log("Enviando: ",data);
			 var header = defaultHeader();
			 if(validate()){
				 invokeRestService($http, header, data, $scope.additionalData.serviceRest, 
						 $scope.additionalData.resourceRest,$scope.registerOk, defaultHandlerOnError);
			 }else{
				 getErrorMessage();
			 }
		 };
		 
			function validate(){
				if ($scope.user.name == null || $scope.user.name== ""){
					return false;
				}
				return true;
			}
			
			function getErrorMessage(){

				if ($scope.name == null || $scope.name== ""){
					$translate('FORM_ERROR_NAME_REQUIRED').then(function (text) {
						growl.error(text);
					    });
				}

			}
  });
