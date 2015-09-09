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

$('body').bind('touchmove',function(event){
	event.preventDefault();
});

var mBg = document.getElementById("music-bg");
var mParty = document.getElementById("music-party");
var mLevel = document.getElementById("music-level");
// var mSwipe = document.getElementById("music-swipecard");

mBg.loop=true;
mBg.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
mBg.play();

var currentStage = 1;
function keyframeAnimation(selector, height, keyNum, duration, delay, loop){
	var timer;
	var animation = setTimeout(function(){
		var jQdom = $(selector);
		var times = 1;
		jQdom.show();
		var p;
		timer = setInterval(function(){
			if(times>(keyNum-1)){
				if(loop == false){
					clearInterval(timer);
					times = 1;
					jQdom.css({'background-position': '0px '+p});
					return;					
				}else{
					times = 1;
					p = 0;
					jQdom.css({'background-position': '0px '+p});					
				}

			}
			p = (-1) * height * times + 'px';
			jQdom.css({'background-position': '0px '+p});
			times++;
		}, duration);
		clearTimeout(animation);
	}, delay);

	return timer;
}

function removeAnimation(selector, timer){
	var jQdom = $(selector);
	jQdom.remove();
	clearInterval(timer);
}
function clearAnimation(timer){
	clearInterval(timer);
}


// 音乐控制
var musicPlay=true;
var inParty=false;
var musicTimer;
var jQmusic = $("#audio_pan");
// musicTimer = keyframeAnimation('.music', 70, 16, 150, 0, true);
jQmusic.bind('click', function(){
	if(musicPlay){
		musicPlay=false;
		mBg.pause();
		mParty.pause();
        jQmusic.addClass("m_off").removeClass("music-status-on"); 
	}else{
		musicPlay=true;
		mBg.play();
		jQmusic.removeClass("m_off").addClass("music-status-on"); 
		// todo 播放party
	}

});
var levelMusic=function(){
	if(musicPlay){
		mLevel.play();
	}
}

//关键帧动画timer
var goAnime, fireAnime;

var p2Animate = function(){
	$("#j-p2-content-wrapper").addClass('movedown')
	fireAnime = keyframeAnimation('#j-fire', 70, 8, 70, 0, true);
	$("#j-ship").addClass('moveright-slow')
	// $(".i-sudden").addClass('fadeIn animated delay2');
	$(".sudden").addClass('fadeIn animated delay2');

	setTimeout(function(){
		swiper.slideNext();
		$(".i-invitation").addClass('rollIn animated');
		$("#j-inv-text").addClass('flash animated delay1')
	}, 4500)
}

var second = 0, loading=true, loadingAnime;
var secondNum = $("#loading-num");
$(window).load(function(){
	var timer = setInterval(function(){
		second = second+2;
		if(second>100){
			loading=false;
			swiper.slideNext();
			p2Animate();
			second = 0;
			clearInterval(timer);
			return;
		}
		secondNum.text(second);
	}, 40);
	loadingAnime = keyframeAnimation('.loading-bg', 170, 50, 50, 0, false);	
	$('.diaosi').addClass('fadeOut animated delay0_5');
	$('.i-superman').addClass('fadeIn animated delay1');
});

var invClick = 1;
var jQinvText=$("#j-inv-text");
$(".click").bind('click', function(){
	invClick++;
	if(invClick==1){
		jQinvText.text('你走狗屎运了！居然被来自K星球的邀请参加一个神秘的约会！');
	}else if(invClick == 2){
		jQinvText.text('是乡村变装大趴还是时尚媒体复古大趴，还是海天盛筵大趴?不管了，去了再说。');	
	}else if(invClick == 3){
		$("#j-go").show();
		$(".click-reminder").remove();
		goAnime = keyframeAnimation('#p3 .shine-lines', 200, 13, 30, 0, true);	
	}
});

$(".i-go").bind('click', function(){
	goStage(1);
	removeAnimation('#p13 .shine-lines', goAnime);	

});

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var imgClip, imgFace, imgReader;
imgClip = new Image();
imgClip.src = "/static/css/anniversary2/mask.png";

var TO_RADIANS = Math.PI/180; 
var photo=document.getElementById("photo");

