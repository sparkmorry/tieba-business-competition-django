var jQunlock = $("#unlock");
function coverAnimate(){
	jQunlock.animate({
	    marginLeft: '+=938px'
	}, 500);
	setTimeout(function(){
		$("#cover").fadeOut();
		$("#comos").fadeIn();
	}, 300);
}
function coverFade(){
	var jQcover = $("#cover");
	jQcover.addClass('fadeOut animated');
	$('.t-ios-main').addClass('fadeIn animated');
	setTimeout(function(){
		jQcover.remove();
	}, 1000);
	var btns = $('.btn-open');
	setTimeout(function(){
		$(btns[0]).click();	
	},2000);

	$(".invitation-btn").bind('click', function(){
		$("#invitation-p1").hide();
		$("#invitation-p2").show();
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
	})
}
// jQunlock.bind('click', function(){
// 	coverAnimate();
// });
// touch.on('#unlock', 'swiperight', function(ev){
// 	coverAnimate();
// });
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
        	coverFade();
        }
    }
    var rotateStr = 'rotate(' + totalAngle + 'deg)';
    $('.cover-circle').css({'webkit-transform' : rotateStr});
    // this.style.webkitTransform = ;
});

function slideInit(){		
    var teamSwiper = new Swiper('.team-content-slide', {
    	direction: 'vertical',
		moveStartThreshold:400,
    	paginationClickable :true,
        nextButton: '#team-arrow',
    });		
    var introSwiper = new Swiper('.intro-content-slide', {
    	direction: 'vertical',
		moveStartThreshold:400,
    	paginationClickable :true,
        nextButton: '#intro-arrow',
        onSlideChangeStart: function(swiper) {
        	var current = $('#intro-content .swiper-slide-active').attr('id');
        	if(current == 'intro-p2'){
        		$(".process1").addClass('fadeIn animated delay0_1');
        		$(".line1").addClass('linedrawing delay1');
        		var l1 = document.querySelector('#intro-content .line1'); 
					l1.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
					$('.line1').css({'width': '130px'});
				}, false); 
        		$(".process2").addClass('fadeIn animated delay1_1');
        		$(".line2").addClass('linedrawing_height delay2');
        		 var l2 = document.querySelector('#intro-content .line2'); 
					l2.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
					$('.line2').css({'height': '30px'});
				}, false);
        		$(".process3").addClass('fadeIn animated delay2_1');
        		$(".line3").addClass('linedrawing delay3');
        		var l3 = document.querySelector('#intro-content .line3'); 
					l3.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
					$('.line3').css({'width': '130px'});
				}, false);
        		$(".process4").addClass('fadeIn animated delay3_1');

        	}
        }
    });						
    var tutorSwiper = new Swiper('.tutor-content-slide', {
        pagination: '.swiper-pagination',
		moveStartThreshold: 400,
        paginationClickable: '.swiper-pagination',
    });				
}

