$(function (){
    var j = 0,
        htms = '',
        htms1 = '';

    /*----------------------------------------------------------------------------------*/

    function interactive(){
        $('.downList li>h3').click(function (){

            $(this).siblings().slideToggle()
                .end().toggleClass('arrow2').parent()
                .siblings().children('div').slideUp()
                .end().children('h3').removeClass('arrow2');
        })
    };/*标题点击下拉显示事件*/
    function dataList_none(data){
        var more = 3-(data.result.length % 3>0?data.result.length % 3:3),
            lengths = data.result.length;

        data.result.forEach(function (v,i){
            for(k in v){
                htms1 +=
                    '<a href="../html/prolist.html?categoryId='+ v['categoryId'] +'&pageid=1&category='+ v['category'] +'">'+
                    '<span>'+ v['category'] +'</span>'+
                    '</a>'
                break;
            };

        });
        if(more){
            for(var z = 0;z < more;z++){
                htms1 += '<span></span>';
            }
        }
        if(j<lengths){
            $($('.list_none')[j]).html(htms1);
            htms1 = '';

            j++;
        }
    };/*渲染 .List_none*/
    function dataDownListUl(data){
        var dataResult = data.result;

        dataResult.forEach(function (v,i){
            for(k in v){
                htms +=
                    '<li>'+
                    '<h3>'+ v['title'] +'</h3>'+
                    '<div class="list_none clearfix">'+
                    '</div>'+
                    '</li>'
                $('.downList ul').html(htms);

                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:3000/api/getcategory",
                    data:{titleid:v.titleId},
                    dataType: "json",
                    success: function(data){

                        dataList_none(data);//渲染 .List_none

                    }
                });
                break;
            };
        });
    };/*渲染 .downList ul + dataList_none(data)*/

    /*----------------------------------------------------------------------------------*/

    $.ajax({
        type: "get",
        //url: "http://mmb.ittun.com/api/getcategorytitle",
        url: "http://127.0.0.1:3000/api/getcategorytitle",
        dataType: "json",
        success: function(data){
            htms = '';
            htms1 = '';
            j=0;

            dataDownListUl(data);//渲染 .downList ul + dataList_none(data)
            interactive();//标题点击下拉显示事件

        }
    });
});