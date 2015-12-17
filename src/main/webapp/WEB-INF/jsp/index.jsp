<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title> - 我家</title>
	<c:set var="versionNo" value="20151209"></c:set>
	<link type="text/css" rel="stylesheet" href="/static/css/main.css?v=${versionNo}">
	<link type="text/css" rel="stylesheet" href="/static/css/fky.css?v=${versionNo}">
	<link type="text/css" rel="stylesheet" href="/static/css/treeNew.css?v=${versionNo}">
	<link type="text/css" rel="stylesheet" href="/static/css/header.css?v=${versionNo}">
	<link type="text/css" rel="stylesheet" href="/static/css/tipsNotice.css?v=${versionNo}">

</head>

<body>
<div id="new_header"></div>

<script type="text/javascript" src="/static/js/lib/jquery-1.6.2.min.js?v=${versionNo}"></script>
<script type="text/javascript" src="/static/js/lib/angular.min.js?v=${versionNo}"></script>

<script type="text/javascript" src="/static/js/lib/jquery.json-2.2.min.js?v=${versionNo}"></script>
<script type="text/javascript" src="/static/js/lib/fns.js?v=${versionNo}"></script>
<script type="text/javascript" src="/static/js/lib/directive.js?v=${versionNo}"></script>
<script type="text/javascript" src="/static/js/lib/service.js?v=${versionNo}"></script>
<script type="text/javascript" src="/static/js/lib/angular-popuplayer-2.0.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-autocomplete-1.0.js"></script>
<script type="text/javascript">

        //初始化各系统及各环境下的地址
        var ResourceMap = new Object();
        //这里要 ${} 是要使用标签的  taglib;  前面一直从session中取不到 是因为 ${} 
        <%-- ResourceMap = angular.fromJson(${ResourceAddrMap}); --%>
        
        ResourceMap = angular.fromJson(<%=session.getAttribute("AddrMap")%>);
        
        // console.log(ResourceMap.version)

    </script>
    
<div class="container" ng-app="zrApp" ng-controller="zrController">
	<h1 class="f18 mt_20 ">自如收房管家楼盘配置页</h1>
<span class="red" style="float: right; margin-right: 40px;">！！！红色字体标识的是过时数据或者此人已离职或无管家楼盘配置权限</span>
	<!--  <div><span><%=session.getAttribute("AddrMap")%></span></div> -->
	<table width="100%" border="0" cellpadding="0" cellspacing="0" class="tableListNew mt_5" ng-click="click($event)">
	 <tbody ng-show="showTimeWait"><tr><td colspan="6" class="pr_10" align="center"><img src="http://dui.dooioo.com/public/images/icon_ajaxload.gif"></td></tr></tbody>
		<tbody ng-hide="showTimeWait">
		<tr class="trHead">
			<td width="200">收房管家</td>
			<td>楼盘</td>
		</tr>
        <tr >
            <td><span >测试MessageMapping</span></td>
            <td>
                <label class="in_block mr_10 mb_10" >
                    <input type="text" id="selectDept" name="selectDept"  defaultText="请选择" ng-model="helper.sendMsg">
                </label>
                <a href="javascript:;" class="btn-small btn-green in_block fy-btn-add" ng-click="ws_sendMessage()">发送信息</a>
            </td>
        </tr>
        <tr >
            <td><span >测试MessageMapping Id</span></td>
            <td>
                <label class="in_block mr_10 mb_10" >
                    <input type="text" id="selectDept2" name="selectDept2"   defaultText="请选择" ng-model="content">
                </label>
                <a href="javascript:;" class="btn-small btn-green in_block fy-btn-add" ng-click="ws_sendContent()">发送信息</a>
            </td>
        </tr>
        </tbody>
	</table>

