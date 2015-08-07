var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	effect : 'fade',
	speed: 700,
	onlyExternal: true,

});	
$("#go").bind('click', function(){
	swiper.slideTo(1);
});

// 不同人生主题
var greenFade;
$('.triangle-btn').bind('click', function() {
	// 去除第一页动画
	$('#p1 .gear1, #p1 .gear2, #p1 .gear3, #p1 .cone1, #p1 .cone2, #p1 .cube1, #p1 .title').remove();
	var jQself = $(this);
	var type = jQself.data('type');
	$('.p2-black-triangle').hide()
	$('.p2-green-triangle').addClass('fadeIn');
	greenFade = setTimeout(function (argument) {
		if(type == 'money'){
			swiper.slideTo(2);
		}else if(type=='face'){
			swiper.slideTo(8);
		}else if(type=='auth'){
			swiper.slideTo(13);
		}
		clearTimeout(greenFade);
	}, 1100);
});

var testedCount=1;
$('.j-go-beauty').bind('click', function(){
	testedCount++;
	swiper.slideTo(8);
});
$("#j-go-money").bind('click', function(){
	testedCount++;
	swiper.slideTo(2);
});
$("#j-go-auth").bind('click', function(){
	testedCount++;
	swiper.slideTo(13);
});
$('body').bind('touchmove',function(event){
	event.preventDefault();
});

//每个case的等级
var zhongxinLevel = 1, jindongLevel = 1;
var singLevel = 1, faceLevel = 1;
var voiceLevel = 1, userLevel = 1;

var moneyLevel=0, faceTotalLevel=0, authLevel=0;

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
		moneyLevel = 1;
		$('#j-money-result').text('100%，作为一名土豪，又会省钱，你命中注定是有钱人，去测试一下颜值，看能否变成白富美(高富帅）。')
	}else{
		moneyLevel = 0;
		$('#j-money-result').text('50%，你是个屌丝，还不知道怎么省钱，彗星撞地球也挽救不了你的贫穷，看看能否用颜值改变自己的命运。')
	}
	if(testedCount==3){
		$(".j-go-beauty").remove();
		$("#p8").append('<img class="j-test-over go-next" src="/static/css/anniversary/result/final-btn.png">')
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
		swiper.slideTo(9);
	}, 2500);
});


var jQcd = $('#j-sing-countdown');
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
	swiper.slideTo(11);
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

// 结束唱歌，查看颜值部分结果
$('#j-sing-next').bind('click', function(){
	if(singLevel == 3 && faceLevel == 3){
		faceTotalLevel = 1;
		$('#j-face-result').text('100%，你的美貌就像天使，且喉清韵雅，去看看是否智慧和美貌并存')
	}else{
		faceTotalLevel = 0;
		$('#j-face-result').text('50%，你相貌平平，声音也像乌鸦叫，要想出人头地，还是另择途径吧')	
	}
	swiper.slideTo(12)
});


$("#j-face-next").bind('click', function(){
	if(testedCount==3){
		$("#j-go-auth").remove();
		$("#p13").append('<img class="j-test-over go-next" src="/static/css/anniversary/result/final-btn.png">')
	}
	swiper.slideTo(10);
});
$("#j-voice-next").bind('click', function(){
	if(testedCount==3){
		$("#j-user-next").remove();
		$("#p14").append('<img class="j-test-over go-next" src="/static/css/anniversary/result/final-btn.png">')
	}
	swiper.slideNext();
});
$("#j-get-user-result").bind('click', function(){
	userLevel = parseInt(Math.random()*3)+1;
	if(userLevel == 1){
		var src = '/static/css/anniversary/result/user/1.png';
	}else if(userLevel == 2){
		var src = '/static/css/anniversary/result/user/2.png';
	}else if(userLevel == 3){
		var src = '/static/css/anniversary/result/user/3.png';
	}
	$("#j-user-result").attr('src', src);	
	swiper.slideNext();
});

