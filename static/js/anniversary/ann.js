var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	speed: 0,
	onlyExternal: true,
	onSlideChangeStart: function(swiper){
		var dom = $('.swiper-slide')[swiper.activeIndex];
		var domPrev = $('.swiper-slide')[swiper.activeIndex-1];
		domPrev.style.opacity = 0;
		dom.style.opacity = 1;

		if(swiper.activeIndex == 5){
			$('#p8').css('background-image', 'url("http://morry.oss-cn-beijing.aliyuncs.com/tieba/css/anniversary/bg/p8.png?v=1.1")');
		}else if(swiper.activeIndex == 10){
			$('#p15').css('background-image', 'url("/static/css/anniversary2/bg/p15.png?v=1.1")');
			$(".xunzhang").css('background-image', 'url("/static/css/anniversary2/icon/icon15.png?v=1.1")');
			$(".star-rotate").css('background-image', 'url("/static/css/anniversary2/icon/icon15.png?v=1.1")');
		}
	}

});	

$('body').bind('touchmove',function(event){
	event.preventDefault();
});

var mBg;
var musicPlay=true;
var inParty=false;

var audio0 = document.getElementById("audio1");
audio0.play();
$("#audio_pan").click(function() {
    audio1 = document.getElementById("audio1");
    stats = audio1.paused;

  if (stats == true) {
        audio1.play();
        $("#audio_pan").removeClass("m_off");
        $("#audio_pan").addClass("music-status-on");    
    }
    if (stats == false) {  
        audio1.pause();
        $("#audio_pan").addClass("m_off"); 
        $("#audio_pan").removeClass("music-status-on"); 
    }
});

var mLevel;
var levelupMusic = function(){
	mLevel = new Audio();
	mLevel.src="/media/anniversary/levelup.mp3"	
}



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

var levelMusic=function(){
	if(!mLevel){
		levelupMusic();
	}
	mLevel.play();
}

var p2Animate = function(){
	var goAnime;
	swiper.slideNext();
	$(".i-invitation").addClass('rollIn animated');
	$("#j-inv-text").addClass('flash animated delay1');
	setTimeout(function(){
		$("#j-go").show();
		goAnime = keyframeAnimation('#p3 .shine-lines', 200, 13, 30, 0, true);	
	}, 2000);
}


//关键帧动画timer
var fireAnime;

var p3Animate = function(){
	swiper.slideNext();
	$("#j-p2-content-wrapper").addClass('movedown')
	fireAnime = keyframeAnimation('#j-fire', 70, 8, 70, 0, true);
	$("#j-ship").addClass('moveright-slow')
	$(".sudden").addClass('fadeIn animated delay1');
	$("#p1").css('background', 'transparent').empty();
    setTimeout(function(){
    	goStage(1);
    }, 7000);
}

var second = 0, loadingAnime;
var secondNum = $("#loading-num");
$(window).load(function(){
	var timer = setInterval(function(){
		second = second+2;
		if(second>100){
			p2Animate();
			second = 0;
			clearInterval(timer);
			return;
		}
		secondNum.text(second);
	}, 40);
	$('.diaosi').addClass('fadeOut animated delay0_5');
	$('.i-superman').addClass('fadeIn animated delay1');
});

var jQinvText=$("#j-inv-text");

$(".i-go").bind('click', function(){
	p3Animate();
});
var arrowTimer;
var aCount = 0;
var securyProcess = function(){
	imgReader = null;
	imgClip = null;
	imgFace = null;
	var sArrow = $(".i-secury-arrow");
	arrowTimer = setInterval(function(){
		if(aCount==10){
			clearInterval(arrowTimer);
    		anjianLevel = parseInt(Math.random()*2)+1;
    		if(anjianLevel==1){
				$("#p5").append('<img class="anjian-result" src="/static/css/anniversary2/result/mapr/a1.png">')
			}else{
				$("#p5").append('<img class="anjian-result" src="/static/css/anniversary2/result/mapr/a2.png">')
			}
	    	$("#j-secury").hide();
	    	$("#j-retake").hide();

			aCount=0;
			return;
		}
		$(sArrow[aCount]).removeClass('i-secury-arrow').addClass('i-secury-arrow-ok');
		aCount++;
	},200);
}


