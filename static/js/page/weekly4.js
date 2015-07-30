var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	speed: 600,
	moveStartThreshold:500,
	// loop: true,
	onlyExternal: true
});
$('body').bind('touchmove',function(event){
	event.preventDefault();
});
var p1complete = false, p2complete = false, p3complete = false, 
	p4complete = false, p5complete = false, p6complete = false;
	p7complete = false, p8complete = false, p9complete = false;
var t1 = document.querySelector('#p1 .i-to-go'); 
t1.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p1complete=true;
}, false);  

var t2 = document.querySelector('#p2 .i-to-go-white'); 
t2.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p2complete=true;
}, false);  

var t3 = document.querySelector('#p3 .i-to-go-white'); 
t3.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p3complete=true;
}, false);  

var t4 = document.querySelector('#p4 .i-to-go-white'); 
t4.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p4complete=true;
}, false);  
var t5 = document.querySelector('#p5 .i-to-go-white'); 
t5.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p5complete=true;
}, false);  
var t6 = document.querySelector('#p6 .i-to-go-white'); 
t6.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p6complete=true;
}, false);  
var t7 = document.querySelector('#p7 .i-to-go-white'); 
t7.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p7complete=true;
}, false);  
var t8 = document.querySelector('#p8 .i-to-go-white'); 
t8.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p8complete=true;
}, false);  
var t9 = document.querySelector('#p9 .i-to-go-white'); 
t9.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	p9complete=true;
}, false);  
var second = 50, loading=true;
var secondNum = $("#loading-num");
$(window).load(function(){
	var timer = setInterval(function(){
		second = second+2;
		if(second>100){
			loading=false;
			// swiper.slideNext();	
			p1Animate();
			second = 0;
			clearInterval(timer);
			return;
		}
		secondNum.text(second);
	}, 20);
	$(".decr").addClass("fadeInUp animated");
	$("#p1 .decr").removeClass("hide").addClass("show");
	// var video = '<iframe frameborder="0" id="video" width="640" height="498" src="http://v.qq.com/iframe/player.html?vid=m0158m3zemm&tiny=0&auto=0" allowfullscreen></iframe>';
	var video = '<iframe frameborder="0" width="640" height="498" id="video" src="http://v.qq.com/iframe/player.html?vid=a0160x52yt5&tiny=0&auto=0" allowfullscreen></iframe>';
	$("#videotion").append(video);
});
function p1Animate(){
	$(".loading-text").addClass('fadeOut animated');
	setTimeout(function(){
		$(".i-logo").removeClass("hide").addClass("show");
	}, 500);
	$(".i-logo").addClass('tada animated delay0_1');
	$(".i-logo-text").addClass('fadeIn animated delay1');
	$(".i-title").addClass('bounceIn animated delay2');
	$(".i-p1-title-text1").removeClass("hide").addClass('show zoomInLeft animated1 delay2_1');
	$(".i-p1-title-text2").addClass('fadeInUp animated delay3_1');
	$(".i-p1-title-text3").addClass('fadeInUp animated delay4_1');
	$("#p1 .i-to-go").addClass('fadeIn animated delay5');
}
function p1removeAnimate(){
	$(".i-logo").removeClass('tada animated delay0_1');
	$(".i-logo-text").removeClass('fadeIn animated delay1');
	$(".i-title").removeClass('bounceIn animated delay2');
	$(".i-p1-title-text1").removeClass('zoomInLeft animated1 delay2_1');
	$(".i-p1-title-text2").removeClass('fadeInUp animated delay3_1');
	$(".i-p1-title-text3").removeClass('fadeInUp animated delay4_1');
	$("#p1 .i-to-go").removeClass('fadeIn animated delay5');
	if($("#video").length==0){
		var video = '<iframe frameborder="0" width="640" height="498" src="http://v.qq.com/iframe/player.html?vid=a0160x52yt5&tiny=0&auto=0" allowfullscreen id="video"></iframe>  ';
		$("#videotion").append(video);
	}
	p1complete = false;
}
function p2Animate(){
	$(".i-p5-title").addClass('bounceInDown animated0_8 delay0_1');
	$(".i-p5-w2-text1").addClass('fadeIn animated0_5 delay1_1');
	$(".i-p5-w2-text2").addClass('fadeIn animated0_5 delay2_3');
	$(".i-p5-text4").addClass('fadeIn animated0_8 delay3');
	$(".i-p5-w2-text5").addClass('fadeIn animated0_8 delay3_1');
	setTimeout(function(){
		$(".i-crown").removeClass("hide").addClass("show");
	}, 3800)
	$(".i-crown").addClass('wobble animated delay4');
	$("#p2 .i-to-go-white").addClass('fadeIn animated delay4_1');
}
function p2RemoveAnimate(){
	$(".i-p5-title").removeClass('bounceInDown animated0_8 delay0_1');
	$(".i-p5-w2-text1").removeClass('fadeIn animated0_5 delay1_1');
	$(".i-p5-w2-text2").removeClass('fadeIn animated0_5 delay2_3');
	$(".i-p5-text4").removeClass('fadeIn animated0_8 delay3');
	$(".i-p5-w2-text5").removeClass('fadeIn animated0_8 delay3_1');
	$("#p2 .i-to-go-white").removeClass('fadeIn animated0_8 delay5_1');
	// p5complete = false;
}
function p3Animate(){
	$(".i-p2-title").addClass('bounceInDown animated0_8 delay0_1');
	$(".i-p2-title-text1").addClass('fadeIn animated0_5 delay1_3');
	$(".i-p2-title-text2").addClass('fadeIn animated0_5 delay2');
	$("#videotion").addClass('fadeIn animated delay2_1');
	$("#p3 .i-to-go-white").addClass('fadeIn animated delay3');

}
function p3RemoveAnimate(){	
	$(".i-p2-title").removeClass('fadeIn animated0_8 delay0_1');
	$(".i-p2-title-text1").removeClass('fadeIn animated0_5 delay1_3');
	$(".i-p2-title-text2").removeClass('fadeIn animated0_5 delay2');
	$("#videotion").removeClass('fadeIn animated delay2_1');
	$("#p3 .i-to-go-white").removeClass('fadeIn animated delay3');
	$("#video").remove();
	p2complete = false;
}
function p4Animate(){
	// var svg = '	<svg class="process-line-svg"  xmlns="http://www.w3.org/2000/svg" version="1.1" height="1205" width="750">'+
 //  			  '		<path id="process-line" stroke-dashoffset="1830" stroke-dasharray="1830 0" d="M670 10 L670 120 L240 120 L240 1000 L35 1000 L35 1205" stroke="#fff" stroke-width="10" fill="none"></path>'+
 //  			  '	</svg>	';
 //  	$("#p3").append(svg);
	// var path = document.querySelector('.process-line-svg path');
	// var length = path.getTotalLength();
	// // 清除之前的动作
	// path.style.transition = path.style.WebkitTransition =
	//   'none';
	// // 设置起始点
	// path.style.strokeDasharray = length + ' ' + length;
	// path.style.strokeDashoffset = length;
	// // 获取一个区域，获取相关的样式，让浏览器寻找一个起始点。
	// path.getBoundingClientRect();
	// // 定义动作
	// path.style.transition = path.style.WebkitTransition =
	//   'stroke-dashoffset 2s ease-in-out';
	// // Go!
	// path.style.strokeDashoffset = '0';
	$(".i-process1").addClass('fadeIn animated delay0_1');
	$(".i-process2").addClass('fadeIn animated delay1');
	$(".i-process3").addClass('fadeIn animated delay1_1');
	$(".i-process4").addClass('fadeIn animated delay2');
	$("#p4 .i-to-go-white").addClass('fadeIn animated delay2_1');
}
function p4RemoveAnimate(){
	$(".i-process1").removeClass('fadeIn animated delay0_1');
	$(".i-process2").removeClass('fadeIn animated delay1');
	$(".i-process3").removeClass('fadeIn animated delay1_1');
	$(".i-process4").removeClass('fadeIn animated delay2');
	$("#p4 .i-to-go-white").removeClass('fadeIn animated delay2_1');
	p3complete = false;
}

