var SHAKE_THRESHOLD = 2000;  
var last_update = 0;  
var x = y = z = last_x = last_y = last_z = 0;  
var jQshake = $('.i-shake-circle');
function init() { 
    if (window.DeviceMotionEvent) {  
        window.addEventListener('devicemotion', deviceMotionHandler, false);  
    } else {  
        alert('您的手机不支持摇一摇功能！');  
    }  
}  
function removeShake(){
    if(window.DeviceMotionEvent){
        window.removeEventListener('devicemotion', deviceMotionHandler);
    }
}
function deviceMotionHandler(eventData) {  
    var acceleration = eventData.accelerationIncludingGravity;  
    var curTime = new Date().getTime();  
    if ((curTime - last_update) > 100) {  
        var diffTime = curTime - last_update;  
        last_update = curTime;  
        x = acceleration.x;  
        y = acceleration.y;  
        z = acceleration.z;  
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;  

        if (speed > SHAKE_THRESHOLD) {  
            jQshake.hide();
            var rs = randomResult(6, '<i class="icon3 i-jd-quan i-jd-quan{n}"></i>');
            var jQquan = $(rs);
            $('#p6').append(jQquan);
            //todo: 加入这次没有展示完不会再次触发
            var shaketimer = setTimeout(function(){
                jQquan.hide();
                jQshake.show();
            }, 800)
        }  
        last_x = x;  
        last_y = y;  
        last_z = z;  
    }  
}
