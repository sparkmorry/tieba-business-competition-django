var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	effect : 'fade',
	speed: 700,
	onlyExternal: true,

});	
$("#go").bind('click', function(){
	swiper.slideNext();
});
$('.tb3').bind('click', function() {
	$('.p2-black-triangle').hide()
	$('.p2-green-triangle').addClass('fadeIn');
	setTimeout(function (argument) {
		swiper.slideNext();
	}, 1100);
});

touch.on('#j-swipe-card', 'touchstart', function(ev){
	ev.preventDefault();
});
var target = document.getElementById("j-swipe-card");
var swipeTime = 0, prizeNo=0;
var jQmoney = $('#j-money');
var jQaverage = $('#average');
var jQp4 = $('#p4');

touch.on(target, 'swiperight', function(ev){
	var jQself = $(this);
	swipeTime++;
	prizeNo++;
	money = swipeTime * 3000;
	if(swipeTime == 2){
		money = 6500;
		jQaverage.show();
	}
	jQmoney.text(money);
	if(prizeNo > 10){
		prizeNo = 1;
	}
	jQp4.append('<i class="card i-prize'+prizeNo+' i-prize drop"></i>');
	jQself.css({'left': '80%'});
});
touch.on(target, 'swipeleft', function(ev){
	var jQself = $(this);
	swipeTime++;
	prizeNo++;
	money = swipeTime * 3000;
	if(swipeTime == 2){
		money = 6500;
		jQaverage.show();
	}
	jQmoney.text(money);
	if(prizeNo > 10){
		prizeNo = 1;
	}
	jQp4.append('<i class="card i-prize'+prizeNo+' i-prize drop"></i>');
	jQself.css({'left': '-5%'});
});

var currentCardNo, nextCardNo, prevCardNo;
var zhongxinLevel = 1, jindongLevel = 1, faceLevel = 1;
$('.j-banka').bind('click', function() {
	var jQself = $(this);
	var type = jQself.data("type");
	currentClass = 'i-arrow-'+ type;
	pressClass= 'i-arrow-'+type+'-pressed';
	jQself.addClass(pressClass).removeClass(currentClass);
	setTimeout(function(){
		jQself.removeClass(pressClass).addClass(currentClass);
		if(type == 'middle'){
			//进入刷卡
			if(currentCardNo != 2){
				var src = '/static/css/anniversary/card/'+currentCardNo+'.png';
			}else{
				var src = '/static/css/anniversary/icon/card1.png';
			}		
			$('#j-swipe-card').attr('src', src);
			swiper.slideNext();
			//结束刷卡
			var swipeCb = function(){
				if(swipeTime>4){
					zhongxinLevel = 2;
					$("#j-zhongxin-result").attr('src', '/static/css/anniversary/result/zhongxin/2.png');
				}else if(zhongxinLevel>8){
					zhongxinLevel=3;
					$("#j-zhongxin-result").attr('src', '/static/css/anniversary/result/zhongxin/3.png');
				};
			};
			var swipecardTimer = setTimeout(function(){
				swiper.slideNext();
				swipeCb();
			}, 10000);
		}
	},300);
	currentCardNo = $('.selected-card').data('no');
	nextCardNo = (currentCardNo == 3)? 1: currentCardNo+1;
	prevCardNo = (currentCardNo == 1)?3: currentCardNo-1;
	if(type == 'left'){
		$('.c-card'+currentCardNo).addClass('position1').removeClass('position3 selected-card');
		// 后一张卡左移
		$('.c-card'+nextCardNo).removeClass('position1 position3').addClass('selected-card');
		$('.c-card'+prevCardNo).removeClass('position1').addClass('position3');
	}else if(type=='right'){
		$('.c-card'+currentCardNo).addClass('position3').removeClass('position1 selected-card');
		// 前一张卡右移
		$('.c-card'+prevCardNo).removeClass('position1 position3').addClass('selected-card');
		$('.c-card'+nextCardNo).removeClass('position3').addClass('position1');
	}
});

var zhongXinCB = function(){
	if(shakeTimes>4){
		jindongLevel = 2;
		var src = '/static/css/anniversary/result/jingdong/2.png';
		$("#j-jd-result").attr('src', src);
	}else if(shakeTimes>=8){
		jindongLevel = 3;
		var src = '/static/css/anniversary/result/jingdong/3.png'
		$("#j-jd-result").attr('src', src);
	}
	swiper.slideNext();
}
$('.zhongxin-next').bind('click', function(){
	init();
	swiper.slideNext();
	var jingdongTimer = setTimeout(function(){
		zhongXinCB();
	}, 10000);
});
$('.jingdong-next').bind('click', function(){
	swiper.slideNext();
});

var jQcameraInput = $('#cameraInput');
var jQprevImg = $(".uploaded-img");
function readFile(){
    file = jQcameraInput.get(0).files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("请上传图片类型的文件~");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
    	jQprevImg.attr('src', this.result).show();
    }
}
jQcameraInput.bind('change', readFile);
$('.i-upload-take-btn').bind('click', function(){
	jQcameraInput.click();
});
$('.i-test-face').bind('click', function(){
	faceLevel = parseInt(Math.random()*3)+1;
	if(faceLevel == 1){
		var src = '/static/css/anniversary/result/face/1.png';
	}else if(faceLevel == 2){
		var src = '/static/css/anniversary/result/face/2.png';
	}else if(faceLevel == 3){
		var src = '/static/css/anniversary/result/face/3.png';
	}
	$("#j-face-result").attr('src', src);
	$('.i-blue-line').addClass('downup');
	setTimeout(function(){
		swiper.slideNext();
	}, 2000);
});
$('.j-go-beauty').bind('click', function(){
	swiper.slideNext();
});
var singCD = 30;
var text;
var jQcd = $('#j-sing-countdown');
var singLevel = 1;
var singCallBack = function(){
	singLevel = parseInt(Math.random()*3)+1;
	if(singLevel == 1){
		var src = '/static/css/anniversary/result/sing/1.png';
	}else if(singLevel == 2){
		var src = '/static/css/anniversary/result/sing/2.png';
	}else if(singLevel == 3){
		var src = '/static/css/anniversary/result/sing/3.png';
	}
	$("#j-sing-result").attr('src', src);
	swiper.slideNext();
}
$('.i-switch-off').bind('click', function(){
	$(this).removeClass('i-switch-off').addClass('i-switch-on');
	var singTimer = setInterval(function(){
		if(singCD <= 0){
			clearInterval(singTimer);
			singCallBack();
		}
		singCD--;
		if(singCD < 10){
			text = '0'+singCD;
			jQcd.text(text);
		}else{
			jQcd.text(singCD);
		}
	}, 1000)
});