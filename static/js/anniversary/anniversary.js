var mPart1 = document.getElementById("music-part1");
var mTrans1 = document.getElementById("music-trans1");

var mRaida = document.getElementById("music-raida");
var mSwipecard = document.getElementById("music-swipecard");

// mPart1.play();
// stats = audio1.paused;

var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	// effect : 'fade',
	speed: 0,
	onlyExternal: true,
	onSlideChangeStart: function(swiper){
		var dom = $('.swiper-slide')[swiper.activeIndex];
		var domPrev = $('.swiper-slide')[swiper.activeIndex-1];
		domPrev.style.opacity = 0;
		dom.style.opacity = 1
	}

});	
$("#go").bind('click', function(){
	$(this).removeClass('go-stere').addClass('go-flat');
	setTimeout(function(){
		swiper.slideTo(1);
	},300);
});

var btnAnimation = function(cb){
	setTimeout(function(){
		cb();
	}, 300)
}
// 不同人生主题
var greenFade;
$('.triangle-btn').bind('click', function() {
	// 去除第一页动画
	$('#p1 .gear1, #p1 .gear2, #p1 .gear3, #p1 .cone1, #p1 .cone2, #p1 .cube1, #p1 .title').remove();
	$(".hand").remove();
	var jQself = $(this);
	var type = jQself.data('type');
	$('.p2-black-triangle').hide()
	$('.p2-green-triangle').addClass('fadeIn');
	if(type == 'money'){
		jQself.find('.circle-btn').removeClass('circle-money-flat').addClass('circle-money');	
	}else if(type=='face'){
		jQself.find('.circle-btn').removeClass('circle-popular-flat').addClass('circle-popular');
	}else if(type=='auth'){
		jQself.find('.circle-btn').removeClass('circle-auth-flat').addClass('circle-auth');					
	}

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

//结束每部分测试
var testedCount=1;
$('#j-go-face').bind('click', function(){
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

var jingdongTimer;


var moneyLevel=1, faceTotalLevel=1, authLevel=1;
var moneyFinalLevel=0, faceFinalLevel=0, authFinalLevel=0;

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
	mSwipecard.play();
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
	mSwipecard.play();
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
				if(swipeTime<4){
					zhongxinLevel = 1;
					$("#j-zhongxin-result").attr('src', '/static/css/anniversary/result/zhongxin/1.png');
				}else if(swipeTime>4 && swipeTime<8){
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
	if(shakeTimes<4){
		jindongLevel = 1;
		var src = '/static/css/anniversary/result/jingdong/1new.png';
		$("#j-jd-result").attr('src', src);
	}else if(shakeTimes>4 && shakeTimes<8){
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

$('#j-zhongxin-next').bind('click', function(){
	// 初始化摇一摇
	init();
	// 去除第三页动画
	$('#p3 .p2-dec2, #p3 .p2-dec1, #p3 .p2-dec3').remove();
	$('#p4 .p2-dec2, #p4 .p2-dec1, #p4 .p2-dec3').remove();
	// 如果到金钱的时候已经测完3次，金钱部分替换为结束
	if(testedCount==3){
		$("#j-go-face").remove();
		$("#p8").append('<img class="j-test-over go-next" src="/static/css/anniversary/result/final-btn.png">')
	}
	swiper.slideTo(5);

	jingdongTimer = setTimeout(function(){
		zhongXinCB();
		clearTimeout(jingdongTimer);
	}, shakeDuration);
});
$('#j-jingdong-next').bind('click', function(){
	if(jindongLevel==1 && zhongxinLevel==1){
		moneyLevel = 1;
		$('#j-money-result').text('20%，你是个屌丝，还不知道怎么省钱，彗星撞地球也挽救不了你的贫穷，看看能否用颜值改变自己的命运')
	}else if(zhongxinLevel!=3 && jindongLevel!=1){
		// 不是土豪，但是会省钱
		moneyLevel = 2;
		$('#j-money-result').text('50%，你虽然属于无产阶级，但是由于比较会抠门儿，有暴发户的嫌疑，还是注意一下自己的形象吧')
	}else if(zhongxinLevel!=1 && jindongLevel==1){
		// 土豪但是不会省钱
		moneyLevel = 3;
		moneyFinalLevel=1;
		$('#j-money-result').text('70%，作为一个有钱人，你并不会省钱，迟早会成为坑爹二代，还是去看看颜值能否挽救你')
	}else if(zhongxinLevel==3 && jindongLevel!=1){
		moneyLevel = 4;
		moneyFinalLevel=1;
		$('#j-money-result').text('100%，作为一名土豪，又会省钱，你命中注定是有钱人，去测试一下颜值，看能否变成白富美(高富帅）')
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
var jQuploadReminder = $(".upload-reminder");
$('.i-test-face').bind('click', function(){
	var file = jQcameraInput.get(0).files[0];
	if(!file){
		if(jQuploadReminder.attr('src') == '/static/css/anniversary/icon/upload-blue.png'){
			jQuploadReminder.attr('src', '/static/css/anniversary/icon/upload-red.png');			
		}
		if(jQuploadReminder.hasClass('flash-warning')){
			jQuploadReminder.removeClass('flash-warning');
		}
		setTimeout(function(){
			jQuploadReminder.addClass('flash-warning');
		}, 300);
		return;
	}else{
		jQuploadReminder.attr('src', '/static/css/anniversary/icon/upload-blue.png')
	}
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
	if(singLevel==1){
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
var jQfaceResult = $('#j-face-final-result');
$('#j-sing-next').bind('click', function(){
	if(singLevel != 3 && faceLevel == 1){
		faceTotalLevel = 1;
		// 颜值一般，声音还难听
		jQfaceResult.text('20%，你是巴黎圣母院的敲钟人，就别做明星梦了，还是去看看有没有别的机会吧')
	}else if(singLevel != 3 && faceLevel != 1){
		// 有颜值但没好声音
		faceTotalLevel = 2;
		jQfaceResult.text('50%，你虽然相貌不错，但是声音像乌鸦叫，要想出人头地，还是另择途径吧')	
	}else if(singLevel == 3 && faceLevel != 3){
		// 声音好听但颜值不行
		faceTotalLevel = 3;
		faceFinalLevel = 1;		
		jQfaceResult.text('70%，你虽然相貌平平，但是声音却悦耳动听，不过在这个看脸的世界，还是寻找更适合自己的路吧。')	
	}else if(singLevel == 3 && faceLevel == 3){
		faceTotalLevel = 4;
		faceFinalLevel = 1;		
		jQfaceResult.text('100%，你的美貌就像天使，且喉清韵雅，去看看是否智慧和美貌并存')	
	}
	swiper.slideTo(12)
});

$("#j-face-next").bind('click', function(){
	if(testedCount==3){
		// 如果颜值完了已经测试3次，颜值部分替换为结束
		$("#j-go-auth").remove();
		$("#p13").append('<img class="j-test-over go-next" src="/static/css/anniversary/result/final-btn.png">')
	}
	swiper.slideTo(10);
});
$("#j-voice-next").bind('click', function(){
	if(testedCount==3){
		$("#j-go-money").remove();
		$("#p14").append('<img class="j-test-over go-next" src="/static/css/anniversary/result/final-btn.png">')
	}
	swiper.slideNext();
});
// $("#j-zhongxin-next").bind('click', function(){
// });

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
var jQauthResult = $("#j-auth-result");
$("#j-user-next").bind('click', function(){
	var usr = $("#j-user-name-input").val();
	$("#j-user-name").text(usr);
	if(voiceLevel != 3 && userLevel == 1){
		authLevel = 1;
		jQauthResult.text('20%，你人缘太差，又呆在一个鸟不拉屎的地方，仕途跟你没半毛钱的关系，还是看看财运如何吧')
	}else if(voiceLevel == 3 && userLevel != 3 ){
		authLevel = 2;
		jQauthResult.text('50%，你有一定的号召力，不过乡土气息有点浓厚，难以hold住大场面，还是看看自己的 财运吧');
	}else if(userLevel != 1 && voiceLevel != 3 ){
		authLevel = 3;
		authFinalLevel = 1;
		jQauthResult.text('70%，你虽然位高权重，但却没什么号召力，只能当个傀儡，出去试一试自己的财运吧！');
	}else if(voiceLevel == 3 && userLevel != 1 ){
		authLevel = 4;
		authFinalLevel = 1;
		jQauthResult.text('100%，你虽然一呼百应，高权在握，但还是很羡慕国民老公王思聪，不如试一试金钱运如何？');
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
			mRaida.play();
			if(voiceLevel == 1){
				var src = '/static/css/anniversary/result/voice/1.png';
				$("#raida").css({'-webkit-transform': 'rotate(80deg)'});
			}else if(voiceLevel == 2){
				var src = '/static/css/anniversary/result/voice/2.png';
				$("#raida").css({'-webkit-transform': 'rotate(180deg)'});
			}else if(voiceLevel == 3){
				var src = '/static/css/anniversary/result/voice/3.png';
				$("#raida").css({'-webkit-transform': 'rotate(270deg)'});
			}
			$("#j-voice-result").attr('src', src);
			setTimeout(function(){
				swiper.slideNext();
			}, 2300);
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
var finalCal = function(){
	mTrans1.play();
	mPart1.pause();
	if(moneyFinalLevel == 0 && faceFinalLevel == 1 && authFinalLevel == 1){
		jQfinal.empty();
		jQfinal.append('<p>你长得正点，又有权有势</p><p>武媚娘想请你喝茶</p>');
		shareText = '我长得正点，又有权有势，武媚娘想请我喝茶'
	}else if(moneyFinalLevel == 1 && faceFinalLevel == 1 && authFinalLevel == 1){
		jQfinal.empty();
		jQfinal.append('<p>你凭借自己的颜值</p><p>玩转金钱与权力游刃有余</p>');
		shareText = '我凭借自己的颜值，玩转金钱与权力游刃有余';
	}else if(moneyFinalLevel == 0 && faceFinalLevel == 1 && authFinalLevel == 0){
		jQfinal.empty();
		jQfinal.append('<p>恭喜你刷脸成功</p><p>成为新一代中老年过目难忘的偶像</p>');
		shareText = '我刷脸成功，成为新一代中老年过目难忘的偶像，转发给大家看看吧。';
	}else if(moneyFinalLevel == 0 && faceFinalLevel == 0 && authFinalLevel == 1){
		jQfinal.empty();
		jQfinal.append('<p>你凭借天生的霸气</p><p>打破了这个世界看脸规则</p>');
		shareText = '我凭借天生的霸气，打破了这个世界看脸规则';
	}else if(moneyFinalLevel == 0 && faceFinalLevel == 0 && authFinalLevel == 0){
		jQfinal.empty();
		shareText = '我属于天煞孤星和丧门星和扫把星三星合体，天赋秉异，所向无敌';
		jQfinal.append('<p>你属于天煞孤星和丧门星和扫把星三星合体</p><p>天赋秉异，所向无敌</p>')
	}else if(moneyFinalLevel == 1 && faceFinalLevel == 0 && authFinalLevel == 0){
		jQfinal.empty();
		shareText = '我天生财运旺盛，几乎完胜国民老公王思聪';
		jQfinal.append('<p>你天生财运旺盛</p><p>几乎完胜国民老公王思聪</p>')
	}else if(moneyFinalLevel == 1 && faceFinalLevel == 0 && authFinalLevel == 1){
		jQfinal.empty();
		shareText = '我有钱有权，找一个漂亮的另一半 ，改善一下自己的基因，完全不是问题。';
		jQfinal.append('<p>你有钱有权，找一个漂亮的另一半，改善一下自己的基因，完全不是问题。</p>')
	}else if(moneyFinalLevel == 1 && faceFinalLevel == 1 && authFinalLevel == 0){
		jQfinal.empty();
		shareText = '我有钱有权，找一个漂亮的另一半 ，改善一下自己的基因，完全不是问题。';
		jQfinal.append('<p>你有钱有权，找一个漂亮的另一半，改善一下自己的基因，完全不是问题。</p>')
	}
	wx.onMenuShareAppMessage({		    
		title: shareText, // 分享标题
	    link: 'http://ssld-vi.com/tieba/anniversary', // 分享链接
	    imgUrl: 'http://morry.oss-cn-beijing.aliyuncs.com/tieba/images/ann_cover.jpg' , // 分享图标
	    desc: '如果上天给你重新改变命运的机会，你会……',
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	swiper.slideTo(18);

}
$(".j-go-result").bind('click', finalCal);

$("body").delegate('.j-test-over', 'click', function(){
	finalCal();
	swiper.slideTo(18);
});

var jQshareMask=$("#j-share-mask");
$("#j-share-btn").bind('click', function(){
	jQshareMask.show();
});
jQshareMask.bind('click', function(){
	jQshareMask.hide();
})
