var swiper = new Swiper('.swiper-container',{
	direction: 'vertical',  //vertical,horizontal
	effect : 'fade',
	speed: 700,
	onlyExternal: true,

});	
$("#go").bind('click', function(){
	swiper.slideNext();
});
$('.tb3').bind('click', function() {
	$('.p2-black-triangle').hide()
	$('.p2-green-triangle').addClass('fadeIn');
	setTimeout(function (argument) {
		swiper.slideNext();
	}, 1100)

});

touch.on('#j-swipe-card', 'touchstart', function(ev){
	ev.preventDefault();
});

var w = 168;
var playArea = document.querySelector("#play-area");
var tw = playArea.offsetWidth;

var lf = document.getElementById("j-swipe-card").offsetLeft;
var rt = tw - w - lf;

touch.on('#j-swipe-card', 'touchstart', function(ev){
	ev.preventDefault();
});
var target = document.getElementById("j-swipe-card");

// touch.on(target, 'swiperight', function(ev){
// 	console.log(ev);
// 	this.style.webkitTransform = "translate3d(" + rt + "px,0,0)";
// 	// log("向右滑动.");
// });

// touch.on(target, 'swipeleft', function(ev){
// 	// log("向左滑动.");
// 	this.style.webkitTransform = "translate3d(-" + this.offsetLeft + "px,0,0)";
// });
var swipeTime = 0;
var jQmoney = $('#j-money');
var jQp4 = $('#p4');

touch.on(target, 'swiperight', function(ev){
	var jQself = $(this);
	swipeTime++;
	money = swipeTime * 3000;
	jQmoney.text(money);
	var prizeNo = parseInt(Math.random()*10)+1;
	jQp4.append('<i class="card i-prize'+prizeNo+' i-prize drop"></i>');
	jQself.addClass('transition0_5');

	jQself.css({'left': '100%'});
	setTimeout(function (argument) {
		jQself.removeClass('transition0_5')
		jQself.css({'left': '10%'});
	}, 800);
});

var currentCardNo, nextCardNo, prevCardNo;
$('.j-banka').bind('click', function() {
	var jQself = $(this);
	var type = jQself.data("type");
	currentClass = 'i-arrow-'+ type;
	pressClass= 'i-arrow-'+type+'-pressed';
	jQself.addClass(pressClass).removeClass(currentClass);
	setTimeout(function(){
		jQself.removeClass(pressClass).addClass(currentClass);
		if(type == 'middle'){
			if(currentCardNo != 2){
				var src = '/static/css/anniversary/card/'+currentCardNo+'.png'
			}else{
				var src = '/static/css/anniversary/icon/card1.png'
			}		
			$('#j-swipe-card').attr('src', src);
			swiper.slideNext();
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

$('.i-stop-swipe').bind('click', function(){
	swiper.slideNext();
});
$('.zhongxin-next').bind('click', function(){
	init();
	swiper.slideNext();
});
$('.i-jd-reminder').bind('click', function(){
	removeShake();
	swiper.slideNext();
});
$('.jingdong-next').bind('click', function(){
	swiper.slideNext();
});

var jQuploadInput = $('#j-image');
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
jQuploadInput.bind('change', readFile);
jQcameraInput.bind('change', readFile);
$('.i-upload-btn').bind('click', function(){
	jQuploadInput.click();
});
$('.i-takephoto-btn').bind('click', function(){
	jQcameraInput.click();
})
$('.i-test-face').bind('click', function(){
	swiper.slideNext();
});
$('.i-go-beauty').bind('click', function(){
	swiper.slideNext();
});
$('.i-switch-off').bind('click', function(){
	$(this).removeClass('i-switch-off').addClass('i-switch-on');
	// setTimeout(function(){
	// 	swiper.slideNext();
	// }, 200);
});