function drawRotatedImage(cvs, image, x, y, angle) { 
	cvs.width = 450;
	cvs.height = 580;
	var context=cvs.getContext("2d");
	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
	context.rotate(angle * TO_RADIANS);
	context.drawImage(image, -290, -225, 580, 450);
	context.rotate(-angle * TO_RADIANS);
	context.translate(-x, -y);
	context.restore(); 
	var img = cvs.toDataURL("image/png"); 
	return img;
}
var drawFaceRotate = function(){
	if(imgReader.width>imgReader.height){
		imgFace.src = drawRotatedImage(photo, imgReader, 225, 290, 90);
	}else{
		imgFace.src = imgReader.src;
	}
}

var drawFace = function(){
	drawFaceRotate();
	ctx.drawImage(imgClip, 0, 0, 450, 580);
	ctx.globalCompositeOperation = "source-in";
	// ctx.drawImage(imgFace, 0, 0, 450, 580);
	// alert("aaa");
	imgFace.onload = function(){
		// alert("bbbb");
		// alert(imgFace.src);
		ctx.drawImage(imgFace, 0, 0, 450, 580);	
		var img = canvas.toDataURL("image/png"); 
		$("#jd-avatar").attr('src', img);
		$("#final-avatar").attr('src', img);
    	$("#j-secury").show();
    	$("#j-retake").show();
    	$("#j-photo").hide();		
	}
}

var arrowTimer;
var aCount = 0;
var securyProcess = function(){
	var sArrow = $(".i-secury-arrow");
	arrowTimer = setInterval(function(){
		if(aCount==10){
			clearInterval(arrowTimer);
			aCount=0;
			return;
		}
		$(sArrow[aCount]).removeClass('i-secury-arrow').addClass('i-secury-arrow-ok');
		aCount++;
	},200);
}

var jQcameraInput = $('#cameraInput');
var jQprevImg = $(".uploaded-img");
var avatar;
function readFile(){
	mBg.play();
    file = jQcameraInput.get(0).files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("请上传图片类型的文件~");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
    	// jQprevImg.attr('src', this.result).show();
    	imgReader = new Image();
    	imgReader.src = this.result;
    	imgFace = new Image();
    	// alert("ccc");
    	// if(imgReader.complete){
    	// 	drawFaceRotate();
    	// }else{
    	// 	imgReader.onload = drawFaceRotate;
    	// }
    	if(imgReader.complete && imgClip.complete) { //check if image was already loaded by the browser
		   drawFace();
		}else {
		   imgReader.onload = drawFace;
		   imgClip.onload = drawFace;
		}
    }
}
jQcameraInput.bind('change', readFile);
$('#j-photo').bind('click', function(){
	jQcameraInput.click();
});

$("#j-retake").bind('click', function(){
	jQcameraInput.click();
});

// 游戏逻辑变量
var anjianLevel=1, jingdongLevel=1, zhongxinLevel=1, geshouLevel=1, huaweiLevel=1;
var finalLevel=1, jQfinalResult=$("#j-final-result"), jQxunzhang=$('.xunzhang');
var jQcar = $("#j-car"), jQpeople=$("#j-people"), jQbook=$("#j-book");
var jQshareText = $("#j-share-text"), jQbookAnime=$("#j-book-anime");
var jQgailou=$("#j-gailou-animation");
var jQjdResult=$("#j-jd-result"), jQzxResult=$("#j-zx-result");
var jQgsResult = $("#j-gs-result"), jQhwResult = $("#j-hw-result");

var fmoveonTimer, amoveTimer;
var shot = function(shotNum){
	// jingdongLevel=shotNum;
	jingdongLevel = parseInt(Math.random()*2)+1;
	levelMusic();	
	$('#metro1').addClass('metro1-anime animated0_7');
	$('#metro2').addClass('metro2-anime animated0_7');
	$('#metro3').addClass('metro3-anime animated0_7');
	$('#metro4').addClass('metro4-anime animated0_7');
	fmoveonTimer = keyframeAnimation('#j-fire-moveon', 70, 8, 70, 0, true);
	amoveTimer = keyframeAnimation("#j-arrow-moveon", 70, 4, 200, 0, true)
	if(jingdongLevel==1){
		jQjdResult.attr('src', '/static/css/anniversary2/result/jingdong/1.png');
	}else{
		jQjdResult.attr('src', '/static/css/anniversary2/result/jingdong/2.png');
	}
	swiper.slideNext();
}

$("#j-shot1").bind('click', function(){
	swiper.slideNext();
	shot(1);
});

$("#j-shot2").bind('click', function(){
	swiper.slideNext(2);
	shot(2);
});