function p5Animate(){
	$(".i-comment1").addClass('fadeIn animated delay0_1');
	$(".i-tutor1").addClass('fadeIn animated delay1');
	$(".i-dialog1").addClass('fadeIn animated delay1_1');
	$(".i-group1").addClass('fadeIn animated delay2');

	$(".i-comment2").addClass('fadeIn animated delay2_1');
	$(".i-tutor2").addClass('fadeIn animated delay3');
	$(".i-dialog2").addClass('fadeIn animated delay3_1');
	$(".i-group2").addClass('fadeIn animated delay4');

	$(".i-comment3").addClass('fadeIn animated delay4_1');
	$(".i-tutor3").addClass('fadeIn animated delay5');
	$(".i-dialog3").addClass('fadeIn animated delay5_1');
	$(".i-group3").addClass('fadeIn animated delay6');

	$(".i-comment4").addClass('fadeIn animated delay6_1');
	$(".i-tutor4").addClass('fadeIn animated delay7');
	$(".i-dialog4").addClass('fadeIn animated delay7_1');
	$(".i-group4").addClass('fadeIn animated delay8');
	$("#p5 .i-to-go-white").addClass('fadeIn animated delay8_1');

}
function p5RemoveAnimate(){
	$(".i-comment1").removeClass('fadeIn animated delay0_1');
	$(".i-tutor1").removeClass('fadeIn animated delay1');
	$(".i-dialog1").removeClass('fadeIn animated delay1_1');
	$(".i-group1").removeClass('fadeIn animated delay2');

	$(".i-comment2").removeClass('fadeIn animated delay2_1');
	$(".i-tutor2").removeClass('fadeIn animated delay3');
	$(".i-dialog2").removeClass('fadeIn animated delay3_1');
	$(".i-group2").removeClass('fadeIn animated delay4');

	$(".i-comment3").removeClass('fadeIn animated delay4_1');
	$(".i-tutor3").removeClass('fadeIn animated delay5');
	$(".i-dialog3").removeClass('fadeIn animated delay5_1');
	$(".i-group3").removeClass('fadeIn animated delay6');

	$(".i-comment4").removeClass('fadeIn animated delay6_1');
	$(".i-tutor4").removeClass('fadeIn animated delay7');
	$(".i-dialog4").removeClass('fadeIn animated delay7_1');
	$(".i-group4").removeClass('fadeIn animated delay8');
	$("#p5 .i-to-go-white").removeClass('fadeIn animated delay8_1');
	p4complete = false;
}

