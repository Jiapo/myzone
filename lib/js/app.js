/**
 * Created by AHUJP on 2017/2/20.
 */
document.write("<script src='jquery-3.1.1.js'></script>");
//路径问题
var app=function(){
    return{
        getData:function(url){
            $.ajax({
                url:url,
                dataType:'json',
                success:function(){
                    for(var item in data.content){
                        var module=$(
                            '<div class="group">'+
                            '<div class="title">' + data.content[item].title + '</div>' +
                            '<div class="reaction">' + data.content[item].text + '</div>'+
                            '</div>'
                        );
                        $("#container").append(module);
                    }
                }
            })
        }
    }
}
