var isIE6=!!window.ActiveXObject && !window.XMLHttpRequest;//判断是否ie6

/*****************
功能：阻止冒泡
参数：e -- event
******************/
function stopBubble(e){
    if (e && e.stopPropagation ){//not IE
		e.stopPropagation();
    }
    else{//IE
		window.event.cancelBubble = true;
    }
    
    if(window.ubtApi && window.ubtApi.loggerEvent){
    	window.ubtApi.loggerEvent(e);
    }
}

/***********************************
功能：文本框对象默认值的设置、清除
参数：obj -- 文本框对象
      val -- 默认值
	  cls -- 有默认值时的样式
************************************/
//设置
function clearTxtMsg(obj,val,cls){//文本框 onfocus 事件的清空默认值
	if(obj.val()==val){
		obj.val('');
		obj.removeClass(cls); 
	}
}

//清除
function showTxtMsg(obj,val,cls){//文本框 onblur 事件的设置默认值
	if(obj.val()==''){
		obj.val(val);
		obj.addClass(cls);
	}
}

/*******************************************************
功能：格式化金额--千位分隔
参数：num -- 金额数字，如200000.00，输出结果为200,000.00
********************************************************/
function decimalFormat(num){
	var digit = num.indexOf("."); // 取得小数点的位置 
	var int = num.substr(0,digit); // 取得小数中的整数部分 
	var i; 
	var mag = new Array(); 
	var word; 
	if(num.indexOf(".") == -1) { // 整数时 
		i = num.length; // 整数的个数 
		while(i > 0) { 
			word = num.substring(i,i-3); // 每隔3位截取一组数字 
			i-= 3; 
			mag.unshift(word); // 分别将截取的数字压入数组 
		} 
		return mag.toString(); 
	} 
	else{ // 小数时 
		i = int.length; // 除小数外，整数部分的个数 
		while(i > 0) { 
			word = int.substring(i,i-3); // 每隔3位截取一组数字 
			i-= 3; 
			mag.unshift(word); 
		} 
		return mag.toString() + num.substring(digit); 
	} 
} 

/*********************************************************************************************
功能：数字金额转换为大写金额
参数：from -- 数字金额存放的对象(input对象)
      to -- 大写金额存放的对象(input对象或文本结点对象)
	  notInput -- 大写金额存放对象是否为input对象，缺省时默认为input对象，有值则为普通文本节点
**********************************************************************************************/
var stmp = "";
function nst(from, to, notInput){
	var notInput = null || notInput;
	if(from.val()==stmp) to.val("");
	var ms = from.val().replace(/[^\d\.]/g,"").replace(/(\.\d{2}).+$/,"$1").replace(/^0+([1-9])/,"$1").replace(/^0+$/,"0");
	var txt = ms.split(".");
	while(/\d{4}(,|$)/.test(txt[0]))
		txt[0] = txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2");
	stmp = txt[0]+(txt.length>1?"."+txt[1]:"");
	if(notInput!=null) to.text(number2num1(ms-0));
	else to.val(number2num1(ms-0));
}

function number2num1(strg){
	var number = Math.round(strg*100)/100;
	number = number.toString(10).split('.');
	var a = number[0];
	if (a.length > 12)
		return "数值超出范围！支持的最大数值为 999999999999.99";
	var e = "零壹贰叁肆伍陆柒捌玖";
	var num1 = "";
	var len = a.length-1;
	for (var i=0 ; i<=len; i++)
		num1 += e.charAt(parseInt(a.charAt(i))) + [["元","万","亿"][Math.floor((len-i)/4)],"拾","佰","仟"][(len-i)%4];
	if(number.length==2 && number[1]!=""){
	    var a = number[1];
		for (var i=0 ; i<a.length; i++)
		    num1 += e.charAt(parseInt(a.charAt(i))) + ["角","分"][i]; 
	}
	num1 = num1.replace(/零佰|零拾|零仟|零角/g,"零");
	num1 = num1.replace(/零{2,}/g,"零");
	num1 = num1.replace(/零(?=元|万|亿)/g,"");
	num1 = num1.replace(/亿万/,"亿");
	num1 = num1.replace(/^元零?/,"");
	if(num1!="" && !/分$/.test(num1))
		num1 += "整";
	return num1;
}

/**********************************************
功能：全选|不选
参数：chkObj -- checkbox选项组对象
      isChk -- 全选或不选，true全选，false不选
	  chkAllObj -- 全选|不选开关对象(checkbox)
***********************************************/
function chkAll(chkObj, isChk, chkAllObj){
	if(isChk){//true-全选
		chkObj.each(function(i,o){
			$(o).attr("checked", true);
		});
		if(chkAllObj) chkAllObj.attr("checked", true);
	}
	else{//false-不选
		chkObj.each(function(i,o){
			$(o).attr("checked", false);
		});
		if(chkAllObj) chkAllObj.attr("checked", false);
	}
}