// 关卡切换
var jQarrow = $(".arrow");
var jQlocation = $("#j-location");
var jQmapTip = $("#j-map-tip");
var game = function(num, delay){
	var jQsale = $('.small-sale'+num);
	var left = parseInt(jQsale.position().left);
	var newleft = parseInt(jQsale.position().left)-70;

	var leftPx = left+'px';
	setTimeout(function(){
		jQsale.removeClass('i-sale-small').addClass('i-sale-big')
		.css({'left': newleft+'px'} );
	}, delay);
	setTimeout(function(){
		jQsale.addClass('i-sale-small').removeClass('i-sale-big')
		.css({'left': left+'px'} );
	}, delay+700);
}
var luckyTimes=0;
$('body').delegate('.i-sale-big', 'click', function(){
	var clicked = $(this).data('clicked');
	if(clicked){
		return;
	}
	$(this).data('clicked', true);
	luckyTimes++;
});
var goStage = function(stageNum){
	$("#j-planet1").unbind();
	$('.i-huixing').unbind();
	$('.i-mani').unbind();
	$('.i-gede').unbind();
	$('.i-dawang').unbind();
	$('.i-k').unbind();
	if(stageNum==1){	
		$("#j-planet1").bind('click', function(){
			swiper.slideNext();
		});
	}else if(stageNum==2){
    	$(".i-huixing-lock").removeClass('i-huixing-lock').addClass('i-huixing');
    	jQarrow.css({'top': '540px'});
    	jQlocation.css({'top': '675px'});
    	// 文案显示
    	anjianLevel = parseInt(Math.random()*2)+1;
    	if(anjianLevel==1){
    		jQmapTip.addClass('map-tip1').attr('src', '/static/css/anniversary2/result/map/anjian/1.png');
    	}else{
			jQmapTip.addClass('map-tip1').attr('src', '/static/css/anniversary2/result/map/anjian/2.png');
    	}	
    	$('.i-huixing').bind('click', function(){
    		$(".i-sale-big").addClass('shot-scale animated');
    		$('.i-jd-planet').addClass('floating');
    		$('.i-sale-small').addClass('floating');
    		swiper.slideTo(5);
    		//todo:敲松鼠游戏
    		game(1, 1300);
    		game(3, 2600);
    		game(2, 3900);
    		game(6, 5200);
    		game(4, 6500);
    		game(5, 7800);
    		setTimeout(function(){
    			if(luckyTimes>1){
    				shot(1);
    			}else{
    				shot(2);
    			}

    		}, 8500);
    	});    	
	}else if(stageNum==3){
    	$(".i-mani-lock").removeClass('i-mani-lock').addClass('i-mani');
    	jQarrow.css({'top': '190px', 'left': '370px'}).removeClass('moveupdown').addClass('moveleftright');
    	jQlocation.css({'top': '365px'});
    	$('.i-mani').bind('click', function(){
    		swiper.slideTo(7);
    	});
    	if(jingdongLevel==1){
    		jQmapTip.removeClass('map-tip1').addClass('map-tip2').attr('src', '/static/css/anniversary2/result/map/jingdong/1.png');
    	}else{
			jQmapTip.removeClass('map-tip1').addClass('map-tip2').attr('src', '/static/css/anniversary2/result/map/jingdong/2.png');
    	}
	}else if(stageNum==4){
    	$(".i-gede-lock").removeClass('i-gede-lock').addClass('i-gede');
    	jQarrow.attr('src', '/static/css/anniversary2/icon/arrow-down.png');
    	jQarrow.addClass('moveupdown').removeClass('moveleftright');
    	jQarrow.css({'top': '300px', 'left': '582px'});
    	jQlocation.css({'top': '145px', 'left': '443px'});
    	$('.i-gede').bind('click', function(){
    		swiper.slideTo(9);
    	});

    	if(zhongxinLevel==1){
    		jQmapTip.removeClass('map-tip2').addClass('map-tip3').attr('src', '/static/css/anniversary2/result/map/zhongxin/1.png');
    	}else{
			jQmapTip.removeClass('map-tip2').addClass('map-tip3').attr('src', '/static/css/anniversary2/result/map/zhongxin/2.png');
    	}    	
	}else if(stageNum==5){
    	$(".i-dawang-lock").removeClass('i-dawang-lock').addClass('i-dawang');
    	jQarrow.css({'top': '600px', 'left': '582px'});
    	jQlocation.css({'top': '390px', 'left': '600px'}); 	
    	// jQlocation.css({'top': '630px', 'left': '440px'});
    	$('.i-dawang').bind('click', function(){
    		jQbook.addClass('shake animated');
    		swiper.slideTo(11);
    	});
    	if(geshouLevel==1){
    		jQmapTip.removeClass('map-tip3').addClass('map-tip4').attr('src', '/static/css/anniversary2/result/map/geshou/1.png');
    	}else{
			jQmapTip.removeClass('map-tip3').addClass('map-tip4').attr('src', '/static/css/anniversary2/result/map/geshou/2.png');
    	}

	}else if(stageNum==6){
    	$(".i-k-lock").removeClass('i-k-lock').addClass('i-k');
    	jQarrow.css({'top': '800px', 'left': '344px'});
    	jQlocation.css({'top': '630px', 'left': '440px'});
    	$('.i-k').bind('click', function(){
    		mBg.pause();
			mParty.play();
    		swiper.slideTo(13);
    	});
    	if(huaweiLevel==1){
    		jQmapTip.removeClass('map-tip4').addClass('map-tip5').attr('src', '/static/css/anniversary2/result/map/huawei/1.png');
    	}else{
			jQmapTip.removeClass('map-tip4').addClass('map-tip5').attr('src', '/static/css/anniversary2/result/map/huawei/2.png');
    	}    	

	}
	swiper.slideTo(3);
}
// 安检完成
$("#j-secury").bind('click', function(){
    $(".secury-process").show();
    securyProcess();
    currentStage = 2;
    setTimeout(function(){
    	goStage(currentStage);
    }, 2000)
});