function animateStar(pageNum, starCount){
	setTimeout(function(){
		var i=0;
		var jQpage = $("#p"+pageNum);
		function star()
		{   
		   if(i<starCount) setTimeout(function(){
		     jQpage.find(".i-star-white:eq(0)").removeClass("i-star-white").addClass("i-star-yellow");
		     star();
		   },250);
		   i++;		   	
		}
		star();
	}, 4900);
};

function animateStar1(pageNum, taskNum, starCount){
	setTimeout(function(){
		var i=0;
		var jQpage = $("#p"+pageNum+' .task'+taskNum);
		function star()
		{   
		   if(i<starCount) setTimeout(function(){
		     jQpage.find(".i-star-white:eq(0)").removeClass("i-star-white").addClass("i-star-yellow");
		     star();
		   },250);
		   i++;		   	
		}
		star();
	}, 4900);
};
function animateStar2(pageNum, taskNum, starCount){
	setTimeout(function(){
		var i=0;
		var jQpage = $("#p"+pageNum+' .task'+taskNum);
		function star()
		{   
		   if(i<starCount) setTimeout(function(){
		     jQpage.find(".i-star-white:eq(0)").removeClass("i-star-white").addClass("i-star-yellow");
		     star();
		   },250);
		   i++;		   	
		}
		star();
	}, 7300);
};