/*****************************************************************************************
功能：切换显示|隐藏指定对象(根据display属性来判断，并改变开关对象的样式)
参数：arrHandle -- 开关对象(一个或一组)
      arrContent -- 与开关对象相对应的需要显示或隐藏的内容
	  handleParent -- 开关对象的父对象
	  handleActiveCls -- 开关激活时的样式
	  handleParentCls -- 开关激活时其父对象的样式
	  arrTxt -- 开关激活时其文本(缺省时开关文本不变，当开关不是文本(图片等)时需要缺省该值)
******************************************************************************************/
function toggleMoreInfo(arrHandle, arrContent, arrHandleParent, handleActiveCls, handleParentCls, arrTxt){
	arrHandle.each(function(i,o){
		$(o).bind("click", function(){
			if($(arrContent[i]).css("display")=="none"){//show
				if(arrTxt==null) $(this).addClass(handleActiveCls);//change style of handle 
				else $(this).text(arrTxt[0]);
				if(handleParentCls!=null) $(arrHandleParent[i]).addClass(handleParentCls);//change style of handle's parent tr 
				$(arrContent[i]).show();//show detail
			}
			else{//hide
				if(arrTxt==null) $(this).removeClass(handleActiveCls);//revert style of handle 
				else $(this).text(arrTxt[1]);
				if(handleParentCls!=null) $(arrHandleParent[i]).removeClass(handleParentCls);//revert style of handle's parent tr 
				$(arrContent[i]).hide();//hide detail
			}
			return false;
		});
	});
}

/*********************************************************************
功能：切换显示|隐藏指定对象(根据标签属性值来判断)
参数：handle -- 开关对象
	  obj -- 与开关对象相对应的需要显示或隐藏的内容
	  flag -- 开关对象的开关属性，值=1表示状态为显示，=0表示状态为隐藏
**********************************************************************/
function showHideHandle(handle, obj, flag){
	if(handle.attr(flag)=="0"){
		obj.show();
		handle.attr(flag, "1");
	}
	else{
		obj.hide();
		handle.attr(flag, "0");
	}
}

/**********************************************
功能：隐藏一组(个)对象，显示另一组(个)对象
参数：arrHide -- 需要隐藏的对象，没有时需传null
      arrShow -- 需要显示的对象，可以直接缺省
***********************************************/
function showHideSwitch(arrHide, arrShow){
	if(arrHide) arrHide.each(function(i,o){
		$(o).hide();
	});
	if(arrShow) arrShow.each(function(i,o){
		$(o).show();
	});
}

/****************************************
功能：鼠标悬停样式效果
参数：arrHandle -- 鼠标悬停的对象
      handleActiveCls -- 鼠标悬停时的样式
*****************************************/
function hoverCss(arrHandle, handleActiveCls){
	arrHandle.each(function(i,o){
		$(o).bind("mouseover", function(){//onmouseover - change style of handle
			$(this).addClass(handleActiveCls);
		});
		$(o).bind("mouseout", function(){//onmouseout - revert style of handle 
			$(this).removeClass(handleActiveCls);
		});
	});
}

/*******************************
功能：显示带遮罩的弹层(绝对定位)
参数：layer -- 弹层对象
********************************/
function showPopupDiv(layer, isSetSelect){
	if(isSetSelect && isIE6){
		var layer_id = layer.attr("id");
		$("select").not($("#"+layer_id+" select")).css("visibility", "hidden");
	}
	showMask();
	setPopupDivPos(layer);
	layer.show();
}

function setPopupDivPos(layer, reset){
	//reset：用于窗口resize等事件时的特殊处理标志
	var reset = reset || null;
	var layerH = layer.height();
	var windowH = $(window).height();
	var layerW = layer.width();
	var windowW = $(window).width();
	var l = layerW>=windowW ? $(document).scrollLeft(): $(document).scrollLeft() + (windowW - layerW)/2 + "px";
	
	//如果层高度大于窗口高度，层上边缘与窗口顶部对齐显示，如果层高度小于等于窗口高度，则层在窗口中垂直居中显示
	var t = layerH>=windowH ? $(document).scrollTop(): $(document).scrollTop() + (windowH - layerH)/2 + "px";
	
	if(reset!=null){//如果有reset标志，则只调整水平位置，不调整垂直位置，否则水平垂直位置都要调整
		layer.css({left:l});
	}
	else{
		layer.css({top:t, left:l});
	}
}

function hidePopupDiv(layer, isSetSelect){
	layer.hide();
	$("#mask").remove();
	$("#ifrm").remove();
	if(isSetSelect && isIE6){
		var layer_id = layer.attr("id");
		$("select").not($("#"+layer_id+" select")).css("visibility", "visible");
	}
}

//show mask (above the select element)
function showMask(){
    $("#mask").remove(); //if mask div exist, remove it
	$("#ifrm").remove(); //if mask iframe exist, remove it
    $("body").append("<div id='mask'></div>"); //create div mask
	$("body").append("<iframe id='ifrm'></iframe>"); //create iframe mask
	setMaskSize();
}