// 完成第三关
$("#j-move-stage-3").bind('click', function(){
    currentStage = 3;
    goStage(currentStage);
});

touch.on('#j-swipe-card', 'touchstart', function(ev){
	ev.preventDefault();
});
var target = document.getElementById("j-swipe-card");

var fmoveon4Timer, amoveon4Timer;

var swipeTime = 0;
var jQcardArrow = $('.i-card-arrow');
var jQcardArrowR = $('.i-card-arrow-reverse');
var swipe = function(){
	swipeTime++;
	if(swipeTime==1){
		$(target).css({'-webkit-transform': 'translateX(250px)'});	
		jQcardArrow.hide().removeClass('moveright-slow animated1_5');
		jQcardArrowR.show().addClass('moveleft-slow animated1_5');
	}else if(swipeTime == 2){
		jQcardArrow.show().addClass('moveright-slow animated1_5');
		jQcardArrowR.hide().removeClass('moveleft-slow animated1_5');
		$(target).css({'-webkit-transform': 'translateX(0px)'});
	}else if(swipeTime == 3){
		jQcardArrow.hide().removeClass('moveright-slow animated1_5');
		zhongxinLevel = parseInt(Math.random()*2)+1;
		if(zhongxinLevel==1){
			jQzxResult.attr('src', '/static/css/anniversary2/result/zhongxin/1.png');
		}else{
			jQzxResult.attr('src', '/static/css/anniversary2/result/zhongxin/2.png');
		}
		showFinal(jingdongLevel, zhongxinLevel);
		$(target).css({'-webkit-transform': 'translateX(250px)'});	
		setTimeout(function(){
			levelMusic();
			fmoveon4Timer = keyframeAnimation('#j-move-stage-4 .j-fire-moveon', 70, 8, 70, 0, true);
			amove4Timer = keyframeAnimation("#j-move-stage-4 .j-arrow-moveon", 70, 4, 200, 0, true)

			$('#zx-metro1').addClass('metro1-anime animated0_7');
			$('#zx-metro2').addClass('metro2-anime animated0_7');
			$('#zx-metro3').addClass('metro3-anime animated0_7');
			$('#zx-metro4').addClass('metro4-anime animated0_7');
			swiper.slideTo(8);
	    }, 1500);
	}
}
touch.on(target, 'swiperight', function(ev){
	swipe();
});
touch.on(target, 'swipeleft', function(ev){
	swipe();
});


// 完成第四关
$("#j-move-stage-4").bind('click', function(){
    currentStage = 4;
    goStage(currentStage);
});