// 用户画像结束，查看权利部分结果
$("#j-user-next").bind('click', function(){
	var usr = $("#j-user-name-input").val();
	$("#j-user-name").text(usr);
	if(voiceLevel == 3 && userLevel == 3){
		authLevel = 1;
		$("#j-auth-result").text(' 100%，你虽然一呼百应，高权在握，但还是很羡慕国民老公王思聪')
	}else{
		authLevel = 0;
		$("#j-auth-result").text('50%，你卑微如尘，天天在家玩泥巴不觉得厌倦么?出去试一试自己的财运吧！');
	}
	swiper.slideNext();
});

// 叫喊部分逻辑
var wave = 1, waveTimes=0, jQwave=$(".i-voice-wave"), voiceClicked=false;
var waveTimer;
$('#j-voice-microphone').bind('click', function(){
	if(voiceClicked){
		return;
	}
	voiceClicked=true;
	waveTimer = setInterval(function(){
		wave++;
		waveTimes++;
		if(waveTimes >= 7){
			clearInterval(waveTimer);
			voiceLevel = parseInt(Math.random()*3)+1;
			if(voiceLevel == 1){
				var src = '/static/css/anniversary/result/voice/1.png';
				$("#raida").css({'-webkit-transform': 'rotate(80deg)'});
			}else if(voiceLevel == 2){
				var src = '/static/css/anniversary/result/voice/2.png';
				$("#raida").css({'-webkit-transform': 'rotate(180deg)'});
			}else if(voiceLevel == 3){
				var src = '/static/css/anniversary/result/voice/3.png';
				$("#raida").css({'-webkit-transform': 'rotate(280deg)'});
			}
			$("#j-voice-result").attr('src', src);
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
});

var jQfinal = $("#j-final-result");
var shareText = '';
$(".j-go-result").bind('click', function(){

	if(moneyLevel == 0 && faceTotalLevel == 1 && authLevel == 1){
		jQfinal.empty()
		jQfinal.append('<p>你长得正点，又有权有势</p><p>武媚娘想请你喝茶</p>')
	}else if(moneyLevel == 0 && faceTotalLevel == 1 && authLevel == 0){
		jQfinal.empty()
		jQfinal.append('<p>恭喜你刷脸成功</p><p>成为新一代中老年过目难忘的偶像</p>')
	}else if(moneyLevel == 0 && faceTotalLevel == 0 && authLevel == 1){
		jQfinal.empty()
		jQfinal.append('<p>你凭借天生的霸气</p><p>打破了这个世界看脸规则</p>')
	}else if(moneyLevel == 0 && faceTotalLevel == 0 && authLevel == 0){
		jQfinal.empty()
		jQfinal.append('<p>你属于天煞孤星和丧门星和扫把星三星合体</p><p>天赋秉异，所向无敌</p>')
	}else if(moneyLevel == 1 && faceTotalLevel == 0 && authLevel == 0){
		jQfinal.empty()
		jQfinal.append('<p>你天生财运旺盛</p><p>几乎完胜国民老公王思聪</p>')
	}else if(moneyLevel == 1 && faceTotalLevel == 0 && authLevel == 1){
		jQfinal.empty()
		jQfinal.append('<p>你有钱有权，找一个漂亮的另一半</p><p>改善一下自己的基因，完全不是问题。</p>')
	}
	wx.onMenuShareAppMessage({		    
		title: '贴吧企业平台一周年', // 分享标题
	    link: 'http://ssld-vi.com/tieba/anniversary', // 分享链接
	    imgUrl: 'http://morry.oss-cn-beijing.aliyuncs.com/tieba/images/user-image.png', // 分享图标
	    desc: shareText,
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	swiper.slideTo(18);
});
$("body").delegate('.j-test-over', 'click', function(){
	swiper.slideTo(18);
});

var jQshareMask=$("#j-share-mask");
$("#j-share-btn").bind('click', function(){
	jQshareMask.show();
});
jQshareMask.bind('click', function(){
	jQshareMask.hide();
})
