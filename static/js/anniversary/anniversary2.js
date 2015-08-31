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

var second = 0, loading=true;
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
		goAnime = keyframeAnimation('.shine-lines', 200, 13, 30, 0, true);	
	}
});

$(".i-go").bind('click', function(){
	swiper.slideNext();
	removeAnimation('.shine-lines', goAnime)	

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
var drawFace = function(){
	ctx.drawImage(imgClip, 0, 0, 450, 580);
	ctx.globalCompositeOperation = "source-in";
	// ctx.drawImage(imgFace, 0, 0, 450, 580);
	ctx.drawImage(imgReader, 0, 0, 450, 580);	
	var img = canvas.toDataURL("image/png"); 
	$("#jd-avatar").attr('src', img);
	return img;
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
    var drawFaceRotate = function(){
    	if(imgReader.width>imgReader.height){
    		imgFace.src = drawRotatedImage(photo, imgReader, 225, 290, 90);
    	}else{
    		imgFace.src = imgReader.src;
    	}
    }
    reader.onload = function(e){
    	// jQprevImg.attr('src', this.result).show();
    	imgReader = new Image();
    	imgReader.src = this.result;
    	// imgFace = new Image();
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
    	$("#j-secury").show();
    	$("#j-retake").show();
    	$("#j-photo").hide();
    }
}
jQcameraInput.bind('change', readFile);
$('#j-photo').bind('click', function(){
	jQcameraInput.click();
});

$("#j-secury").bind('click', function(){
    $(".secury-process").show();
    securyProcess();
    setTimeout(function(){
		swiper.slideNext();
    }, 2000)
});

$("#j-retake").bind('click', function(){
	jQcameraInput.click();
});

$("#j-shot1").bind('click', function(){
	swiper.slideNext();
		$('#metro1').addClass('metro1-anime animated0_7');
		$('#metro2').addClass('metro2-anime animated0_7');
		$('#metro3').addClass('metro3-anime animated0_7');
		$('#metro4').addClass('metro4-anime animated0_7');

});

$("#j-shot2").bind('click', function(){
	swiper.slideNext();
		$('#metro1').addClass('metro1-anime animated0_7');
		$('#metro2').addClass('metro2-anime animated0_7');
		$('#metro3').addClass('metro3-anime animated0_7');
		$('#metro4').addClass('metro4-anime animated0_7');
})