function setMaskSize(){
	//页面内容高度小于窗口高度的时候，以窗口高度为准
	var offset = 90; 
	var w = $(window).width() > $(document.body)[0].offsetWidth ? $(window).width() : $(document.body)[0].offsetWidth;
	var h = $(window).height() > $(document.body)[0].offsetHeight+offset ? $(window).height() : $(document.body)[0].offsetHeight+offset;
	$("#mask").css({"width": w, "height": h}); //set width and height of div mask
	$("#ifrm").css({"width": w, "height": h}); //set width and height of iframe mask
}

/***************************************************************************
功能：显示一个层(相对定位)
参数：offsetObj -- 参照对象
      layer -- 要显示的层对象
	  pos -- 显示的位置，left与参照对象底部左对齐，right与参照对象底部右对齐
	  //注意：o.position不可改为o.offset，在特殊情境下会引起位置偏移（如弹层中）
****************************************************************************/
function fnShowLayer(offsetObj, layer, pos){
	var o = offsetObj;
	switch (pos){
		case 'left':layer.css({"left":o.position().left + o.outerWidth() - layer.outerWidth(), "top":o.position().top + o.outerHeight()}); layer.find(".tipsArrow").eq(0).css("background-position","right top"); break;
		case 'right':layer.css({"left":o.position().left, "top":o.position().top + o.outerHeight()}); layer.find(".tipsArrow").eq(0).css("background-position","left top"); break;
	}
	layer.show();
}


/***************************************************************************
功能：显示微弹层(相对定位)-点击参照物显示，点击body关闭
参数：offsetObj -- 参照对象
      vPopupID -- 要显示的微弹层对象ID
	  isAbsolute -- 可缺省。参照物是否绝对定位(position:absolute||position:fixed)
****************************************************************************/
function setVPopupPos(offsetObj, vPopupID, isAbsolute){
	var isAbsolute = isAbsolute || null;
	var pos = isAbsolute==null ? offsetObj.offset() : offsetObj.position();

	//关闭其他微弹层
	hideVPopupAll();
	
	var tA = pos.top + offsetObj.outerHeight();//箭头top

	//弹层位置（默认与触发器水平居中对齐，如遇边界调整）
	var lP = pos.left + offsetObj.outerWidth()/2 - vPopupID.outerWidth()/2;
	if(lP <= 10) lP = 10; //小于左边界
	if(lP+vPopupID.outerWidth() > ($(window).width()-10)){//大于右边界
		lP = $(window).width() - vPopupID.outerWidth() - 10;
	}
	var tP = tA + 16;
	vPopupID.css({"left":lP, "top":tP});
	vPopupID.show();

	//透明边框位置（括在弹层四周）
	var lW = lP - 5;
	var tW = tP - 5;
	vPopupID.next("div.vPopupBD").css({"width":vPopupID.outerWidth()+10, "height":vPopupID.outerHeight()+10, "left":lW, "top":tW});
	vPopupID.next("div.vPopupBD").show();
	
	//箭头位置（与触发器水平居中对齐）
	var lA = vPopupID.next("div.vPopupBD").css("left");//箭头left
	vPopupID.prev("div.vPopupArrow").css({"left":lA, "top":tA, "width":vPopupID.next("div.vPopupBD").width()});
	vPopupID.prev("div.vPopupArrow").show();
}

function hideVPopup(vPopupID){//隐藏微弹层（包括箭头、弹层、透明边框）
	$(vPopupID).prev("div.vPopupArrow").hide();
	$(vPopupID).next("div.vPopupBD").hide();
	$(vPopupID).hide();
}

function hideVPopupAll(){//关闭所有微弹层
	$("div.vPopup").each(function(){
		var pop = $(this).attr("id");
		hideVPopup("#"+pop);
	});
}

/*******************************************
功能：获取鼠标的当前坐标位置，返回其x,y坐标
********************************************/
function mousePos(evt){
	var evt= evt || window.event; 
	if(evt.pageX || evt.pageY){ 
		x = evt.pageX;
		y = evt.pageY;
	}
	else{
		x = evt.clientX + document.body.scrollLeft - document.body.clientLeft;
		y = evt.clientY + document.body.scrollTop - document.body.clientTop;
	}
	return {x:x,y:y};
}


/***********************************************
功能：解决IE6下不带遮罩的弹层无法遮住select问题
参数：popupLayerObj：弹层对象
************************************************/
function showIE6Mask(popupLayerObj){//在弹层下面增加iframe遮罩(IE6)
	//var t = popupLayerObj.position().top;
	//var l = popupLayerObj.position().left;
	var t = popupLayerObj.offset().top;
	var l = popupLayerObj.offset().left;
	var w = popupLayerObj.outerWidth();
	var h = popupLayerObj.outerHeight();
	if(isIE6 && $(".iframe4ie6").length==0){
		$("body").append('<iframe class="iframe4ie6" style="width:'+w+'px; height:'+h+'px"></iframe>');
    }
	$(".iframe4ie6").css({"top":t, "left":l}).show();
}