var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var imgClip, imgFace, imgReader;
imgClip = new Image();
imgClip.src = "/static/css/anniversary2/mask.png";

var TO_RADIANS = Math.PI/180; 
var photo=document.getElementById("photo");

function drawRotatedImage(cvs, image, angle) { 
	var w = image.width, h=image.height; //此时应该肯定是竖构图
	var wToDraw, hToDraw;
	wToDraw = 450;
	hToDraw = (w/h)*wToDraw;
	cvs.width = wToDraw;
	cvs.height = hToDraw;

	var context=cvs.getContext("2d");

	context.save(); 
	context.translate(wToDraw/2, hToDraw/2);
	context.rotate(angle * TO_RADIANS);
	context.drawImage(image, -hToDraw/2, -wToDraw/2, hToDraw, wToDraw);
	context.rotate(-angle * TO_RADIANS);
	context.translate(-wToDraw/2, -hToDraw/2);
	context.restore(); 
	var img = cvs.toDataURL("image/jpeg", 0.5); 

	return img;
}
var drawFaceRotate = function(){
	if(imgReader.width>imgReader.height){
		imgFace.src = drawRotatedImage(photo, imgReader, 90);
	}else{
		imgFace.src = imgReader.src;
	}
}
var faceImg;
var drawFace = function(){
	drawFaceRotate();
	ctx.drawImage(imgClip, 0, 0, 450, 580);
	ctx.globalCompositeOperation = "source-in";
	imgFace.onload = function(){
		var w = imgFace.width, h=imgFace.height; //此时应该肯定是竖构图
		var wToDraw, hToDraw, leftCo;
		wToDraw = w;
		hToDraw = (580/450)*wToDraw;
		if(h<hToDraw){
			hToDraw=h;
			wToDraw = 450/580*hToDraw;
			leftCo = (w - wToDraw)/2;
			ctx.drawImage(imgFace, leftCo, 0, wToDraw, hToDraw, 0, 0, 450, 580);	
		}else{
			ctx.drawImage(imgFace, 0, 0, wToDraw, hToDraw, 0, 0, 450, 580);	
		}

		faceImg = canvas.toDataURL("image/png", 0.5); 
    	$("#j-secury").show();
    	$("#j-retake").show();
    	$("#j-photo").hide();	

	}
}



var jQcameraInput = $('#cameraInput');
var jQprevImg = $(".uploaded-img");
var avatar;
function readFile(){
    var file = jQcameraInput.get(0).files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("请上传图片类型的文件~");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
    	imgReader = new Image();
    	imgReader.src = this.result;
    	imgFace = new Image();
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

var shot = function(shotNum){
	jingdongLevel=shotNum;
	// jingdongLevel = parseInt(Math.random()*2)+1;
	levelMusic();	
	$('#jd-round').addClass("rotate360 animated5");
	$("#p7 .shink1").addClass('star-shink1');
	$("#p7 .shink2").addClass('star-shink1');
	
	$('#metro1').addClass('metro1-anime animated0_7');
	$('#metro2').addClass('metro2-anime animated0_7');
	$('#metro3').addClass('metro3-anime animated0_7');
	$('#metro4').addClass('metro4-anime animated0_7');

	$("#jd-avatar").attr('src', faceImg);
	if(jingdongLevel==1){
		jQjdResult.attr('src', '/static/css/anniversary2/result/jingdong/1.png?v=1.5');
    	jQmapTip.removeClass('map-tip1').addClass('map-tip2').attr('src', 'http://morry.oss-cn-beijing.aliyuncs.com/tieba/css/anniversary/result/map/jingdong/1.png');

	}else{
		jQjdResult.attr('src', '/static/css/anniversary2/result/jingdong/2.png?v=1.5');
    	jQmapTip.removeClass('map-tip1').addClass('map-tip2').attr('src', 'http://morry.oss-cn-beijing.aliyuncs.com/tieba/css/anniversary/result/map/jingdong/2.png');

	}
	swiper.slideNext();
}

// var gameResult=function(){
//     anjianLevel = parseInt(Math.random()*2)+1;


// }

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
		if(!jQsale.data('click')){
			jQsale.addClass('i-sale-small').removeClass('i-sale-big')
		.css({'left': left+'px'} );

		}
	}, delay+1200);
}
var luckyTimes=0;
touch.on('#p6', 'tap','.i-sale-big', function(){
	// alert("ab");
	$(this).addClass('shot-scale animated0_7').data('click', true);
	luckyTimes++;
});

