$(function(){
    var hrefs = window.location.search.replace(/^\?productid=(\d+)&category=\S+$/g,'$1'),
        category = window.location.search.replace(/^\?productid=\d+&category=(\S+)$/g,'$1'),
        htms = '';

    /*----------------------------------------------------------------------------------*/


    function dataCommentUl(data){
        htms = '';
        var dataResult = data.result;
        dataResult.forEach(function (v,i){
            for(k in v){
                htms += '<li>'+
                    '<div>'+
                    '<p>'+ v['comName'] +'</p>'+
                    '<span>★★★★★<div>★★★★</div></span>'+
                    '</div>'+
                    '<div>'+
                    '<p>'+ v['comTime'] +'</p>'+
                    '<span>'+ v['comFrom'] +'</span>'+
                    '</div>'+
                    '<p>'+ v['comContent'] +'</p>'+
                    '<span>回复</span>'+
                    '</li>'
                break;
            }
        });
        $('.comment>ul').html(htms);
    };/*渲染 .comment>ul*/
    function dataGenerate(data){
        htms = '';

        var htms1 = '',
            titles = '',
            dataResult = data.result;

        dataResult.forEach(function (v,i){
            for(k in v){
                var productName = v['productName'].split(' ')[0],
                    decodeURIcategory = decodeURI(category);
                //encodeURIComponent(),转中文uri
                //decodeURI(),uri转中文
                titles += '<a href="../index.html">首页</a><span> ></span>'+
                    '<a href="../html/prolist.html?categoryId='+ v['categoryId'] +'&pageid=1&category='+ category +'">'+ decodeURIcategory +'</a><span> ></span>'+
                    '<a href="#">'+ productName +'</a>'

                htms += v['productImg']+
                    '<p>'+ v['productName'] +'</p>'+
                    '<div class="parameter1">'+
                    '<span>最 低 价: <i>¥1099.00</i></span>'+
                    '<span>最低来自: 京东商城</span>'+
                    '</div>'+
                    '<div class="parameter2">'+
                    '<span>全网评论: 187237条</span>'+
                    '<span>优选评论: 4541条</span>'+
                    '</div>'

                htms1 += v['bjShop'];

                break;
            }
        });
        $('.navigation').html(titles);
        $('.particulars').html(htms);
        $('.generate').html(htms1);
    };/*渲染 .navigation + .particulars + .generate*/

    /*----------------------------------------------------------------------------------*/

    $.get('http://127.0.0.1:3000/api/getproduct',{productid:hrefs},function(data){

        dataGenerate(data);//渲染 .navigation + .particulars + .generate

    });

    $.get('http://127.0.0.1:3000/api/getproductcom',{productid:hrefs},function(data){

        dataCommentUl(data);//渲染 .comment>ul

    });
});