function removeAnimateStar(pageNum){
	var jQpage = $("#p"+pageNum);
	jQpage.find(".i-star-yellow").removeClass("i-star-yellow").addClass("i-star-white");
};
function p6Animate(){
	$(".d-p6-title").addClass('bounceInDown animated0_8 delay0_1');
	$(".d-p6-ba").addClass('fadeIn animated delay1_3');
	$(".d-p6-tutor").addClass('fadeIn animated0_8 delay2');
	$("#p6 .comment-text").addClass('fadeIn animated delay2_1');
	$(".d-p6-week2").addClass('fadeIn animated delay3_3');
	$(".d-w2-p6-data1").addClass('fadeIn animated delay4');
	$("#p6 .task1").addClass('fadeIn animated delay4_1');
	animateStar1(6, 1, 4);
	$(".d-w2-p6-result1").addClass('fadeIn animated delay6');
	$(".d-w2-p6-data2").addClass('fadeIn animated delay6_1');
	$("#p6 .task2").addClass('fadeIn animated delay7');	
	animateStar2(6, 2, 3);
	$(".d-w2-p6-result2").addClass('fadeIn animated delay8_1');
	$("#p6 .i-to-go-white").addClass('fadeIn animated delay9');
}
function p6RemoveAnimate(){
	$(".d-p6-title").removeClass('bounceInDown animated0_8 delay0_1');
	$(".d-p6-ba").removeClass('fadeIn animated delay1_3');
	$(".d-p6-tutor").removeClass('fadeIn animated0_8 delay2');
	$("#p6 .comment-text").removeClass('fadeIn animated delay2_1');
	$(".d-p6-week2").removeClass('fadeIn animated delay3_3');
	$(".d-w2-p6-data1").removeClass('fadeIn animated delay4');
	$("#p6 .task1").removeClass('fadeIn animated delay4_1');
	removeAnimateStar(6);
	$(".d-w2-p6-result1").removeClass('fadeIn animated delay6');
	$(".d-w2-p6-data2").removeClass('fadeIn animated delay6_1');
	$("#p6 .task2").removeClass('fadeIn animated delay7');	
	$(".d-w2-p6-result2").removeClass('fadeIn animated delay8_1');
	$("#p6 .i-to-go-white").removeClass('fadeIn animated delay9');
	p6complete = false;
}
function p7Animate(){
	$(".d-p7-title").addClass('bounceInDown animated0_8 delay0_1');
	$(".d-p7-ba").addClass('fadeIn animated delay1_3');
	$(".d-p7-tutor").addClass('fadeIn animated0_8 delay2');
	$("#p7 .comment-text").addClass('fadeIn animated delay2_1');
	$(".d-p7-week2").addClass('fadeIn animated delay3_3');
	$(".d-w2-p7-data1").addClass('fadeIn animated delay4');
	$("#p7 .task1").addClass('fadeIn animated delay4_1');
	animateStar1(7, 1, 5);
	$(".d-w2-p7-result1").addClass('fadeIn animated delay6');
	$(".d-w2-p7-data2").addClass('fadeIn animated delay6_1');
	$("#p7 .task2").addClass('fadeIn animated delay7');	
	animateStar2(7, 2, 4);
	$(".d-w2-p7-result2").addClass('fadeIn animated delay8_1');
	$("#p7 .i-to-go-white").addClass('fadeIn animated delay9');
}
function p7RemoveAnimate(){
	$(".d-p7-title").removeClass('bounceInDown animated0_8 delay0_1');
	$(".d-p7-ba").removeClass('fadeIn animated delay1_3');
	$(".d-p7-tutor").removeClass('fadeIn animated0_8 delay2');
	$("#p7 .comment-text").removeClass('fadeIn animated delay2_1');
	$(".d-p7-week2").removeClass('fadeIn animated delay3_3');
	$(".d-w2-p7-data1").removeClass('fadeIn animated delay4');
	$("#p7 .task1").removeClass('fadeIn animated delay4_1');
	removeAnimateStar(7);
	$(".d-w2-p7-result1").removeClass('fadeIn animated delay6');
	$(".d-w2-p7-data2").removeClass('fadeIn animated delay6_1');
	$("#p7 .task2").removeClass('fadeIn animated delay7');	
	$(".d-w2-p7-result2").removeClass('fadeIn animated delay8_1');
	$("#p7 .i-to-go-white").removeClass('fadeIn animated delay9');	
	p7complete = false;
}
function p8Animate(){
	$(".d-p8-title").addClass('bounceInDown animated0_8 delay0_1');
	$(".d-p8-ba").addClass('fadeIn animated delay1_3');
	$(".d-p8-tutor").addClass('fadeIn animated0_8 delay2');
	$("#p8 .comment-text").addClass('fadeIn animated delay2_1');
	$(".d-p8-week2").addClass('fadeIn animated delay3_3');
	$(".d-w2-p8-data1").addClass('fadeIn animated delay4');
	$("#p8 .task1").addClass('fadeIn animated delay4_1');
	animateStar1(8, 1, 4);
	$(".d-w2-p8-result1").addClass('fadeIn animated delay6');
	$(".d-w2-p8-data2").addClass('fadeIn animated delay6_1');
	$("#p8 .task2").addClass('fadeIn animated delay7');	
	animateStar2(8, 2, 3);
	$(".d-w2-p8-result2").addClass('fadeIn animated delay8_1');
	$("#p8 .i-to-go-white").addClass('fadeIn animated delay9');
}
function p8RemoveAnimate(){
	$(".d-p8-title").removeClass('bounceInDown animated0_8 delay0_1');
	$(".d-p8-ba").removeClass('fadeIn animated delay1_3');
	$(".d-p8-tutor").removeClass('fadeIn animated0_8 delay2');
	$("#p8 .comment-text").removeClass('fadeIn animated delay2_1');
	$(".d-p8-week2").removeClass('fadeIn animated delay3_3');
	$(".d-w2-p8-data1").removeClass('fadeIn animated delay4');
	$("#p8 .task1").removeClass('fadeIn animated delay4_1');
	removeAnimateStar(8);
	$(".d-w2-p8-result1").removeClass('fadeIn animated delay6');
	$(".d-w2-p8-data2").removeClass('fadeIn animated delay6_1');
	$("#p8 .task2").removeClass('fadeIn animated delay7');	
	$(".d-w2-p8-result2").removeClass('fadeIn animated delay8_1');
	$("#p8 .i-to-go-white").removeClass('fadeIn animated delay9');	p8complete = false;
}
function p9Animate(){
	$(".d-p9-title").addClass('bounceInDown animated0_8 delay0_1');
	$(".d-p9-ba").addClass('fadeIn animated delay1_3');
	$(".d-p9-tutor").addClass('fadeIn animated0_8 delay2');
	$("#p9 .comment-text").addClass('fadeIn animated delay2_1');
	$(".d-p9-week2").addClass('fadeIn animated delay3_3');
	$(".d-w2-p9-data1").addClass('fadeIn animated delay4');
	$("#p9 .task1").addClass('fadeIn animated delay4_1');
	animateStar1(9, 1, 3);
	$(".d-w2-p9-result1").addClass('fadeIn animated delay6');
	$(".d-w2-p9-data2").addClass('fadeIn animated delay6_1');
	$("#p9 .task2").addClass('fadeIn animated delay7');	
	animateStar2(9, 2, 3);
	$(".d-w2-p9-result2").addClass('fadeIn animated delay8_1');
	$("#p9 .i-to-go-white").addClass('fadeIn animated delay9');
}
function p9RemoveAnimate(){
	$(".d-p9-title").removeClass('bounceInDown animated0_8 delay0_1');
	$(".d-p9-ba").removeClass('fadeIn animated delay1_3');
	$(".d-p9-tutor").removeClass('fadeIn animated0_8 delay2');
	$("#p9 .comment-text").removeClass('fadeIn animated delay2_1');
	$(".d-p9-week2").removeClass('fadeIn animated delay3_3');
	$(".d-w2-p9-data1").removeClass('fadeIn animated delay4');
	$("#p9 .task1").removeClass('fadeIn animated delay4_1');
	removeAnimateStar(9);
	$(".d-w2-p9-result1").removeClass('fadeIn animated delay6');
	$(".d-w2-p9-data2").removeClass('fadeIn animated delay6_1');
	$("#p9 .task2").removeClass('fadeIn animated delay7');	
	$(".d-w2-p9-result2").removeClass('fadeIn animated delay8_1');
	$("#p9 .i-to-go-white").removeClass('fadeIn animated delay9');
}
function p10Animate(){
	$(".i-p10-text1").addClass('fadeIn animated delay1');
	$(".i-p10-text2").addClass('fadeIn animated delay2');
	$(".i-p10-text3").addClass('fadeIn animated delay3');
	$(".btns").addClass('zoomIn animated delay4');
}
function goThrough(){
	var current = $('.swiper-slide-active').attr('id');
	// alert(current);
	if(current == 'p0'){	
		if(loading){
			return;
		}else{
			p1Animate();
		}
	}else if(current == 'p1'){	
		// 组织p2
		if(!p1complete)	{
			return;
		}else{
			p1removeAnimate();
			p2Animate();
		}

	}else if(current == 'p2'){
		if(!p2complete)	{
			return;
		}else{
			// 消除p2动画
			p2RemoveAnimate();
			// 组织p3
			p3Animate();
		}

	}else if(current == 'p3'){
		if(!p3complete)	{
			return;
		}else{
			// 消除p3动画
			p3RemoveAnimate();
			// 组织p4动画
			p4Animate();
		}
	}else if(current == 'p4'){
		if(!p4complete)	{
			return;
		}else{
			// 消除p4动画
			p4RemoveAnimate();
			// 组织p5
			p5Animate();
		}
	}else if(current == 'p5'){
		if(!p5complete)	{
			return;
		}else{
			// 组织p6
			p5RemoveAnimate();
			p6Animate();
		}
	}else if(current == 'p6'){
		if(!p6complete)	{
			return;
		}else{
			p6RemoveAnimate();
			p7Animate();
		}
	}else if(current == 'p7'){
		if(!p7complete)	{
			return;
		}else{
			p7RemoveAnimate();
			p8Animate();
		}
	}else if(current == 'p8'){
		if(!p8complete)	{
			return;
		}else{
			p8RemoveAnimate();
			p9Animate();
		}	
	}else if(current == 'p9'){
		if(!p9complete)	{
			return;
		}else{
			p9RemoveAnimate();
			p10Animate();
		}	
	}

	swiper.slideNext();
}
touch.on('.m1', 'swipeup', function(ev){
	goThrough();
});
$('.i-to-go').bind('click', function(){
	goThrough();
});
$('.i-to-go-white').bind('click', function(){
	goThrough();
});