var fireworkTimer1, fireworkTimer2, fireworkTimer3, fireworkTimer4;

var goStage = function(stageNum){
	$("#j-planet1").unbind();
	$('.i-huixing').unbind();
	$('.i-mani').unbind();
	$('.i-gede').unbind();
	$('.i-dawang').unbind();
	$('.i-k').unbind();
	jQarrow.addClass('flash animated delay0_8');
	if(stageNum==1){	
    	// jQarrow.addClass('flash animated');
    	$('.i-cloud2').addClass("moverightback-slow");

		$("#j-planet1").bind('click', function(){
			jQarrow.removeClass("flash animated delay0_8");
			swiper.slideNext();
		});
	}else if(stageNum==2){
    	$(".i-huixing-lock").removeClass('i-huixing-lock').addClass('i-huixing');
    	jQarrow.css({'top': '385px', 'left':'315px'});
    	jQlocation.css({'top': '675px'});
    	// 文案显示
    	if(anjianLevel==1){
    		jQmapTip.show().addClass('map-tip1').attr('src', '/static/css/anniversary2/result/mapr/j1.png');
    	}else{
			jQmapTip.show().addClass('map-tip1').attr('src', '/static/css/anniversary2/result/mapr/j2.png');
    	}	
    	$('.i-huixing').bind('click', function(){
    		// 清空安检
			$("#p5").css('background', 'transparent').empty();
			// $(".i-jingdonghao-light").addClass("flash animated3");
			$(".i-jingdonghao").addClass("floating animated3");
			$(".i-jingdonghao-light").addClass("flash animated3");

			jQarrow.removeClass("flash animated delay0_8");

    		swiper.slideTo(5);
    		//todo:敲松鼠游戏
    		touch.on('.lucky', 'tap',function(){
    			$(this).hide();
	    		game(1, 600);
	    		game(3, 2100);
	    		game(2, 3600);
	    		game(6, 5100);
	    		setTimeout(function(){
	    			if(luckyTimes>2){
	    				shot(1);
	    			}else{
	    				shot(2);
	    			}
	    		}, 6000);
    		});
    	});    	
	}else if(stageNum==3){
    	$(".i-mani-lock").removeClass('i-mani-lock').addClass('i-mani');
    	jQarrow.addClass('flash animated').css({'top': '250px', 'left': '645px'});
    	jQlocation.css({'top': '275px','left':'260px'});
    	if(jingdongLevel==1){
    		jQmapTip.show().removeClass('map-tip1').addClass('map-tip2').attr('src', '/static/css/anniversary2/result/mapr/z1.png');
    	}else{
			jQmapTip.show().removeClass('map-tip1').addClass('map-tip2').attr('src', '/static/css/anniversary2/result/mapr/z2.png');
    	}	
    	$('.i-mani').bind('click', function(){
    		// 清空京东
			$("#p6").css('background', 'transparent').empty();
			$("#p7").css('background', 'transparent').empty();
			$(".i-car").addClass('floating animated5');
			$(".i-wajue").addClass('floating animated5');
			// $(".i-saoba").addClass('floating animated7');
			$(".i-huojian").addClass('floating animated4');
			// $(".i-qiqiu").addClass('floating animated6');
			$("#p8 .i-needle1").addClass("needle1-anime");
			$("#p8 .i-needle2").addClass("needle2-anime");
			$(".i-card-arrow").addClass("moveright-slow animated1_5");
			// $(".i-card-arrow-reverse").addClass("moveleft-slow animated1_5");
			jQarrow.removeClass("flash animated delay0_8");

			// jQcardArrow.hide().removeClass('moveright-slow animated1_5');
    		swiper.slideTo(7);
    	});
	}else if(stageNum==4){
    	$(".i-gede-lock").removeClass('i-gede-lock').addClass('i-gede');
    	jQarrow.css({'top': '700px', 'left': '645px'});
    	jQlocation.css({'top': '140px', 'left': '595px'});
    	$('.i-gede').bind('click', function(){
    				// 清空京东
			$("#p8").css('background-image', 'transparent').empty();
			$("#p9").css('background-image', 'transparent').empty();
			$(".geshou-light1").addClass("flash1 animated1_5");
			$(".geshou-light2").addClass("flash2 animated1_5");

			// $("#p10 i-needle1").addClass('needle1-anime');
			// $("#p10 i-needle2").addClass('needle2-anime');

			showFinal(jingdongLevel, zhongxinLevel);
			jQarrow.removeClass("flash animated delay0_8");

    		swiper.slideTo(9);
    	});
    	jQmapTip.removeClass('map-tip2').addClass('map-tip3').attr('src', '/static/css/anniversary2/result/mapr/g1.png');

  	
	}else if(stageNum==5){
    	$(".i-k-lock").removeClass('i-k-lock').addClass('i-k');
    	jQarrow.css({'top': '1000px', 'left': '590px'});
    	jQlocation.css({'top': '610px', 'left': '600px'});
    	jQmapTip.removeClass('map-tip3').addClass('map-tip4').attr('src', '/static/css/anniversary2/result/mapr/t1.png');

    	$('.i-k').bind('click', function(){
			jQarrow.removeClass("flash animated delay0_8");
    		swiper.slideTo(11);
    	});
	}	
	swiper.slideTo(3);
}
// 安检完成
$("#j-secury").bind('click', function(){
    $(".secury-process").show();
    securyProcess();
		$("#p2").css('background', 'transparent').empty();
		$("#p3").css('background', 'transparent').empty();
    currentStage = 2;
    setTimeout(function(){
    	goStage(currentStage);
    }, 4000)
});