function removeIE6Mask(){//移除弹层下的iframe遮罩(IE6)
	if(!isIE6) return false;
    $(".iframe4ie6").remove();
    $("select").css({"visibility":"visible"});
}


/*****************************************************************************************
功能：浏览器打印页面设置
参数：pageSpace -- 页面设置的上|下|左|右边距，如{left:0.4, right:0.4, top:0.4, bottom:0.4}
                   缺省则为浏览器已有设置
******************************************************************************************/
function setBrowserPrintSet(pageSpace){
	var hkey_root,hkey_path,hkey_key; 
		hkey_root="HKEY_CURRENT_USER" ;
		hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\" ;
	try{ 
		//去掉页眉页脚
		var RegWsh = new ActiveXObject("WScript.Shell");
		hkey_key="header" ;
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key,"");
		hkey_key="footer" ;
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key,"");
		hkey_path2 = "\\Software\\Microsoft\\Internet Explorer\\Main\\";
		hkey_key="Print_Background";
		RegWsh.RegWrite(hkey_root + hkey_path2 + hkey_key,"no");

		//设置页边距
		if(pageSpace.bottom!=null){
			hkey_key="margin_bottom";
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,pageSpace.bottom); 
		}
		if(pageSpace.left!=null){
			hkey_key="margin_left";
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,pageSpace.left);
		}
		if(pageSpace.right!=null){
			hkey_key="margin_right";
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,pageSpace.right);
		}
		if(pageSpace.top!=null){
			hkey_key="margin_top";
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,pageSpace.top);
		}
	}catch(e){} 
}

/******************************************************************
功能：textarea对象的maxLength效果，当输入超长时提示
参数：inputObj -- 文本框对象
      msg -- 提示文本信息，通常为该文本对象对应的字段名称，如：备注
	  maxLength -- 最大输入字符数
********************************************************************/
function maxInput(inputObj, msg, maxLength){
	if(inputObj.val().length > maxLength){
		alert(msg + '限输入' + maxLength + '字符');
		inputObj.focus();
		return false;
	}
}

/******************************************************************************
功能：格式化日期
参数：date -- 日期对象(日期型)
      local -- 缺省或null时返回格式为2011-03-22，有值时返回格式为2011年03月22日
-_-!! 才发现怎么起这么个名字，和Date对象的.getDate()方法重名了，好在语法不同
*******************************************************************************/
function getDate(date,local){
	var y = date.getFullYear();
	var m = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	var d = date.getDate()<10 ? "0"+(date.getDate()) : date.getDate();
	if(local==null) return y+"-"+m+"-"+d; //2011-03-22
	else return y+"年"+m+"月"+d+"日";     //2011年03月22日
}

/******************************************************
功能：验证开始日期不能大于结束日期，日期格式2011-01-02
参数：
*******************************************************/
function chkDate(dateFrom, dateTo){
	if(dateFrom.val()=="" || dateTo.val()==""){
		return true;
	}
	else{
		if(dateFrom.val()>dateTo.val()){
			alert("开始日期不能大于结束日期");
			return false;
		}
	}
	return true;
}

/*******************************
功能：ID加密
********************************/
function generalEncodeID(id){
	id = id + "";
	var encodeID = "";
	var size = id.length;
	for(var i = 0; i < size; i ++){
		encodeID += Math.floor(Math.random()*10) + "" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
		encodeID += "" + id.substring(0, 1);
		id = id.substring(1);
	}
	encodeID += Math.floor(Math.random()*10) + "" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
	encodeID = "1" + encodeID;
	return encodeID;
}

/******************************************************
功能：根据给定日期生成一个随机数(时,分,秒,毫秒串连起来)
参数：t -- 日期对象
*******************************************************/
function getRandomByTime(t){
	return t.getHours().toString()+t.getMinutes()+t.getSeconds()+t.getMilliseconds();
}

/***************************************************
功能：图片等比缩放
调用：imgObj.bind("load", {w:150}, scaleZoom);//定宽
      imgObj.bind("load", {h:150}, scaleZoom);//定高
****************************************************/
function scaleZoom(event){
	if(event.data.w != undefined && $(this).attr("width")>event.data.w){//定宽
		var scale = event.data.w / $(this).attr("width");
		$(this).css({"width":event.data.w, "height":$(this).attr("height")*scale});
	}
	else if(event.data.h != undefined && $(this).attr("height")>event.data.h){//定高
		var scale = event.data.h / $(this).attr("height");
		$(this).css({"height":event.data.h, "width":$(this).attr("width")*scale});
	}
}