</div>
<script>
    angular.module('zrApp',[]).config(function ($routeProvider, $locationProvider, $httpProvider) {
    	$httpProvider.defaults.headers.put['Content-Type'] =
            'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] =
            'application/x-www-form-urlencoded';
        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }; 
        $locationProvider.html5Mode(true);
    }).controller('zrController',function($scope,$http){
    	$scope.uniqueId = new Date().getTime();
    	$scope.helper={
    			sendMsg:""
    	}
    	$scope.content = '';
// $scope.helper.sendMsg
        $scope.websocketUrl = ResourceMap.g_addr_ws+'/messages';
        
        $scope.webSocket = new WebSocket($scope.websocketUrl);

       // var socket = new SockJS('/coordination');
        stompClient = Stomp.over($scope.webSocket);
        stompClient.connect('', '', function (frame) {
            console.log('Connected: ' + frame);
            
            stompClient.subscribe('/topic/messages', function (word) {
            	console.log(word.body);
            	var wordJ = JSON.parse(word.body);
            	console.log(wordJ);
            });
            
            
            stompClient.subscribe('/queue/messages/'+$scope.uniqueId, function (word) {
            	console.log(word.body);
            	var wordJ = JSON.parse(word.body);
            	console.log(wordJ);
            });
            
            //  initDocument 前有 @SubscribeMapping("/initDocument/{coordinationId}/{fileId}")
           // stompClient.subscribe('/app/initDocument/' + coordinationId+'/' + fileId, function (initData) {
        	   stompClient.subscribe('/app/users', function (initData) {
                console.log(initData);
            });
        	   
        	/*    stompClient.disconnect(function() {
           	    alert("See you next time!");
           	  }); */
        	   
        }, function () {
            connect();
        });
        
      //发送信息
      $scope.ws_sendMessage =  function() {
             //$scope.helper.sendMsg 中文 英语看看
        
            stompClient.send("/app/userChat", {}, JSON.stringify({
                'uname': encodeURIComponent($scope.helper.sendMsg),
                'age': 25,
                'id': new Date().getDay(),
                'ucreatetime':$scope.uniqueId,
                'uniqueId':$scope.uniqueId
            }));
        }
      
      
      $scope.ws_sendContent =  function() {
    	  console.log('$scope.uniqueId:'+$scope.uniqueId);
          //$scope.helper.sendMsg 中文 英语看看
         stompClient.send("/app/queue/messages/"+$scope.uniqueId, {}, JSON.stringify({
             'uname': encodeURIComponent($scope.content),
             'age': 26,
             'id': 2,
             'ucreatetime':new Date()
         }));
     }
      
      
      /*   $scope.empNo = 'zhxy';
        $scope.propertyId = $("#propertyId").val();
        $scope.messageId = "";

        $scope.ws_openConnection = function(){
            if (!window.WebSocket) {
                alert("FATAL: WebSocket not natively supported");
                return;
            };

            
            $scope.webSocket.onopen = function() {
            	console.log($scope.empNo );
            };
            $scope.webSocket.onmessage = function(e) {
                //有消息传入
                var data = e.data;
                console.log(data);
                $scope.processData(data);
            };
            $scope.webSocket.onclose = function() {
            	console.log("close");
                webSocket = null;
                setTimeout($scope.ws_openConnection,5000);
            };
        };

        $scope.ws_openConnection();

        $scope.processData = function(data){
            var obj = eval("("+data+")");
            if(obj){
                var type = obj.dataType;
                if(type == "telStart"){
                    $scope.$apply(function () {
                        $scope.$parent.hasTelFollow = true;
                    });
                }else if(type == "telFinish"){
                    $scope.$apply(function () {
                        $scope.$parent.telFinish = true;
                    });
                }

                $scope.messageId = obj.messageId;
                $scope.ws_sendMessage('{"dataType":"submit","messageId":"'+$scope.messageId+'"}');

            }
        }

        //发送消息
        $scope.ws_sendMessage = function(){
        	console.log($scope.helper.sendMsg);
            $scope.webSocket.send($scope.helper.sendMsg);
        }; */

    });
</script>
<!-- 直接写 /js/lib/sockjs-0.3.4.min.js 不对-->
<script type="text/javascript" src="/static/js/lib/sockjs-0.3.4.min.js"></script>
<script type="text/javascript" src="/static/js/lib/stomp.js"></script>

</html>