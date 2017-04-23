$(function (){
    var htms= '',
        flag = false;

    /*----------------------------------------------------------------------------------*/

    function dataNav(data){
        htms= '';
        var dataResult = data.result;
        dataResult.forEach(function (v,i){
            for(k in v){
                if(v['indexmenuId'] !== 7){
                    htms += '<li>'+
                        '<a href="html/'+ v['titlehref'] +'">'+
                        v['img']+
                        '<p>'+ v['name'] +'</p>'+
                        '</a>'+
                        '</li>';
                    break;
                }else{

                    htms += '<li id="more">'+
                        '<a href='+ v['titlehref'] +'>'+
                        v['img']+
                        '<p>'+ v['name'] +'</p>'+
                        '</a>'+
                        '</li>';
                    break;
                };
            };
        });
        htms = '<ul>'+ htms +'</ul>';
        $('.nav').html(htms);
    };/*渲染 .nav*/
    function moveBtn(){
        $('#more').on('click',function(){
            if(flag === false){
                flag = true;
                $('.nav>ul').animate({
                    'height':'300px',
                    'overflow':'inherit'
                })
            }else{
                flag = false;
                $('.nav>ul').animate({
                    'height':'200px',
                    'overflow':'hidden'
                })
            };
        });
    };/*添加move的点击事件*/

    function dataIndex_list(data){
        htms= '';
        var dataResult = data.result;
        dataResult.forEach(function (v,i){
            for(k in v){
                var str = v['productComCount'].replace(/^有(\d+)人评论$/g,'$1');//现在第13人
                htms +=
                    '<li>'+
                    '<a href="#">'+
                    v['productImgSm']+
                    '<p>'+ v['productName'] +
                    '<span>'+ v['productPinkage'] +'</span>'+
                    '</p>'+
                    '<div>'+
                    '<span>慢慢买 | '+ v['productTime'] +'</span>'+
                    '<div class="sk">'+
                    '<i class="icon-comment"></i><span>'+ str  +'</span>'+
                    '</div>'+
                    '</div>'+
                    '</a>'+
                    '</li>'

                break;
            };
        });

        $('#index_list').html(htms);
    };/*渲染 #index_list*/

    /*----------------------------------------------------------------------------------*/

    $.ajax({
        type: "get",
        //url: "http://mmb.ittun.com/api/getindexmenu",
        url: "http://127.0.0.1:3000/api/getindexmenu",
        dataType: "json",
        success: function(data){

            dataNav(data);//渲染 .nav
            moveBtn();//添加move的点击事件

        }
    });

    $.ajax({
        type: "get",
        //url: "http://mmb.ittun.com/api/getmoneyctrl",
        url: "http://127.0.0.1:3000/api/getmoneyctrl",
        dataType: "json",
        success: function(data){

            dataIndex_list(data);//渲染 #index_list

        }
    });
});