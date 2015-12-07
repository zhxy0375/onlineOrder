(function(){
	var duiDirective = angular.module('dui.directive', []);
	
	//日期选择指令
	duiDirective.directive('datePicker', function() {
		return {
			restrict: 'A',
			require: '?ngModel',
			scope: {
				select: '&'
			},
			link: function(scope, element, attrs, ngModel) {
				if(element.data('initialized') !== true){
					element.date_input();
				}
				
				if (!ngModel) return;
				
				//view ==> model
				element.change(function(){
					scope.$apply(function () {
						ngModel.$setViewValue(element.hasClass('onlyMonth') ? element.attr('onlymonthdate') : element.val());
						
						if(scope.select){
							scope.select();
						}
					});
				});
				
				//model ==> view
				ngModel.$render = function() {
					var result = ngModel.$viewValue || '';
					element.val(element.hasClass('onlyMonth') ? date2MonthDate(result) : result);
					
					if(result != ''){
						element.addClass('bg_none');
					}
				};
				
				function date2MonthDate(date){
					if(date == '') return '';
					
					var objDate = new Date(date);
					return objDate.getFullYear() + '年' + (objDate.getMonth()+1) + '月';
				}
			}
		};
	});
	
	
	//简单分页指令
	duiDirective.directive('duiSimplePagination', function(){
		return {
			restrict: 'EA',
			replace: 'true',
			template: '<div class="pageNew pageMini">\
						<span ng-show="currentPage == 1" class="in_block prev"></span>\
						<a ng-show="currentPage != 1" href="javascript:;" class="in_block btn prev" ng-click="prev()"></a>\
						<span class="in_block shortNo"><b>{{currentPage}}</b>/{{totalPage}}</span>\
						<a ng-show="currentPage != totalPage" href="javascript:;" class="in_block btn next" ng-click="next()"></a>\
						<span ng-show="currentPage == totalPage" class="in_block next"></span>\
					</div>',
			scope: {
				totalPage: '=',
				currentPage: '=',
				clickCallback: '&'
			},
			link: function(scope, el, attrs){
				scope.currentPage = scope.currentPage || 1;
				scope.totalPage = scope.totalPage || 0;
				
				scope.next = function(){
					if(scope.currentPage < scope.totalPage){
						scope.currentPage++;
						if(attrs.clickCallback){
							scope.clickCallback({pageNo: scope.currentPage})
						}
					}
				};
				
				scope.prev = function(){
					if(scope.currentPage > 1){
						scope.currentPage--;
						if(attrs.clickCallback){
							scope.clickCallback({pageNo: scope.currentPage})
						}
					}
				};
			}
		};
	});
	
	
	
	//分页指令：recordCount记录条数， pageSize每页记录数， currentPage当前页
	duiDirective.directive('paginator', function(){
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				recordCount:'=',
				pageSize: '=',
				currentPage: '=',
				displayNum: '@',
				showJump: '@',
				clickCallback: '&'
			},
			link: function(scope, element, attrs) {
				//initPaginator(scope, element);

				scope.$watch('recordCount + pageSize + currentPage', function(){
					initPaginator(scope, element);
				});
				
				function initPaginator(scope, element){
					var paginateConfig = {
						recordCount: scope.recordCount,
						pageSize: scope.pageSize || 10,
						currentPage: scope.currentPage || 1,
						displayNum: scope.displayNum || 10,
						clickCallback: setCurrentPage
					}
					
					if(scope.showJump === 'true'){
						paginateConfig.showJump = true;
						paginateConfig.jumpCallback = setCurrentPage;
					}
					
					element.pagination(paginateConfig);
					
					function setCurrentPage(currentPage){
						scope.$apply(function(){
							scope.currentPage = currentPage;
							if(attrs.clickCallback){
								scope.clickCallback({pageNo: currentPage});
							}
						});
					}
				}
			}
		};
	});
	
	
	//复选框指令
	duiDirective.directive('checkList', function() {
		  return {
		    scope: {
		      list: '=checkList',
		      value: '@'
		    },
		    link: function(scope, elem, attrs) {
		      var handler = function(setup) {
		        var checked = elem.prop('checked');
		        var index = scope.list.indexOf(scope.value);

		        if (checked && index == -1) {
		          if (setup) elem.prop('checked', false);
		          else scope.list.push(scope.value);
		        } else if (!checked && index != -1) {
		          if (setup) elem.prop('checked', true);
		          else scope.list.splice(index, 1);
		        }
		      };

		      var setupHandler = handler.bind(null, true);
		      var changeHandler = handler.bind(null, false);

		      elem.bind('change', function() {
		        scope.$apply(changeHandler);
		      });
		      scope.$watch('list', setupHandler, true);
		    }
		  };
	});
	
	
	//查询过滤器指令
	duiDirective.directive('searchFilter', function() {
		return {
			restrict: 'EA',
			scope: {
			  datasource: '=',
			  selected: '='
			},
			template: '<a href="javascript:;" ng-class="{current: item.value == selected}" ng-repeat="item in localDatasource" ng-click="select(item)">{{item.text}}</a>',
			link: function(scope, element, attrs) {
				scope.select = function(selectedItem){
					scope.selected = selectedItem.value;
				}

				scope.$watch('datasource', function(value){
					scope.localDatasource = transfer(scope.datasource);
				}, true);

				//原始数据源[{empNo: 85678, empName: '张黎光'}] ==> 指令需要的数据格式[{value: 85678, text: '张黎光'}]
				function transfer(datasource){
					var result = [];
					
					if(!datasource){
						return result;
					}
					
					if(attrs.allvalue != undefined && attrs.alltext != undefined){
						result.push({value: attrs.allvalue, text: attrs.alltext});
					}

					if(datasource && datasource.length > 0){
						if(typeof datasource[0] === 'string'){
							angular.forEach(datasource, function(item){
								result.push({value: item, text: item});
							});
						}else if(angular.isObject(datasource[0]) && attrs.valuealias !== undefined && attrs.textalias !== undefined){
							angular.forEach(datasource, function(item){
								result.push({value: item[attrs.valuealias], text: item[attrs.textalias]});
							});
						}else{
							angular.forEach(datasource, function(item){
								result.push({value: item.value, text: item.text});
							});
						}
					}

					return result;
				}
			}
		};
	});
	
	
	duiDirective.directive('ngBlur', ['$parse', function($parse) {
	  return function(scope, element, attr) {
	    var fn = $parse(attr['ngBlur']);
	    element.bind('blur', function(event) {
	      scope.$apply(function() {
	        fn(scope, {$event:event});
	      });
	    });
	  };
	}]);
	
	
	duiDirective.factory('checkboxService', function(){
		return {
			renderCheckedValues: function($allcheckedbox, ngModel){
				var modelValue  = ngModel.$viewValue || [];
				
				$allcheckedbox.attr('checked', false);
				angular.forEach(modelValue, function(currentValue){
				 	$allcheckedbox.filter('[value=' + currentValue + ']').attr('checked', true);
				});
			},
			setCheckedValuesToModel: function($allcheckedbox, ngModel, scope, isNumber){
				var checkedValues = $allcheckedbox.filter(':checked').map(function(){
						return isNumber === 'true' ? Number($(this).val()) : $(this).val();
					}).get();

				scope.$apply(function(){
					ngModel.$setViewValue(checkedValues);
				});
			}
		};
	}).directive('toggleCheckall', function($timeout, checkboxService, checkboxConstants){
		return {
			restrict: 'EA',
			require: '?ngModel',	
			link: function(scope, el, attrs, ngModel){
				//view => model
				//点击全选
				el.find('.js_checkall').live('click', function(){
					el.find('.js_checksingle').attr('checked', this.checked);
					checkboxService.setCheckedValuesToModel(el.find('.js_checksingle'), ngModel, scope, attrs.isNumber);
				});

				//点击其他复选框
				el.find('.js_checksingle').live('click', function(){
					checkboxService.setCheckedValuesToModel(el.find('.js_checksingle'), ngModel, scope, attrs.isNumber);
					setCheckallStatus();
				});

				//model => view
				ngModel.$render = function(){
					if(attrs.waitDataReady){
						scope.$on(checkboxConstants.dataReadyMessage, function(){
							checkedCheckbox();
						});
					}else{
						checkedCheckbox();
					}
				};
				
				scope.$watch(attrs.ngModel, function(){
					checkedCheckbox();
				}, true);

				function checkedCheckbox(){
					$timeout(function(){
						checkboxService.renderCheckedValues(el.find('.js_checksingle'), ngModel);
						setCheckallStatus();
					}, 50);
				}

				function setCheckallStatus(){
					el.find('.js_checkall').attr('checked', (el.find('.js_checksingle:checked').length === el.find('.js_checksingle').length && el.find('.js_checksingle').length != 0));
				}
			}
		}
	}).directive('checkboxcontainer', function($timeout, checkboxService, checkboxConstants){
		return {
			restrict: 'EA',
			require: '?ngModel',
			link: function(scope, el, attrs, ngModel){
				//view => model
				el.find('.js_checkbox').live('click', function(){
					checkboxService.setCheckedValuesToModel(el.find('.js_checkbox'), ngModel, scope, attrs.isNumber);
				});

				//model => view
				ngModel.$render = function(){
					if(attrs.waitDataReady){
						scope.$on(checkboxConstants.dataReadyMessage, function(){
							checkedCheckbox();
						});
					}else{
						checkedCheckbox();
					}
				};
				
				scope.$watch(attrs.ngModel, function(){
					checkedCheckbox();
				}, true);

				function checkedCheckbox(){
					$timeout(function(){
						checkboxService.renderCheckedValues(el.find('.js_checkbox'), ngModel);
					}, 50);
				}
			}
		};
	}).constant('checkboxConstants', {
		dataReadyMessage: 'dataReady'
	});
	
	duiDirective.directive('duitree', function(){
		//datasourceType: 数据源类型: all, back, front, frontWithStore, frontWithBranch
		//checkableType: 节点类型是否可选，值为all,部门,区域,门店,分行;  其中all表示所有节点可选, 其他值可随意组合， 比如'门店,分行'
		//checkbox: 是否为复选树
		//containEmployee: //是否包含员工
		return {
			restrict: 'E',
			scope: {
				datasource: '=',
				selectedData: '=',	
				select: '&',
				unselectCallback: '&',
				quickPickCallback: '&',
				areaCode: '@',
				areaName: '@',
				branchCode: '@',
				branchName: '@',
				empNo: '@',
				empName: '@',
				parentId: '@'
			},
			link: function(scope, element, attrs) {
				if(!scope.datasource && !attrs.datasourceType){
					return;
				}

				var datasource = scope.datasource;
				
				if(!datasource && attrs.datasourceType){
					if(attrs.datasourceType === 'all'){
						datasource = window.All;
					}else if(attrs.datasourceType === 'back'){
						datasource = (window.Support === undefined) ? $.fn.dui.TreePanel.backDatasource(All) :  window.Support;
					}else if(attrs.datasourceType === 'front'){
						datasource = (window.Sales === undefined) ? $.fn.dui.TreePanel.frontDatasource(All) :  window.Sales;
					}else if(attrs.datasourceType === 'frontWithStore'){
						datasource = (window.SalesWithoutBranch === undefined) ? $.fn.dui.TreePanel.frontWithStoreDatasource(All) :  window.SalesWithoutBranch;
					}else if(attrs.datasourceType === 'frontWithBranch'){
						datasource = (window.SalesWithoutStore === undefined) ? $.fn.dui.TreePanel.frontWithBranchDatasource(All) :  window.SalesWithoutStore;
					}
				}
				
				var datasouceTypeMapping = {
					'all': 	'dooiooAll',
					'back': 'dooiooSupport',
					'front': 'dooiooSales',
					'frontWithStore': 'dooiooSalesNoGroup',
					'frontWithBranch': 'dooiooSalesNoDept'
				};	
				
				//初始化配置
				var config = {
					datasourceType: datasouceTypeMapping[attrs.datasourceType || 'all'] || 'dooiooAll',
					checkbox: attrs.checkbox === 'true' ? true : false,
					searchable: attrs.searchable === 'true' ? true : false,
					containEmployee: attrs.containEmployee === 'true' ? true: false,
					checkableType: $.trim(attrs.checkableType) ? $.trim(attrs.checkableType) : '',
					orgStatus: attrs.orgStatus,
					empStatus: attrs.empStatus,
					rejectPublic: attrs.rejectPublic === 'true' ? true : false,
					quickPick: attrs.quickPick === 'true' ? true : false,
					canReset: attrs.canReset === 'true' ? true : false,		
					width: attrs.width ? attrs.width : '150',
					selectCallback: function(nodeData){			//选择节点的回调函数
						if(attrs.selectedData !== undefined){
							scope.$apply(function(){
								scope.selectedData = angular.copy(nodeData);
							});
						}

						if(scope.select){
							scope.$apply(function(){
								scope.select({selectedNodeData: nodeData});
							});
						}
					},
					unselectCallback: function(nodeData){			//清空选择
						if(attrs.selectedData !== undefined){
							scope.$apply(function(){
								scope.selectedData = null;
							});
						}
						
						if(scope.unselectCallback){
							scope.$apply(function(){
								scope.unselectCallback({selectedNodeData: nodeData});
							});
						}
					},
					quickPickCallback: function(qType){		//选择快捷方式
						var quickPickData = {};
						
						//我区，我行，我自己， 对应的值直接跟外部绑定
						if(scope.areaCode !== undefined && scope.areaName !== undefined && 
								scope.branchCode !== undefined && scope.branchName !== undefined &&
								scope.empNo !== undefined && scope.empName !== undefined){
							if(qType === '我区'){
								quickPickData.id = scope.areaCode;
								quickPickData.text = scope.areaName;
								quickPickData.type = '区域';
							}else if(qType === '我行'){
								quickPickData.id = scope.branchCode;
								quickPickData.text = scope.branchName;
								quickPickData.type = '分行';
							}else if(qType === '我自己'){
								quickPickData.id = scope.empNo;
								quickPickData.text = scope.empName;
								quickPickData.isStaff = true;
								quickPickData.type = '员工';
								quickPickData.parentId = scope.parentId;
							}
							
							scope.$apply(function(){
								scope.selectedData = quickPickData;
							});
						}
						
						if(scope.quickPickCallback){
							scope.$apply(function(){
								var quickData = scope.quickPickCallback({qType: qType});
								
								if(attrs.selectedData !== undefined && quickData){
									quickPickData = quickData;
									scope.selectedData = angular.copy(quickPickData);
								}
							});
						}
						return quickPickData;
					}
				};

				//实例化树
				if(attrs.treeType === 'popup'){
					element.popuptree(datasource, config);
					scope.$watch('selectedData', function(newvalue, oldvalue){
						if(newvalue === undefined || newvalue === null){
							element.find('.js_selInput').val('请选择').removeData('selectedNodeData');
							return;
						}
						element.find('.js_selInput').val(newvalue.text || '请选择').data('selectedNodeData', newvalue);
					}, true);
				}else{
					element.tree(datasource, config);
				}
			}
		};
	});
	
	//操作进行等待中，加遮罩和转转转效果
	duiDirective.directive('loadingMask', function(){
	    return {
	        restrict: 'A',
	        scope: {
	            inprogress: '='
	        },
	        link: function(scope, element, attrs) {
	            var $copy = $('<div style="position:absolute; left:0; top:0; z-index:999; background:#fff; opacity:0.5"></div>').css({
	                    'width': element.width() + 'px',
	                    'height': element.height() + 'px'
	                }),
	                $ajaxLoading = $('<img style="position:absolute; z-index:1000; left:50%; top:50%;" src="http://dui.dooioo.com/public/images/icon_ajaxload.gif"/>');

	            element.css('position', 'relative').append($copy);
	            if(attrs.loadingInMask === 'true'){
	            	element.append($ajaxLoading);
	            	$ajaxLoading.css({
	            		left: Math.ceil( (element.width()-32)/2 ),
	            		top: Math.ceil( (element.height()-32)/2 )
	            	});
	            }else{
	            	$('body').append($ajaxLoading);
	            }
	            
	            scope.$watch('inprogress', function(inprogress, oldValue){
	                if(inprogress === true){
	                    $copy.show();
	                    $ajaxLoading.show();
	                }else{
	                    $copy.hide();
	                    $ajaxLoading.hide();
	                }
	            }, true);
	        }
	    };
	});
	
	//操作进行等待中，加遮罩和转转转效果
	duiDirective.directive('duiProcessing', function(){
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var $copy = $('<div style="position:absolute; left:0; top:0; z-index:999; background:#fff; opacity:0.5"></div>').css({
	                    'width': element.width() + 'px',
	                    'height': element.height() + 'px'
	                }),
	                $ajaxLoading = $('<img style="position:absolute; z-index:1000; left:50%; top:50%;" src="http://dui.dooioo.com/public/images/icon_ajaxload.gif"/>');

	            element.css('position', 'relative').append($copy);
	            if(attrs.loadingInMask === 'true'){
	            	element.append($ajaxLoading);
	            	$ajaxLoading.css({
	            		left: Math.ceil( (element.width()-32)/2 ),
	            		top: Math.ceil( (element.height()-32)/2 )
	            	});
	            }else{
	            	$('body').append($ajaxLoading);
	            }
	            
	            scope.$watch(attrs.processing, function(processing, oldValue){
	                if(processing === true){
	                    $copy.show();
	                    $ajaxLoading.show();
	                }else{
	                    $copy.hide();
	                    $ajaxLoading.hide();
	                }
	            }, true);
	        }
	    };
	});
	
	//if判断指令，用于补充ng-switch条件只能是固定几个枚举值的缺陷
	//基本用法如下： <div dui-if="params.pageNo > 0"></div>
	duiDirective.directive('duiIf', function(){
        return {
          transclude: 'element',
          priority: 500,
          compile: function(element, attr, transclude){
             return function postLink(scope, element, attr) {
                var childElement, childScope;

                scope.$watch(attr['duiIf'], function(newValue){
                  if(childElement){
                    childElement.remove();
                    childScope.$destroy();
                    childElement = undefined;
                    childScope = undefined;
                  }

                  if(newValue){
                    childScope = scope.$new();
                    childElement = transclude(childScope, function(clone){
                      element.after(clone);
                    })
                  }
                });
             }
          }
        };
    });
	
}());