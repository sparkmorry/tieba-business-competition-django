var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	// effect : 'fade',
	speed: 0,
	// onlyExternal: true,
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
	var animation = setTimeout(function(){
		var jQdom = $(selector);
		var times = 1;
		jQdom.show();
		var p;
		var timer = setInterval(function(){
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
}

var p2Animate = function(){
	$("#j-p2-content-wrapper").addClass('movedown')
	keyframeAnimation('#j-fire', 70, 8, 70, 0, true);
	$("#j-ship").addClass('moveright-slow')
	$(".i-sudden").addClass('fadeIn animated delay3')
	setTimeout(function(){
		swiper.slideNext();
	}, 5000)
}

var second = 0, loading=true;
var secondNum = $("#loading-num");
$(window).load(function(){
	var timer = setInterval(function(){
		second++;
		if(second>100){
			loading=false;
			swiper.slideNext();
			p2Animate();
			second = 0;
			clearInterval(timer);
			return;
		}
		secondNum.text(second);
	}, 30);
});