touch.on('.m1', 'swipedown', function(ev){
	var current = $('.swiper-slide-active').attr('id');
	if(current == 'p1'){
		return;
	}else if(current == 'p2'){
		if(!p2complete){
			return;
		}
		// 组织p2		
		p1Animate();
		p2RemoveAnimate();
	}else if(current == 'p3'){
		// 组织p2
		if(!p3complete){
			return;
		}		
		p2Animate();
		p3RemoveAnimate();
	}else if(current == 'p4'){
		if(!p4complete){
			return;
		}
		// 组织p3
		p3Animate();
		// 取消p5动画
		p4RemoveAnimate();
	}else if(current == 'p5'){
		if(!p5complete){
			return;
		}
		// 组织p4
		p4Animate();
		p5RemoveAnimate();
	}else if(current == 'p6'){
		if(!p6complete){
			return;
		}
		// 组织p5
		p5Animate();
		p6RemoveAnimate();
	}else if(current == 'p7'){
		if(!p7complete){
			return;
		}
		// 组织p5
		p6Animate();
		p7RemoveAnimate();
	}else if(current == 'p8'){
		if(!p8complete){
			return;
		}
		// 组织p5
		p7Animate();
		p8RemoveAnimate();
	}else if(current == 'p9'){
		if(!p9complete){
			return;
		}
		// 组织p5
		p8Animate();
		p9RemoveAnimate();
	}else if(current == 'p10'){
		if(!p10complete){
			return;
		}
		// 组织p5
		p9Animate();
		p10RemoveAnimate();
	}
	swiper.slidePrev();
});

$('#j-share').bind('click', function(){
	$('#j-share-mask').show();
});
$('#j-share-mask').bind('click', function(){
	$('#j-share-mask').hide();
})