var showFinal=function(jingdongLevel, zhongxinLevel){
	if(jingdongLevel==1 && zhongxinLevel==1){
		// 潮金 土豪明星 杀千陌
		geshouLevel = 1; //星
		huaweiLevel=1; //火
		finalLevel=1;
	}else if(jingdongLevel==1 && zhongxinLevel==2){
		// 潮挖 接地气的明星
		geshouLevel = 1;
		huaweiLevel = 1;
		finalLevel=2;
	}else if(jingdongLevel==2 && zhongxinLevel==1){
		// 好金 土豪粉丝
		geshouLevel = 2; //粉
		huaweiLevel=2; //沉
		finalLevel=3;
	}else if(jingdongLevel==2 && zhongxinLevel==2){
		// 好挖 赤诚
		geshouLevel = 2;
		huaweiLevel=2; //沉
		finalLevel=4;
	}

	if(finalLevel==1){
		jQfinalResult.attr('src', '/static/css/anniversary2/result/final/1.png');
		$(jQxunzhang[0]).addClass('x11');
		$(jQxunzhang[1]).addClass('x21');
		$(jQxunzhang[2]).addClass('x31');
		$(jQxunzhang[3]).addClass('x41');
		jQbook.attr('src', '/static/css/anniversary2/icon/book1.png');
		jQbookAnime.addClass('book1-anime');
	    jQgailou.append('<i class="icon12 i-building3"></i>');
	    jQgailou.append('<i class="icon12 i-building2"></i>');
	    jQgailou.append('<i class="icon12 i-building1"></i>');

		jQpeople.attr('src', '/static/css/anniversary2/result/final/p11.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car1.png');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/1.png');
		jQhwResult.attr('src', '/static/css/anniversary2/result/huawei/1.png');		
		jQshareText.attr('src','/static/css/anniversary2/result/final/share1.png');

	}else if(finalLevel==2){
		jQbook.attr('src', '/static/css/anniversary2/icon/book1.png');
		jQbookAnime.addClass('book1-anime');
	    jQgailou.append('<i class="icon12 i-building3"></i>');
	    jQgailou.append('<i class="icon12 i-building2"></i>');
	    jQgailou.append('<i class="icon12 i-building1"></i>');

		jQfinalResult.attr('src', '/static/css/anniversary2/result/final/2.png');
		jQpeople.attr('src', '/static/css/anniversary2/result/final/p11.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car2.png').addClass('car2');
		$(jQxunzhang[0]).addClass('x11');
		$(jQxunzhang[1]).addClass('x22');
		$(jQxunzhang[2]).addClass('x31');
		$(jQxunzhang[3]).addClass('x41');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/1.png');
		jQhwResult.attr('src', '/static/css/anniversary2/result/huawei/1.png');		
		jQshareText.attr('src','/static/css/anniversary2/result/final/share2.png');

	}else if(finalLevel==3){
		// 好金 土豪粉丝
		jQbook.attr('src', '/static/css/anniversary2/icon/book2.png');
		jQbookAnime.addClass('book2-anime');
	    jQgailou.append('<i class="icon12 i-flat-building"></i>');
		jQfinalResult.attr('src', '/static/css/anniversary2/result/final/3.png');
		jQpeople.attr('src', '/static/css/anniversary2/result/final/p22.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car1.png');
		$(jQxunzhang[0]).addClass('x12');
		$(jQxunzhang[1]).addClass('x21');
		$(jQxunzhang[2]).addClass('x32');
		$(jQxunzhang[3]).addClass('x42');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/2.png');
		jQhwResult.attr('src', '/static/css/anniversary2/result/huawei/2.png');		
		jQshareText.attr('src','/static/css/anniversary2/result/final/share3.png');

	}else if(finalLevel==4){
		jQbook.attr('src', '/static/css/anniversary2/icon/book2.png');
		jQbookAnime.addClass('book2-anime');
	    jQgailou.append('<i class="icon12 i-flat-building"></i>');

		jQfinalResult.attr('src', '/static/css/anniversary2/result/final/4.png');
		jQpeople.attr('src', '/static/css/anniversary2/result/final/p22.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car2.png').addClass('car2');
		$(jQxunzhang[0]).addClass('x12');
		$(jQxunzhang[1]).addClass('x22');
		$(jQxunzhang[2]).addClass('x32');
		$(jQxunzhang[3]).addClass('x42');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/2.png');
		jQhwResult.attr('src', '/static/css/anniversary2/result/huawei/2.png');		
		jQshareText.attr('src','/static/css/anniversary2/result/final/share4.png');

	}

}

$(".j-geshou-btn").bind('click', function(){
	$(this).attr('src', "/static/css/anniversary2/icon/button1.png");
	setTimeout(function(){
		levelMusic();		
		$('#gs-metro1').addClass('metro1-anime animated0_7');
		$('#gs-metro2').addClass('metro2-anime animated0_7');
		$('#gs-metro3').addClass('metro3-anime animated0_7');
		$('#gs-metro4').addClass('metro4-anime animated0_7');		
		swiper.slideNext();
	}, 500);
});

