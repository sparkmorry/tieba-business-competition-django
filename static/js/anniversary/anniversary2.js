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
		$("#j-inv-text").addClass('flash animated delay2')
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
var imgClip, imgFace;
imgClip = new Image();
imgClip.src = "/static/css/anniversary2/mask.png";

var drawFace = function(){
	ctx.drawImage(imgClip, 0, 0, 450, 540);
	ctx.globalCompositeOperation = "source-in";
	ctx.drawImage(imgFace, 0, 0, 450, 540);
}

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
    	// jQprevImg.attr('src', this.result).show();
    	imgFace = new Image();
    	imgFace.src = this.result;
    	if(imgFace.complete && imgClip.complete) { //check if image was already loaded by the browser
		   drawFace();
		}else {
		   imgFace.onload = drawFace;
		   imgClip.onload = drawFace;
		}

    	drawFace();

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
	swiper.slideNext();
});

$("#j-retake").bind('click', function(){
	jQcameraInput.click();
});
