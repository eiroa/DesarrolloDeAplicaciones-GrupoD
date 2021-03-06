'use Strict';

/**
 * @ngdoc function
 * @name tp-dapp-eiroa-lando.controller:ClientsAndProvidersCtrl
 * @description # ClientsAndProvidersCtrl Controller of the tp-dapp-eiroa-lando
 */

angular.module('tp-dapp-eiroa-lando').controller(
		'ClientsAndProvidersCtrl',
		function($scope, $location, $http, $rootScope, growl, dialogs,$route,
				globalService, $translate, ngTableParams, restServices,
				$filter, $timeout) {

			// Inicializa los combMainMenuos
			$scope.inicializarVista = function() {
				globalService.setInMainMenu();
				$scope.totalUsers = 0;
				$scope.currentPage = 1;
				restServices.invokeGetProviders($http, {},
						$scope.findOk, restServices.defaultHandlerOnError);
			}
			
			$scope.deleteOk = function(response) {
				$translate('DIALOG_DELETE_SUCCESS').then(function (text) {
					growl.info(text + name);
					$route.reload();
				    });
			}
			function deleteProvider(id) {
				var data = {
					providerId: id
				};
				restServices.invokeDeleteProvider($http, data, $scope.deleteOk,
						restServices.defaultHandlerOnError);
			}
			$scope.confirmDeleteProvider = function(providerId,name) {
				var title;
				var desc;
				$translate('DIALOG_PROVIDER_DELETE_TITLE').then(function (text) {
					 title = text;
					 $translate('DIALOG_PROVIDER_DELETE_DESC').then(function (text) {
						 desc = text;
						 var dlg = dialogs.confirm(title + name + ' ?',desc);
							dlg.result.then(function(btn) {
								deleteProvider(providerId);
							}, function(btn) {

							});
					    });
				    });				
			};
			
			

			$scope.newProvider = function() {
				$rootScope.registeringProvider = true;
			}
			
			$scope.editProvider = function(provider) {
				$rootScope.registeringProvider = false;
				$rootScope.providerToEdit = provider;
			}

			$scope.tableColumns = {
				providerId : "ID",
				name : "Name",
				tradeName : "Trade name",
				cuit : "Cuit",
				address : "Address",
				phone : "Telephone",
				actions : "Actions"
			};
			translateTableColumns();

			$rootScope.$on('$translateChangeSuccess', function() {
				translateTableColumns();
			});
			function translateTableColumns() {
				$translate('FORM_NAME').then(function(text) {
					$scope.tableColumns.name = text;
				});
				$translate('FORM_TRADENAME').then(function(text) {
					$scope.tableColumns.tradeName = text;
				});
				$translate('FORM_ADDRESS').then(function(text) {
					$scope.tableColumns.address = text;
				});
				$translate('FORM_PHONE').then(function(text) {
					$scope.tableColumns.phone = text;
				});
				$translate('FORM_ACTIONS').then(function(text) {
					$scope.tableColumns.actions = text;
				});

			}

			$scope.findOk = function(response) {
				$scope.resultProviders = [];
				$scope.resultProviders = response;
				console.log($scope.resultProviders)
				$scope.tableParams = new ngTableParams({
					page : 1, // show first page
					count : 10, // count per page
					filter : {

					},
					sorting : {

					}
				},
						{
							counts : [ 10, 20, 30, 50 ],
							total : function() {
								return getData().length;
							}, // length of data
							getData : function($defer, params) {

								var filteredData = params.filter() ? $filter(
										'filter')($scope.resultProviders,
										params.filter())
										: $scope.resultProviders;
								var orderedData = params.sorting() ? $filter(
										'orderBy')(filteredData,
										params.orderBy()) : filteredData;

								$defer.resolve(orderedData.slice(
										(params.page() - 1) * params.count(),
										params.page() * params.count()));
							},
							$scope : {
								$data : {}
							}
						});

			}

			function reloadTable() {
				$timeout(function() {
					$scope.$watch("dataset", function() {
						$scope.tableParams.reload();
					});
				}, 0);
			}



			// Default Controlador
			$scope.inicializarVista();

		});