/***********************************************************
功能：在隐藏域里记录一串文本，以","分隔，对其进行添加或删除
参数：str -- 要添加或删除的文本
      input_h -- 用以存放文本串的input对象
	  type -- 操作类型，1为添加，0为删除
************************************************************/
function strArrOp(str, input_h, type){
	var isDeleted = false;
	var str = $.trim(str.toString());
	if(type==null || type!=0) type = 1;
	var arrStr = $.trim(input_h.val())=="" ? new Array() : $.trim(input_h.val()).split(",");
	switch (type){
		case 1: arrStr.push(str);
				break;
		case 0: $.each(arrStr, function(i,n){
					if(str == n){
						arrStr.splice(i,1);
						isDeleted = true;
						return false;
					}
				});
				break;
	}
	input_h.val(arrStr.toString());
	if(type == 0) return isDeleted;//删除时：返回数组中是否存在该值并且被删除
}

/********************************************
功能：根据给定的URL获取文件类型(通过后缀判断)
*********************************************/
function getFileType(url){
	var type = url.toLowerCase().match(/\.(\w+)$/)[1];
	switch (type){
		case "jpg":
		case "gif":
		case "png":
		case "bmp": return "image";
		case "doc":
		case "docx": return "doc";
		case "xls":
		case "xlsx": return "xls";
		case "txt": return "txt";
		case "pdf": return "pdf";
		default:return false;
	}
}

/*********************************
功能：判断某个元素是否在数组中出现
参数：array -- 数组
      elemnt -- 要进行比较的元素
*****************************/
function isInArray(array, element){
	var flag = false;
	$.each(array, function(i,n){
		if(element == n){
			flag = true;
		}
	});
	return flag;
}


/***************************************************************
功能：checkbox勾中|勾掉时其后面的文字样式调整
参数：chkbox - checkbox对象
	  labelStyle - checkbox勾中时的样式
html示例：<label><input type="checkbox" />text node here</label>
*****************************************************************/
function chkboxClickStyleSet(chkbox, labelStyle){
	chkbox.live("click", function(){
		chkboxTextStyleSet($(this), labelStyle);
	});
}

function chkboxTextStyleSet(chkbox, labelStyle){
	if(chkbox.attr("checked") == true){
		chkbox.parent("label").addClass(labelStyle);
	}
	else{
		chkbox.parent("label").removeClass(labelStyle);
	}
}

/********************************************************************************************************
功能：带箭头的tips效果，遇左、右、下边界自适应
参数：host  -- 宿主（即鼠标移上去显示tips效果的对象）
      tipsWidth -- 用户自定义tips的宽度
				  （默认缺省，表示自适应宽度）
*********************************************************************************************************/
function showTips(host, tipsWidth, special){//显示
	var tips = host.attr("tips");
	var tipsWidth = tipsWidth || null;
	var special = special || null;
	var id = getRandomByTime(new Date());
	host.attr("id", id);
	if(special == "checkImg"){
		setTipsHtml_checkImg(id, tips);
	}
	else{
		setTipsText(id, tips);
	}
	if(tipsWidth != null){//用户自定义宽度
		$("#tips"+id).css("width", tipsWidth + "px");
	}

	var pos = getPos(host);
	if(pos.d == "above"){
		$("#tips"+id).find(".tpArrow").removeClass("up").addClass("down").insertAfter($("#tips"+id).find(".tpTxt"));
	}
	$("#tips"+id).css({"top":pos.t, "left":pos.l});
	$("#tips"+id).find(".tpArrow").css({"margin-left":pos.m});
	$("#tips"+id).show();
}

function setTipsText(id, tips){
	$("body").append('<div class="p_tips" id="tips'+id+'"><div class="tpArrow up"></div><div class="tpTxt">'+tips+'</div></div>');
}

function getPos(host){//位置
	//默认底部显示，居中对齐，遇边界特殊处理
	var id = host.attr("id");
	var t = host.offset().top - $("#tips"+id).outerHeight() - 2;//host.offset().top + host.outerHeight() + 2;
	var l = host.offset().left + host.outerWidth()/2 - $("#tips"+id).outerWidth()/2;
	var m = ($("#tips"+id).outerWidth() - $(".tpArrow").css("width").replace("px", "")) / 2;
	var d = "above";

	if(l < 0){//左边界
		l = 0;
		if(m > host.outerWidth()/2){
			m = host.offset().left + (host.outerWidth() - $(".tpArrow").css("width").replace("px", ""))/2;
		}
	}
	else if(l > ($("body").width() - $("#tips"+id).outerWidth())){//右边界
		l = $("body").width() - $("#tips"+id).outerWidth();
		if(m > host.outerWidth()/2){
			m =  host.offset().left + (host.outerWidth() - $(".tpArrow").css("width").replace("px", ""))/2 - ($("body").width() - $("#tips"+id).outerWidth());
		}
	}
	
	//上边界(且下边有足够的空间时)
	//if((host.offset().top - $("#tips"+id).outerHeight() - 2)>$(window).scrollTop() && (t+$("#tips"+id).outerHeight()) > ($(window).height() + $(window).scrollTop())){
	if((host.offset().top - $("#tips"+id).outerHeight() + 2) < $(window).scrollTop()){
		d = "under";
		t = host.offset().top + host.outerHeight() + 2;//host.offset().top - $("#tips"+id).outerHeight() - 2;
	}
	return {"t":t, "l":l, "m":m, "d":d}
}

