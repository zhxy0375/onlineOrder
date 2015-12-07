(function(){
	var ajaxService = angular.module('dui.service.ajax', []),
		utilsService = angular.module('dui.service.utils', []),
		duiService = angular.module('dui.service', ['dui.service.ajax','dui.service.utils']);
	
	ajaxService.factory('Ajax', function($http){
		return {
			load: function(url, params, context, responseKey){
				$http.get(url, {params: params}).success(function(responseData){
					if(responseData){
						context = responseData[responseKey];
					}
				});
			},
			postForm: function(url, params, opts){			//表单提交
				opts = opts || {};
				$http({method:'POST', url: url, data: serialize(params), headers : {'Content-Type' : 'application/x-www-form-urlencoded'}}).success(function(data){
		        	if(opts.success){
		        		opts.success(data);
		        	}
		        }).error(function(){
		        	if(opts.error){
		        		opts.error(data);
		        	}
		        });
			}
		};
		
		function serialize(topObj){
			var result = {},
				props = [];
			
			walkProps(topObj);
			
			return params(result);
			
			//把对象解析成名值对
			function params(obj){
				var result = [];
				for(var prop in obj){
					result.push(prop + '=' + obj[prop]);
				}
				
				return result.join('&');
			}
			
			
			/*把嵌套的对象转成扁平对象
			{
				empNo: '85678',empName: 'zhanglg',department: {
					code: '23282',
					name: '前端开发组'
				}
			}
			=>
			{empNo: '85678',empName: 'zhanglg',department.code: '23282',department.name: '前端开发组'}
			*/
			function walkProps(obj){
				for(var prop in obj){
					props.push(prop);
					
					if( angular.isObject(obj[prop]) ){
						walkProps(obj[prop]);
					}else{
						result[props.join('.')] = getNestedVal(topObj, props);
						props.splice(props.length-1, 1);
					}
				}
			}
			
			//根据嵌套的key获取值
			function getNestedVal(topObj, props){
				var result = topObj;
				for(var i=0, len=props.length; i<len; i++){
					result = result[props[i]];
				}
				
				return result;
			}
		}
	});
	
	//有用方法
	utilsService.factory('Utils', function(){
		return {
			getParameters: function(){
				var search = window.location.search,
					queryString = (search.length > 0) ? search.substring(1) : '',
					items = queryString.length ? queryString.split('&') : [],
					params = {};
				
				for(var i=0, len=items.length; i<len; i++){
					var pair = items[i].split('=');
					var name = decodeURIComponent(pair[0]);
					var value = decodeURIComponent(pair[1]);
					
					if(name.length){
						params[name] = value;
					}
				}
					
				return params;
			},
			getParameter: function(paramName){
				var params = this.getParameters();
				return params[paramName] ? params[paramName] : '';
			},
			getWeekRange: function(date){		//获取每周的起始日期
				var nowdate = date || new Date(),
					nowtime = nowdate.getTime(),
					dayOfThisWeek = nowdate.getDay(),
					beginDayOfThisWeek = (dayOfThisWeek === 0) ?  -7 : (-dayOfThisWeek + 1),        //上周日距离今天的天数（负数表示）; 如果今天是周日，则为-7
					endDayOfThisWeek = 7 - dayOfThisWeek; // 周日距离今天的天数

				return {
					begin: new Date(nowtime +  beginDayOfThisWeek * 24 * 3600* 1000),
					end: new Date(nowtime +  endDayOfThisWeek * 24 * 3600* 1000)
				}
			},
			getMonthRange: function(date){	//获取每月的起始日期
				var nowdate = date || new Date(),
					year = nowdate.getFullYear(),
					month = nowdate.getMonth(),
					monthlist = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

				if((year%4 == 0 && year%100 != 0) || (year%100 == 0 && year%400 == 0)){
					monthlist[1] = 29;
				}

				return {
					begin: new Date(year, month, 1),
					end: new Date(year, month, monthlist[month])
				}
			 },
			 filterEmpty: function(params, config){		//过滤对象中的空值， 包括null, undefined, ''
				config = config || {};
				var filters = config.filters || ['', null, undefined],
					isNested = config.isNested || false;
					resultParams = angular.copy(params);


				deleteProp(resultParams);

				function deleteProp(obj){
					for(var prop in obj){
						if(obj.hasOwnProperty(prop) && !angular.isFunction(obj[prop])){
							if(isNested && angular.isObject(obj[prop])){			//如果是对象则递归
								deleteProp(obj[prop]);
							}else{
								for(var i=0, len=filters.length; i<len; i++){
									if(obj[prop] === filters[i]){
										delete obj[prop];
										break;
									}
								}
							}
						}
					}
				}

				return resultParams;
			}
		}
	});
	
}());