// 完成第5关
$("#j-move-stage-5").bind('click', function(){
    currentStage = 5;
    goStage(currentStage);
});

var bookTimer, enterTimer;
$(".book").bind('click', function(){
	levelMusic();
	swiper.slideNext();
	bookTimer = keyframeAnimation('#j-book-anime', 494, 5, 150, 200, false);

	$('#hw-metro1').addClass('metro1-anime animated0_7');
	$('#hw-metro2').addClass('metro2-anime animated0_7');
	$('#hw-metro3').addClass('metro3-anime animated0_7');
	$('#hw-metro4').addClass('metro4-anime animated0_7');		

	if(huaweiLevel==1){
		$(".i-building3").addClass('dropdown animated0_5 delay0_5');
		$(".i-building2").addClass('dropdown animated0_5 delay0_8');
		$(".i-building1").addClass('dropdown animated0_5 delay1');
	}else{
		$(".i-flat-building").addClass('dropdown animated0_5 delay0_5');
	}
});

// 完成第6关
var fireworkTimer1, fireworkTimer2, fireworkTimer3, fireworkTimer4;
$("#j-move-stage-6").bind('click', function(){
    currentStage = 6;
    goStage(currentStage);
	enterTimer = keyframeAnimation('#p14 .shine-lines', 200, 13, 30, 0, true);	
	fireworkTimer1 = keyframeAnimation('#firework1', 300, 20, 60, 1000, true);	
	fireworkTimer2 = keyframeAnimation('#firework2', 300, 20, 70, 2000, true);	
	fireworkTimer3 = keyframeAnimation('#firework3', 300, 20, 40, 3000, true);	

	// fireworkTimer4 = keyframeAnimation('#firework1', 300, 20, 40, 8000, false);	

});

var fmoveon5Timer, amove5Timer;
$("#j-enter").bind('click', function(){
	swiper.slideNext();
	removeAnimation('#firework1', fireworkTimer1);	
	removeAnimation('#firework2', fireworkTimer2);	
	removeAnimation('#firework3', fireworkTimer3);	
	fmoveon5Timer = keyframeAnimation('#j-move-stage-7 .j-fire-moveon', 70, 8, 70, 0, true);
	amove5Timer = keyframeAnimation("#j-move-stage-7 .j-arrow-moveon", 70, 4, 200, 0, true)

	$('.result-car').addClass('car-in animated');
	var jQstars = $('.star-rotate');
	$(jQstars[0]).addClass('star-rotate-anime animated');
	$(jQstars[1]).addClass('star-rotate-anime animated delay2_3');
	$(jQstars[2]).addClass('star-rotate-anime animated1_5');
	$(jQstars[3]).addClass('star-rotate-anime animated delay0_5');
	$(jQstars[4]).addClass('star-rotate-anime animated2 delay0_8');
	$(jQstars[5]).addClass('star-rotate-anime animated1_5');

	$(jQxunzhang[0]).addClass('fadeIn animated delay1');
	$(jQxunzhang[1]).addClass('fadeIn animated delay1_1');
	$(jQxunzhang[2]).addClass('fadeIn animated delay2');
	$(jQxunzhang[3]).addClass('fadeIn animated delay2_1');
	$('.result-text').addClass('fadeIn animated delay3');
	// setTimeout(function(){
	// 	$('.share').show();
	// 	$(".share-light").addClass('flash1 animated0_5');
	// }, 6000);
});


// 游戏逻辑
$("#j-move-stage-7").bind('click', function(){
	swiper.slideNext();
	$(".share-light").addClass('flash1 animated0_5');
});

$("#fill").bind('click', function(){	
	// 隐藏输入框
	$('#user-name').hide();
	$('.input').hide();
	$('#fill').hide();
	// 显示结果
	$('#j-share-text').show();
	// 显示按钮
	$("#j-send-btn").show();
	$("#j-share-btn").show();

});

$("#j-share-btn").bind('click', function(){
	$(".share-light").removeClass('flash1 animated0_5');
	$(".share-light2").show().addClass('flash1 animated0_5');
});
$("#j-send-btn").bind('click', function(){
	$(".share-light").removeClass('flash1 animated0_5');
	$(".share-light2").show().addClass('flash1 animated0_5');
});