function hideTips(host){//隐藏
	var id = host.attr("id")
	$("#tips"+id).remove();
}


function showTipsH(obj, direction, tipsWidth){//水平方向上显示的tips
	//参数：direction：空或"left"，在参照系左侧显示；"right"在参照系右侧显示
	var tips = obj.attr("tips");
	var t = obj.offset().top;
	var id = getRandomByTime(new Date());
	obj.attr("id", id);

	if(direction == "left" || direction == null){
		var strHtml = '<div class="p_tips in_block clearfix t150" id="tips'+id+'"><div class="right tpArrow rightA"></div><div class="right tpTxt" style="width:111px">'+tips+'</div></div>';
		$("body").append(strHtml);
		if(tipsWidth != null && !isNaN(tipsWidth)){
			$("#tips"+id).css({"width": tipsWidth + "px"});
		}
		var l = obj.offset().left - $("#tips"+id).outerWidth() - 5;
	}
	else{
		var strHtml = '<div class="p_tips in_block clearfix t150" id="tips'+id+'"><div class="left tpArrow leftA"></div><div class="left tpTxt" style="width:111px">'+tips+'</div></div>';
		$("body").append(strHtml);
		if(tipsWidth != null && !isNaN(tipsWidth)){
			$("#tips"+id).css({"width": tipsWidth + "px"});
		}
		var l = obj.offset().left + obj.outerWidth() + 5;
	}
	
	$("#tips"+id).css({"top":t, "left":l}).show();
}

function hideTipsH(obj){
	var id = obj.attr("id");
	$("#tips"+id).remove();
}


/***************************************************************
功能：审批弹层中的textarea验证
参数：obj - textarea对象
	  text - textarea的title
*****************************************************************/
function chkForm_popupTextArea(obj, text){//textarea 验证（审批弹层）
	var obj = $("#"+obj);
	if($.trim(obj.val())==""){
		alert("请填写"+text);
		obj.focus();
		return false;
	}
	if(obj.val().length>500){
		alert(text+"最多只能填写500个字符");
		obj.focus();
		return false;
	}
	return true
}