// 完成第三关
touch.on('#p7', 'tap', '#j-move-stage-3', function(ev){
    currentStage = 3;
    goStage(currentStage);
});

// 完成第四关中信
touch.on('#j-move-stage-4', 'tap',  function(ev){
    currentStage = 4;
    goStage(currentStage);
});

var target = document.getElementById("j-swipe-card");

var swipeResult = function(){

	setTimeout(function(){
		if(swiperTime>13){
			zhongxinLevel=1;
			jQzxResult.attr('src', '/static/css/anniversary2/result/zhongxin/1.png?v=1.1');

		}else{
			zhongxinLevel=2;
			jQzxResult.attr('src', '/static/css/anniversary2/result/zhongxin/2.png?v=1.1');
		}
		levelMusic();
		$('#zx-round').addClass("rotate360 animated5");
		$("#p9 .shink1").addClass('star-shink1');
		$("#p9 .shink2").addClass('star-shink1');

		$('#zx-metro1').addClass('metro1-anime animated0_7');
		$('#zx-metro2').addClass('metro2-anime animated0_7');
		$('#zx-metro3').addClass('metro3-anime animated0_7');
		$('#zx-metro4').addClass('metro4-anime animated0_7');
		swiper.slideTo(8);
    }, 2000);
}

touch.on('#j-swipe-card', 'touchstart', function(ev){
	ev.preventDefault();
});
var swipeStart=false;
touch.on('#j-swipe-btn', 'tap', function(ev){
	$(this).hide();
	swipeResult();
	swipeStart=true;

});

