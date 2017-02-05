/**
 * Created by AHUJP on 2017/2/5.
 */
var flag=true;
setInterval(function(){
    if(flag){
        //1->2
        $("#background2").attr("src","res/images/biying"+Math.round(3*Math.random())+".jpg");
        $("#background2").animate({height:"toggle"},function(){
            $("#background1").hide();
        });
        flag=false;
    }
    else{
        //2->1
        $("#background1").attr("src","res/images/biying"+Math.round(3*Math.random())+".jpg");
        $("#background1").css("z-index","-5");
        $("#background1").animate({width:"toggle"},function(){
            $("#background2").hide();
            $("#background1").css("z-index","-10");
        });
        flag=true;
    }
},5000);