//表单转化为json字符串
function formToJson(container, options){		//表单转化为json字符串
	var keyValuePairs = [], options = $.extend({
		jsonkeyToSelector: function(key){
			return '.js_'+key;
		}
	}, options || {});

	if( options.keys ){		//根据selector获取控件对象
		for(var i=0, len=options.keys.length; i<len; i++){
			$element = container.find(options.jsonkeyToSelector(options.keys[i]));
			keyValuePairs.push( options.keys[i] +': '+getValue($element) );
		}
	}else{				//根据name获取控件对象
		var names = [];
		container.find(':text, :radio, :checkbox, select, textarea, input[type=hidden]').each(function(){
			var name = $.trim($(this).attr('name'));
			if(name != '' && $.inArray(name,names) === -1){
				names.push($.trim($(this).attr('name')));
			}
		});
		$.each(names, function(i, name){
			keyValuePairs.push( name +': '+ getValue(container.find('[name='+name+']')) );
		});

	}

	return '{'+keyValuePairs.join(',')+'}';

	//获取控件值
	function getValue($element){
		if( $element.is(':text') || $element.is('textarea') || $element.is('input[type=hidden]') || $element.is('select')){
			return "'"+filterSepecialChar($element.val())+"'";
		}
		if( $element.is(':radio') ){
			return "'"+filterSepecialChar($element.filter(':checked').val())+"'";
		}
		if( $element.is(':checkbox') ){
			var result = [], checkedCtrl = $element.filter(':checked');
			for(var i=0,len=checkedCtrl.length; i<len; i++){
				result.push( filterSepecialChar(checkedCtrl.eq(i).val()) );
			}
			return "'"+result.join(',')+"'";
		}
	}
	
	function filterSepecialChar(val){
		if(!val || $.trim(val) === '') return '';
		return val.replace(/[\\\b\t\n\f\r]+/g, ' ').replace(/\"+/g, '“').replace(/\'+/g, '‘');
	}
}


/******************************************************************
功能：模拟window.location(为了解决性能监控抓不到后台执行时间的问题， 
      在IE下通过window.location重定向页面会丢失referrer，故模拟之)
参数：url:重定向到的url
*******************************************************************/
function redirect(url){
	var isIe = (document.all) ? true : false;
	if(isIe) {
		var link = document.createElement('a');
		link.href = url;
		document.body.appendChild(link);
		link.click();
	}else {
		window.location = url;
	}
}

/*异步加载js
 * url: 加载的js路径
 * callback： js完全加载后，执行的回调函数， 通常该回调函数的代码依赖于url对应的js文件
 * optins： 指定加载的script标记的插入位置，指定containerId则插入containerId容器的最后面，否则默认插入<head>的尾部
 */
function asyncLoadScript(url, callback, options){ 
	options = options || {};
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.onload = function(){ 
		if(callback){
			callback();
		}
	} 
	script.src = url;
	
	var wrapper = options.containerId ? document.getElementById(options.containerId) : document.getElementsByTagName("head")[0];
	if(wrapper){
		wrapper.appendChild(script);
	}
}


/*时间格式化工具
 * date: 要格式化的时间（可以为日期、字符串、时间戳三种类型）
 * fmt: 要格式化的格式
 */
function dateFormat(date, fmt){
    if(!(date instanceof Date)){
        var date = new Date(date);
    }
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


/*********** onload event ****************/

var pos;
$(function(){
	var popLayer = $('div.popLayer');
	if(popLayer.length!=0){
		$(window).bind("resize", function(){//窗口resize时绝对定位的层位置重置
			setMaskSize();//遮罩大小重置
			setPopupDivPos(popLayer.not(':hidden'), 1);//弹出层位置重置(水平居中，垂直不变)
		});
	}

	//固定的审核层从底部升起(并添加iframe以解决在IE6下select控件浮在审核层之上的问题)
	if($("#fixedBar").length!=0){
		var timer = window.setTimeout('$("#fixedBar").slideDown(400)', 1500);//固定的审核层从底部升起
	}

	//日期选择框样式初始化(有值时无背景图)
	var tDate = $("input:text.tDate, input:text.txtDate");
	if(tDate.length!=0){
		tDate.each(function(){
			if($.trim($(this).val())!="") $(this).addClass("bg_none");
		})
	}

	//冻结表头
	if($("#fixedHead").length!=0){
		$(window).scroll(function(){
			var pos = $("#fixedHead").position().top;
			var fixedCondition = isIE6 ? $(document).scrollTop() >= pos : $(document).scrollTop()+55 >= pos
			if(fixedCondition){
				if($("#fixedHeadClone").length==0){
					var newObj = $("#fixedHead").clone();
					newObj.attr("id", "fixedHeadClone").insertAfter($("#fixedHead"));
					$("#fixedHeadClone").addClass("fixedHead");
					$('<iframe class="fixedMask"></iframe>').insertAfter($("#fixedHeadClone"));
					$("#fixedHeadClone").css({width:$("#fixedHead").width(), left:$("#fixedHead").position().left});
					$(".fixedMask").css({width:$("#fixedHead").outerWidth(), height:$("#fixedHead").outerHeight(), left:$("#fixedHead").position().left});
					if(!isIE6){
						$("#fixedHeadClone, .fixedMask").css({top:"44px"});
					}
				}
			}
			else{
				$("#fixedHeadClone, .fixedMask").remove();
			}
		})
	}

	//页面右下角添加反馈入口浮层
	/*
	$("body").append('<div class="fixedLeft clearfix"><a href="http://bangzhu.dooioo.com/complainsuggest/add" class="gotoHelp left" target="_blank">我要咨询</a><a href="#" class="gotoTop right" title="回到顶部"></a></div>');
	if($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {//IE6计算并重置位置
		var fixed_gotoHelp = $("div.fixedLeft");
		$(window).scroll(function() {
			var t = ($(window).height() - fixed_gotoHelp.outerHeight()) + $(window).scrollTop() +1;
			if(($("body").height()-fixed_gotoHelp.outerHeight()) < t){//到底部了
				t = ($("body").height() - fixed_gotoHelp.outerHeight()+55);
			}
			fixed_gotoHelp.css({"top":t+"px"});
		});
		$(window).resize(function() {
			var t = ($(window).height() - fixed_gotoHelp.outerHeight()) + $(window).scrollTop() +1;
			fixed_gotoHelp.css({"top":t+"px"});
		})
	}*/
	$(function($, headerParameters){
		var PROCESS_REQUEST_SERVER = 'http://bangzhu.dooioo.com',
			style = '<style type="text/css">\
						.suggestWrapper {position:fixed; _position:absolute; right:0; bottom:0; width:30px; height:105px;}\
						.suggestWrapper .suggest_common {line-height:16px; background:#7f7f7f; -webkit-border-radius:5px 0 0 5px; border-radius:5px 0 0 5px;}\
						.suggestWrapper .toTop {width: 30px; height:30px;}\
						.suggestWrapper .toTop .icon {background: url(http://dui.dooioo.com/public/images/icon_advice_new.png) no-repeat 7px -20px; width:30px; height:30px;}\
						.suggestWrapper .suggest {width:30px; height:70px; padding-left:0}\
						.suggestWrapper .suggest .icon {background: url(http://dui.dooioo.com/public/images/icon_advice_new.png) no-repeat left top; padding-left:18px; padding-top:15px;}\
						.suggestWrapper .suggest a, .suggestWrappe1r .suggest a:hover {text-decoration:none; font-size:15px;}\
					</style>',
			html = '<div class="suggestWrapper center js_globleSuggestWrapper" id="suggestContainer">\
						<div class="suggest_common toTop f26 js_suggest_common">\
							<a href="javascript:;" class="icon in_block mt_10 js_toTop"></a>\
						</div>\
						<div class="suggest_common suggest mt_5 pt_10 js_suggest_common">\
							<a href="javascript:;" class="white bold js_suggest"><span class="in_block icon mb_5"></span>反<br/>馈</a>\
						</div>\
					</div>',
			popupLayerHtml = '<div class="bubbleWraper js_global_suggest_postFeedback">\
								<div class="bubbleBox">\
									<div class="bubbleBoxTitle clearfix">\
										<h1>反馈</h1>\
										<div class="cls"><a href="javascript:;" class="closePopBox xx js_closePopBox"></a></div>\
									</div>\
									<div class="bubbleBoxCon mt_20">\
										<div class="center js_suggestContent" style="min-height:80px;">\
											<textarea class="tA js_suggestTextarea in_block" placeholder="留下你宝贵的问题或建议，我们会及时予以答复"></textarea>\
										</div>\
									</div>\
									<div class="bubbleBoxBtn">\
										<a href="javascript:;" class="closePopBox btnOpH24 h24Silver in_block js_closePopBox">关闭</a>\
										<a href="javascript:;" class="closePopBox btnOpH24 h24Blue in_block js_submitSuggest mr_10">提交</a>\
									</div>\
								</div>\
							</div>';
		
		
		
		$('head').append(style);
		$('body').append(html);
		
		//提建议，并记录点击量
		$('#suggestContainer').find('.js_suggest').live('click', function(){
			$('body').append(popupLayerHtml);
			showPopupDiv($('div.js_global_suggest_postFeedback'));
			
			$.getJSON(PROCESS_REQUEST_SERVER+'/clickLog/recordClickWithCallBack?jsonCallBack=?', {
				empId: headerParameters.empNo,
				fromUrl: window.location.href}, function(data) {});
		});
		
		
		$('#suggestContainer').find('.js_suggest_common').hover(function(){
				$(this).css('background', '#666');
			},
			function(){
				$(this).css('background', '#7f7f7f');
			}
		)
		
		$('#suggestContainer').find('.js_toTop').click(function(){
			$('html, body').animate({scrollTop: '0px' }, 500);
		});
		
		
		//点击关闭
		$('div.js_global_suggest_postFeedback').find('.js_closePopBox').live('click', function(){
			var popuLayer = $('div.js_global_suggest_postFeedback');
			hidePopupDiv(popuLayer);
			popuLayer.remove();
		});
		
		//提交建议
		$('div.js_global_suggest_postFeedback').find('.js_submitSuggest').live('click', function(){
			var inputVal = $.trim($('div.js_global_suggest_postFeedback').find('.js_suggestTextarea').val());
			if( checkInput(inputVal) ){
				$.getJSON(PROCESS_REQUEST_SERVER+'/complainsuggest/ajaxAddedWithCallback?jsonCallback=?', {
						title: inputVal.substr(0,15) + (inputVal.length>15 ? '...' : ''),
						content: inputVal,
						createEmpNo: headerParameters.empNo,
						catestate: '0'
					}, processResponse);
			}
		});
		
		//检查输入
		function checkInput(inputVal){
			if(inputVal === ''){
				alert('请填写建议与咨询');
				return false;
			}
			
			return true;
		}
		
		//确认响应
		function processResponse(data){
			if(data.status == "ok") {
				$('div.js_global_suggest_postFeedback').find('.js_suggestContent').html('反馈已成功提交。 <a href="'+ PROCESS_REQUEST_SERVER + data.backUrl +'" target="_blank">点击查看</a>');
				$('div.js_global_suggest_postFeedback').find('.js_submitSuggest').remove();
			} else {
				alert("提交失败:" + data.message);
			}
		}
		
	}(jQuery, window.headerParameters || {empNo: '80001'}));


	//带箭头的tips效果绑定
	//出现在下方（位置不足时出现在上方），边界自适应js_addTipsV
	$('.js_addTipsV').live("mouseover",function(){
		showTips($(this));
	}).live("mouseout",function(){
		hideTips($(this));
	});

	//水平位置，出现在左侧
	$('.js_addTipsL').live("mouseover",function(){
		showTipsH($(this), 'left');
	}).live("mouseout",function(){
		hideTipsH($(this));
	});

	//水平位置，出现在右侧
	$('.js_addTipsR').live("mouseover",function(){
		showTipsH($(this), 'right');
	}).live("mouseout",function(){
		hideTipsH($(this));
	});
});