var dx, dy, swiperTime=0;
var jQmoney = $("#money");

touch.on('#j-swipe-card', 'drag', function(ev){
	if(swipeStart){
		dx = dx || 0;
		dy = dy || 0;
		// log("当前x值为:" + dx + ", 当前y值为:" + dy +".");
		var offx = dx + ev.x;
		// console.log(offx);
		if(Math.abs(offx)>200){
			if(swipeStart){
				swiperTime++;
				jQmoney.text(swiperTime*500);
			}

		}
		this.style.webkitTransform = "translate3d(" + offx + "px, 0,0)";
	}
});

touch.on('#j-swipe-card', 'dragend', function(ev){
	if(swipeStart){
		dx += ev.x;
		dy += ev.y;
	}	
});


var finalMsg = '';
var showFinal=function(jingdongLevel, zhongxinLevel){
	if(jingdongLevel==1 && zhongxinLevel==1){
		// 潮金 土豪明星 杀千陌
		geshouLevel = 1; //星
		huaweiLevel=1; //火
		finalLevel=1;
		finalMsg = '鸿运当头，居然在贴吧获得百万粉丝“盖楼”应援，被封为"最闪耀明星"';
	}else if(jingdongLevel==1 && zhongxinLevel==2){
		// 潮挖 接地气的明星
		geshouLevel = 1;
		huaweiLevel = 1;
		finalLevel=2;
		finalMsg = '否极泰来，居然在贴吧开走了蓝翔高级挖掘机，被封为“最原生态明星”';
		
	}else if(jingdongLevel==2 && zhongxinLevel==1){
		// 好金 土豪粉丝
		geshouLevel = 2; //粉
		huaweiLevel=2; //沉
		finalLevel=3;
		finalMsg = '时来运转，居然在贴吧赢得了一辆豪华小跑，被封为"最土豪粉丝"';

	}else if(jingdongLevel==2 && zhongxinLevel==2){
		// 好挖 赤诚
		geshouLevel = 2;
		huaweiLevel=2; //沉
		finalLevel=4;
		finalMsg = '顺水顺风，居然在贴吧获得偶像自传《落选之后》，被封为“最挽尊粉丝”';

	}

	if(finalLevel==1){
		$(jQxunzhang[0]).addClass('x11');
		$(jQxunzhang[1]).addClass('x21');
		$(jQxunzhang[2]).addClass('x31');

		jQpeople.attr('src', '/static/css/anniversary2/result/final/p11.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car1.png');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/1.png?v=1.5');
		jQshareText.attr('src','/static/css/anniversary2/result/final/1.png?v=1.1');

	}else if(finalLevel==2){
		jQpeople.attr('src', '/static/css/anniversary2/result/final/p11.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car2.png').addClass('car2');
		$(jQxunzhang[0]).addClass('x11');
		$(jQxunzhang[1]).addClass('x22');
		$(jQxunzhang[2]).addClass('x31');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/1.png?v=1.5');
		jQshareText.attr('src','/static/css/anniversary2/result/final/2.png?v=1.1');

	}else if(finalLevel==3){
		// 好金 土豪粉丝
		jQpeople.attr('src', '/static/css/anniversary2/result/final/p22.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car1.png');
		$(jQxunzhang[0]).addClass('x12');
		$(jQxunzhang[1]).addClass('x21');
		$(jQxunzhang[2]).addClass('x32');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/2.png?v=1.5');
		jQshareText.attr('src','/static/css/anniversary2/result/final/3.png?v=1.1');

	}else if(finalLevel==4){
		jQpeople.attr('src', '/static/css/anniversary2/result/final/p22.png');
		jQcar.attr('src', '/static/css/anniversary2/result/final/car2.png').addClass('car2');
		$(jQxunzhang[0]).addClass('x12');
		$(jQxunzhang[1]).addClass('x22');
		$(jQxunzhang[2]).addClass('x32');
		jQgsResult.attr('src', '/static/css/anniversary2/result/geshou/2.png?v=1.5');
		jQshareText.attr('src','/static/css/anniversary2/result/final/4.png?v=1.1');
	}
	jQfinalResult.attr('src', '/static/css/anniversary2/result/final/final2.png');

}

