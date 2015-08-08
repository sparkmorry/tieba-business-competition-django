function process(){
	// 点动画
	$(".i-dot1").addClass('dot1 animated');
	$(".i-dot2").addClass('dot2 animated delay1');
	$(".i-dot3").addClass('dot3 animated delay2');
	$(".i-dot4").addClass('dot4 animated delay3');
	$(".i-dot5").addClass('dot5 animated delay4');
	$(".i-dot6").addClass('dot6 animated delay5');
	$(".i-dot7").addClass('dot7 animated delay6');
	$(".i-dot8").addClass('dot8 animated delay7');
	// 线动画
	$(".i-line1").addClass('fadeIn animated delay0_1');
	$(".i-line2").addClass('fadeIn animated delay1_1');
	$(".i-line3").addClass('fadeIn animated delay2_1');
	$(".i-line4").addClass('fadeIn animated delay3_1');
	$(".i-line5").addClass('fadeIn animated delay4_1');
	$(".i-line6").addClass('fadeIn animated delay5_1');
	$(".i-line7").addClass('fadeIn animated delay6_1');
	$(".i-line8").addClass('fadeIn animated delay7_1');
	// 字动画
	$(".i-text1").addClass('fadeIn animated delay0_1');
	$(".i-text2").addClass('fadeIn animated delay1_1');
	$(".i-text3").addClass('fadeIn animated delay2_1');
	$(".i-text4").addClass('fadeIn animated delay3_1');
	$(".i-text5").addClass('fadeIn animated delay4_1');
	$(".i-text6").addClass('fadeIn animated delay5_1');
	$(".i-text7").addClass('fadeIn animated delay6_1');
	$(".i-text8").addClass('fadeIn animated delay7_1');
	$(".i-text9").addClass('fadeIn animated delay8');	
}

var swiper = new Swiper('#main',{
	direction: 'vertical',  //vertical,horizontal
	speed: 600,
	moveStartThreshold:500,
    // nextButton: '#team-arrow',
	onlyExternal: true,
});	
var teamSwiper = new Swiper('#team-content',{
	direction: 'horizontal',  //vertical,horizontal
	speed: 700,
	// onlyExternal: true,
	autoplay : 1000,
    paginationClickable: '.swiper-pagination-team',
	pagination: '.swiper-pagination-team',
	prevButton:'.team-prev-btn',
	nextButton:'.team-next-btn',
});	

var tutorSwiper = new Swiper('#tutor-content',{
	direction: 'horizontal',  //vertical,horizontal
	speed: 700,
	autoplay : 1000,
	// onlyExternal: true,
    paginationClickable: '.swiper-pagination-tutor',
	pagination: '.swiper-pagination-tutor',
	prevButton:'.tutor-prev-btn',
	nextButton:'.tutor-next-btn',

});	

$('body').bind('touchmove',function(event){
	event.preventDefault();
});

touch.on('.m1', 'swipeup', function(ev){
	var current = $('.swiper-slide-active.m1').attr('id');
	if(current == 'p2'){
		process();
	}else if(current == 'p6'){
		tutorSwiper.startAutoplay();
	}else if(current == 'p3'){
		teamSwiper.startAutoplay();
	}

	swiper.slideNext();
});

touch.on('.m1', 'swipedown', function(ev){
	swiper.slidePrev();
});


function introProcess(){
	$(".process1").addClass('fadeIn animated delay0_1');
	$(".line1").addClass('linedrawing delay1');
	var l1 = document.querySelector('.intro-content .line1'); 
		l1.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
		$('.line1').css({'width': '130px'});
	}, false); 
	$(".process2").addClass('fadeIn animated delay1_1');
	$(".line2").addClass('linedrawing_height delay2');
	 var l2 = document.querySelector('.intro-content .line2'); 
		l2.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
		$('.line2').css({'height': '30px'});
	}, false);
	$(".process3").addClass('fadeIn animated delay2_1');
	$(".line3").addClass('linedrawing delay3');
	var l3 = document.querySelector('.intro-content .line3'); 
		l3.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
		$('.line3').css({'width': '130px'});
	}, false);
	$(".process4").addClass('fadeIn animated delay3_1');

}
$(".invitation-btn").bind('click', function(){
	swiper.slideNext();		
	process();
})

var angle = 0;
touch.on('#circle-open', 'touchstart', function(ev){
    ev.startRotate();
    ev.preventDefault();
});

touch.on('#circle-open', 'rotate', function(ev){
    var totalAngle = angle + ev.rotation;
    if(ev.fingerStatus === 'end'){
        angle = angle + ev.rotation;
        if(angle >=200){
        	swiper.slideNext();
        }
    }
    var rotateStr = 'rotate(' + totalAngle + 'deg)';
    $('.cover-circle').css({'webkit-transform' : rotateStr});
    // this.style.webkitTransform = ;
});