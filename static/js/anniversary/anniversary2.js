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
var mSwipe = document.getElementById("music-swipecard");

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

//关键帧动画timer
var goAnime, fireAnime;

var p2Animate = function(){
	$("#j-p2-content-wrapper").addClass('movedown')
	fireAnime = keyframeAnimation('#j-fire', 70, 8, 70, 0, true);
	$("#j-ship").addClass('moveright-slow')
	$(".i-sudden").addClass('fadeIn animated delay2')
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
	swiper.slideNext();
	removeAnimation('#p13 .shine-lines', goAnime)	

});

$("#j-planet1").bind('click', function(){
	swiper.slideNext();
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

var fmoveonTimer, amoveTimer;
var shot = function(){
	mLevel.play();
	$('#metro1').addClass('metro1-anime animated0_7');
	$('#metro2').addClass('metro2-anime animated0_7');
	$('#metro3').addClass('metro3-anime animated0_7');
	$('#metro4').addClass('metro4-anime animated0_7');
	fmoveonTimer = keyframeAnimation('#j-fire-moveon', 70, 8, 70, 0, true);
	amoveTimer = keyframeAnimation("#j-arrow-moveon", 70, 4, 200, 0, true)
}

$("#j-shot1").bind('click', function(){
	swiper.slideNext();
	shot();
});

$("#j-shot2").bind('click', function(){
	swiper.slideNext();
	shot();
});

// 关卡切换
var jQarrow = $(".arrow");
var jQlocation = $("#j-location");
var goStage = function(stageNum){
	$("#j-planet1").unbind();
	$('.i-huixing').unbind();
	$('.i-mani').unbind();
	$('.i-gede').unbind();
	$('.i-dawang').unbind();
	$('.i-k').unbind();
	if(stageNum==2){
    	$(".i-huixing-lock").removeClass('i-huixing-lock').addClass('i-huixing');
    	jQarrow.css({'top': '540px'});
    	jQlocation.css({'top': '675px'});
    	$('.i-huixing').bind('click', function(){
    		swiper.slideTo(5);
    	});
	}else if(stageNum==3){
    	$(".i-mani-lock").removeClass('i-mani-lock').addClass('i-mani');
    	jQarrow.css({'top': '300px', 'left': '241px'});
    	jQlocation.css({'top': '365px'});
    	$('.i-mani').bind('click', function(){
    		swiper.slideTo(7);
    	});
	}else if(stageNum==4){
    	$(".i-gede-lock").removeClass('i-gede-lock').addClass('i-gede');
    	jQarrow.attr('src', '/static/css/anniversary2/icon/arrow-down.png')
    	jQarrow.css({'top': '300px', 'left': '582px'});
    	jQlocation.css({'top': '145px', 'left': '443px'});
    	$('.i-gede').bind('click', function(){
    		swiper.slideTo(9);
    	});
	}else if(stageNum==5){
    	$(".i-dawang-lock").removeClass('i-dawang-lock').addClass('i-dawang');
    	jQarrow.css({'top': '600px', 'left': '582px'});
    	jQlocation.css({'top': '390px', 'left': '600px'}); 	
    	// jQlocation.css({'top': '630px', 'left': '440px'});
    	$('.i-dawang').bind('click', function(){
    		swiper.slideTo(11);
    	});
	}else if(stageNum==6){
    	$(".i-k-lock").removeClass('i-k-lock').addClass('i-k');
    	jQarrow.css({'top': '800px', 'left': '344px'});
    	jQlocation.css({'top': '630px', 'left': '440px'});
    	$('.i-k').bind('click', function(){
    		mBg.pause();
			mParty.play();
    		swiper.slideTo(13);
    	});
	}

}
// 安检完成
$("#j-secury").bind('click', function(){
    $(".secury-process").show();
    securyProcess();
    currentStage = 2;
    setTimeout(function(){
    	goStage(currentStage);
		swiper.slideTo(3);
    }, 2000)
});

// 完成第三关
$("#j-move-stage-3").bind('click', function(){
    currentStage = 3;
    goStage(currentStage);
	swiper.slideTo(3);
});

touch.on('#j-swipe-card', 'touchstart', function(ev){
	ev.preventDefault();
});
var target = document.getElementById("j-swipe-card");

var fmoveon4Timer, amoveon4Timer;

var swipe = function(){
	$(target).css({'-webkit-transform': 'translateX(250px)'});	
	fmoveon4Timer = keyframeAnimation('#j-move-stage-4 .j-fire-moveon', 70, 8, 70, 0, true);
	amove4Timer = keyframeAnimation("#j-move-stage-4 .j-arrow-moveon", 70, 4, 200, 0, true)
	setTimeout(function(){
		mLevel.play();
		$('#zx-metro1').addClass('metro1-anime animated0_7');
		$('#zx-metro2').addClass('metro2-anime animated0_7');
		$('#zx-metro3').addClass('metro3-anime animated0_7');
		$('#zx-metro4').addClass('metro4-anime animated0_7');
		swiper.slideTo(8);
    }, 1500);
}
touch.on(target, 'swiperight', function(ev){
	swipe();
});

// 完成第四关
$("#j-move-stage-4").bind('click', function(){
    currentStage = 4;
    goStage(currentStage);
	swiper.slideTo(3);
});

$(".j-geshou-btn").bind('click', function(){
	$(this).attr('src', "/static/css/anniversary2/icon/button1.png");
	setTimeout(function(){
		mLevel.play();
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
	swiper.slideTo(3);
});

var bookTimer, enterTimer;
$(".book").bind('click', function(){
	mLevel.play();
	swiper.slideNext();
	bookTimer = keyframeAnimation('#j-book-anime', 494, 5, 150, 200, false);

	$('#hw-metro1').addClass('metro1-anime animated0_7');
	$('#hw-metro2').addClass('metro2-anime animated0_7');
	$('#hw-metro3').addClass('metro3-anime animated0_7');
	$('#hw-metro4').addClass('metro4-anime animated0_7');		

	$(".i-building3").addClass('dropdown animated0_5 delay0_5');
	$(".i-building2").addClass('dropdown animated0_5 delay0_8');
	$(".i-building1").addClass('dropdown animated0_5 delay1');
});

// 完成第6关
$("#j-move-stage-6").bind('click', function(){
    currentStage = 6;
    goStage(currentStage);
	swiper.slideTo(3);
	enterTimer = keyframeAnimation('#p14 .shine-lines', 200, 13, 30, 0, true);	

});

$("#j-enter").bind('click', function(){
	swiper.slideNext();
})