$(".j-geshou-btn").bind('click', function(){
	$(this).attr('src', "/static/css/anniversary2/icon/button1.png");
	setTimeout(function(){
		levelMusic();		
		$('#gs-metro1').addClass('metro1-anime animated0_7');
		$('#gs-metro2').addClass('metro2-anime animated0_7');
		$('#gs-metro3').addClass('metro3-anime animated0_7');
		$('#gs-metro4').addClass('metro4-anime animated0_7');		
		$("#gs-round").addClass("rotate360 animated5");
		swiper.slideNext();
	}, 500);
});

// 完成第5关我事歌手
touch.on('#p11', 'tap', '#j-move-stage-5', function(ev){
    currentStage = 5;
    goStage(currentStage);
	enterTimer = keyframeAnimation('#p14 .shine-lines', 200, 13, 30, 0, true);	
	fireworkTimer1 = keyframeAnimation('#firework1', 300, 20, 60, 1000, true);	
	fireworkTimer2 = keyframeAnimation('#firework2', 300, 20, 70, 2000, true);	
	fireworkTimer3 = keyframeAnimation('#firework3', 300, 20, 40, 3000, true);	
});


$("#j-enter").bind('click', function(){
	$("#p4").empty();
	$('#p16').css('background-image', 'url("/static/css/anniversary2/bg/p16n.jpg?v=1.2")');
	$('#p17').css('background-image', 'url("/static/css/anniversary2/bg/p17.jpg?v=1.2")');

	swiper.slideNext();
	removeAnimation('#firework1', fireworkTimer1);	
	removeAnimation('#firework2', fireworkTimer2);	
	removeAnimation('#firework3', fireworkTimer3);	
	$('.result-car').addClass('car-in animated');
	$("#final-avatar").attr('src', faceImg);
	var jQstars = $('.star-rotate');
	$(jQstars[0]).addClass('star-rotate-anime animated');
	$(jQstars[1]).addClass('star-rotate-anime animated delay2_3');
	$(jQstars[2]).addClass('star-rotate-anime animated1_5');
	$(jQstars[3]).addClass('star-rotate-anime animated delay0_5');

	$(jQxunzhang[0]).addClass('fadeIn animated delay1');
	$(jQxunzhang[1]).addClass('fadeIn animated delay1_1');
	$(jQxunzhang[2]).addClass('fadeIn animated delay2');
	$('.result-text').addClass('fadeIn animated delay2_1');
});


// 游戏逻辑
touch.on('#p15', 'tap', function(ev){
	swiper.slideNext();
	$("#p14").css('background-image', 'transparent').empty();
	$(".share-light").addClass('flash1 animated0_5');
});

var finalMsg2 = '';
$("#fill").bind('click', function(){	
	$("#p15").empty();
	if( $(".share").length<=0 ){
		$("#p17").append('<img class="share" src="/static/css/anniversary2/bg/share.png?v=1.2">');
	}
	var usrName = $('#user-name').val();
	finalMsg = usrName+finalMsg;
	finalMsg2 = usrName+'和ta发生亲密关系后，整个人居然变成了这样！'
	wx.onMenuShareAppMessage({		    
		title: '那一夜我上了ta，之后的人生…', // 分享标题
	    link: 'http://h5.ssld-vi.com/tieba/ann', // 分享链接		
	    imgUrl: 'http://7xjv0c.com1.z0.glb.clouddn.com/cover2.jpg' ,  
	    desc: finalMsg,
	});	
	swiper.slideNext();
});

$("#j-share-btn").bind('click', function(){
	$("#p16").css('background-image', 'transparent').empty();
	$(".share").show();
});

touch.on('body', 'tap', '.share', function(){
	$(".share").hide();
})
