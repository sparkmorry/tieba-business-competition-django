var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	effect : 'fade',
	speed: 700,
	onlyExternal: true,

});	
$("#go").bind('click', function(){
	swiper.slideTo(1);
});
var greenFade;
$('.tb3').bind('click', function() {
	// 去除第一页动画
	$('#p1 .gear1, #p1 .gear2, #p1 .gear3, #p1 .cone1, #p1 .cone2, #p1 .cube1, #p1 .title').remove();
	$('.p2-black-triangle').hide()
	$('.p2-green-triangle').addClass('fadeIn');
	greenFade = setTimeout(function (argument) {
		swiper.slideTo(2);
		clearTimeout(greenFade);
	}, 1100);
});

$('body').bind('touchmove',function(event){
	event.preventDefault();
});

touch.on('#j-swipe-card', 'touchstart', function(ev){
	ev.preventDefault();
});
var target = document.getElementById("j-swipe-card");
var swipeTime = 0, prizeNo=0;
var jQmoney = $('#j-money');
var jQaverage = $('#average');
var jQp4 = $('#p4');

var shakeDuration = 10000;
// var shakeDuration = 1000;


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
	// 去除第二页动画
	$('.p2-3').remove();
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
			swiper.slideTo(3);
			//结束刷卡
			var swipeCb = function(){
				if(swipeTime>4 && swipeTime<8){
					zhongxinLevel = 2;
					$("#j-zhongxin-result").attr('src', '/static/css/anniversary/result/zhongxin/2.png');
				}else if(swipeTime>=8){
					zhongxinLevel=3;
					$("#j-zhongxin-result").attr('src', '/static/css/anniversary/result/zhongxin/3.png');
				};
			};
			var swipecardTimer = setTimeout(function(){
				swiper.slideTo(4)
				swipeCb();
			}, shakeDuration);
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
	if(shakeTimes>4 && shakeTimes<8){
		jindongLevel = 2;
		var src = '/static/css/anniversary/result/jingdong/2.png';
		$("#j-jd-result").attr('src', src);
	}else if(shakeTimes>=8){
		jindongLevel = 3;
		var src = '/static/css/anniversary/result/jingdong/3.png'
		$("#j-jd-result").attr('src', src);
	}
	swiper.slideTo(6);
}
var jingdongTimer;
$('#j-zhongxin-next').bind('click', function(){
	// 初始化摇一摇
	init();
	// 去除第三页动画
	$('#p3 .p2-dec2, #p3 .p2-dec1, #p3 .p2-dec3').remove();
	$('#p4 .p2-dec2, #p4 .p2-dec1, #p4 .p2-dec3').remove();
	swiper.slideTo(5);
	jingdongTimer = setTimeout(function(){
		zhongXinCB();
		clearTimeout(jingdongTimer);
	}, shakeDuration);
});
$('#j-jingdong-next').bind('click', function(){
	if(jindongLevel==3 && zhongxinLevel==3){
		$('#j-money-result').text('100%，作为一名土豪，又会省钱，你命中注定是有钱人，去测试一下颜值，看能否变成白富美(高富帅）。')
	}else{
		$('#j-money-result').text('50%，你是个屌丝，还不知道怎么省钱，彗星撞地球也挽救不了你的贫穷，看看能否用颜值改变自己的命运。')
	}
	swiper.slideTo(7);
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
	var faceTimer = setTimeout(function(){
		swiper.slideTo(11);
	}, 2500);
});
$('.j-go-beauty').bind('click', function(){
	swiper.slideTo(8);
});
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
	swiper.slideTo(9);
}

// 唱歌部分逻辑
var singTimer;
var singCD = 10;
var text;
var countdown = function(){
	if(singCD < 2){
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
}

$('.i-switch-off').bind('click', function(){
	$(this).removeClass('i-switch-off').addClass('i-switch-on');
	singTimer = setInterval(countdown, 1000);
});
$('#j-sing-next').bind('click', function(){
	swiper.slideTo(10)
});

// 叫喊部分逻辑

$("#j-face-next").bind('click', function(){
	swiper.slideTo(12);
});
$("#j-voice-next").bind('click', function(){
	swiper.slideNext();
});
$("#j-get-user-result").bind('click', function(){
	swiper.slideNext();
});
$("#j-user-next").bind('click', function(){
	swiper.slideNext();
});

var wave = 1, waveTimer=0, waveTimes=0, jQwave=$(".i-voice-wave");
$('#j-voice-microphone').bind('click', function(){
	waveTimer = setInterval(function(){
		wave++;
		waveTimes++;
		if(waveTimes >= 7){
			clearInterval(waveTimer);
			$("#raida").css({'-webkit-transform': 'rotate(200deg)'});
			setTimeout(function(){

				swiper.slideNext();
			}, 2000);
			return;
		}
		if(wave>3){
			wave=1;
		}
		jQwave.removeClass('i-voice-wave1').removeClass('i-voice-wave2').removeClass('i-voice-wave3').addClass('i-voice-wave'+wave)
	}, 500)
});

// 数据显示
$(".data-btn, .part-data-btn").bind('click', function(){
	var jQself = $(this);
	var jQm = jQself.closest('.m1');
	var jQdata = jQm.find('.data-img');
	jQdata.show();
});

var jQdatas = $(".data-img");
jQdatas.bind('click', function(){
	$(this).hide()
})