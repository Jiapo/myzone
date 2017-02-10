/**
 * Created by AHUJP on 2017/2/10.
 */
$(document).ready(function(){
    //$("#btn").click(function(){
        $.ajax({
            url: 'books.json',
            dataType: 'json',
            success: function(data) {
                console.log(data["content"]);
                for (var item in data.content) {
                    var div=$(
                        '<div class="group">'+
                        '<div class="title">' + data.content[item].title + '</div>' +
                        '<div class="reaction">' + data.content[item].text + '</div>'+
                        '</div>'
                    );
                    $("#container").append(div);
                }
            }
        });
    //});
});