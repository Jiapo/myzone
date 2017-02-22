/**
 * Created by AHUJP on 2017/2/21.
 */
$(document).ready(function(){
    $("#write").click(function () {
        var fso=new ActiveXObject("Scripting.FileSystemObject");
        var f=fso.createtextfile("D:\\a.txt",2,true);
        f.writeLine("wo shi di yi hang");
    });
});