var user = new UserSupport(); //	Create new User for device/lang/prefix detection
var vec3 = new Vector3(); //	3D vector object
var motion = null; //	Motion var to hold the motion type depending on user support (inertia, gyro)
var inertia = null; //	Inertia container
var gyro = null; //	Gyro container
var initialised = false; //	Initiation boolean
var useGyro = null; //	Should we use the gyro?
var blocker = new Blocker(); //	Blocker to control the degree of the 360藲 view the user can access
var range = null; //	The range on degrees the user can view before being blocked by the blocker
var motionCancelled = false; //	Has the motion been cancelled. We should cancel the motion the save on CPU usage when viewing video etc
var imageLoader = new LoadImages();

	/*
	 *
	 *	Support event
	 *
	 */
	var onSupportUpdate = function(e) {
		//对象e是UserSupport对象的测试结果
		//重置user
		user = e;
		//绑定motion
		if (e.supported) {
			if (!initialised) {
				gyro = (user.gyro) ? new Gyro(user) : null;
				inertia = new Inertia('easeOutQuad', 29, 10);
				useGyro = (user.gyro) ? true : false;
				motion = (useGyro) ? gyro : inertia;
				motion.addEventListener('onMotionUpdate', onMotion);
			};
			initialised = true;

			range = {y: 180};

			if (range) blocker.set(range);

			if (!useGyro) {
				motion.reset();
				onMotion({
					vec3: motion.vec3
				})
			}

		} else {
			alert('User unsupported');
		}
	}
	/*
	 *
	 *	Motion event
	 *
	 */
	var onMotion = function(e) {
		// console.log(vec3);
		vec3.set(e.vec3.x, e.vec3.y, e.vec3.z);
		if (range) vec3 = blocker.block(vec3);
		rotate(vec3);
	}
	var box = $('.t-ios-main .box');
	var track = $('.t-track .track-inner');
	// var rotateStr = 'translate3d(0, 0, 500px) rotateZ({2}deg) rotateX(-90deg) rotateX({0}deg) rotateY({1}deg) rotateY(0deg)';
	var rotateStr = 'translate3d({3}px, 0, 500px) rotateZ({2}deg) rotateX({0}deg) rotateY({1}deg)';
	var trackStr = 'rotateX({0}deg) rotate({1}deg)';
	var rotate = function(e){	
		var rotateY = e.x * -1;
		var rotateEnd = rotateStr.replace('{1}', 0).replace('{0}', 0).replace('{2}', (e.z % 360000) * -1).replace('{3}', (e.x-40) * -1.4);
		// var rotateEnd = rotateStr.replace('{1}', e.x * -1).replace('{0}', 0).replace('{2}', (e.z % 3600000) * -1);
		// var rotateEnd = rotateStr.replace('{1}', e.x * -1).replace('{0}', e.y).replace('{2}', (e.z % 3600000) * -1);
		var trackEnd = trackStr.replace('{0}', e.y - 30).replace('{1}', -1*e.x%360);
		box[0].style.webkitTransform = rotateEnd;
		track[0].style.webkitTransform = trackEnd;
	}

	var onKillMotion = function() {

		if (!motionCancelled) {
			/*
			 *	Remove current motion event
			 */
			motion.removeEventListener('onMotionUpdate', onMotion);
			/*
			 *	Clear the motion variable
			 */
			motion = null;
			/*
			 *
			 */
			motionCancelled = true;
		} else {
			/*
			 *	Set the motion variable to its new type
			 */
			motion = (useGyro) ? gyro : inertia;
			/*
			 *	Listen to new motion type
			 */
			motion.addEventListener('onMotionUpdate', onMotion);
			/*
			 *
			 */
			motionCancelled = false;
		}
	}

	var iscroll = null;
	(function(){
		//设备完成测试时，会触发自定义事件supportStatusUpdate :2
		user.addEventListener('supportStatusUpdate', onSupportUpdate);

		//图片加载完成之后，执行设备测试:1
		// coverFade();
		slideInit();
		user.test();

		//绑定弹窗点击事件
		$('.t-info').delegate('.btn-close', 'click', function(e){
			if(user.device.model == 'android'){
				$('.t-ios-main').show();
				$('.mask').hide();
			}
			$('.t-info').removeClass('show');	
		});

		$('.t-ios-main').delegate('.btn-open', 'click', function(e){		
			if(user.device.model == 'android'){
				$('.t-ios-main').hide();
				$('.mask').show();
			}	
			var className = $(this).data('class');	
			if(className == 'invitation'){
				$("#invitation-p1").show();
				$("#invitation-p2").hide();
			}			$('.t-info').addClass('show');
			$('.info-content').removeClass('show');
			$('.info-content-'+className).addClass('show');
		});				

		$('.t-ios-main').delegate('.btn-mid-open', 'click',function(e){		
			if(user.device.model == 'android'){
				$('.t-ios-main').hide();
				$('.mask').show();
			}	
			var className = $(this).attr('data-class');	
			if(className == 'invitation'){
				$("#invitation-p1").show();
				$("#invitation-p2").hide();
			}
			$('.t-info').addClass('show');
			$('.info-content').removeClass('show');
			$('.info-content-'+className).addClass('show');
		});		
	})();


