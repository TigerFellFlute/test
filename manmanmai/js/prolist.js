$(function(){
    var hrefs = window.location.search.replace(/^\?categoryId=(\d+)&pageid=\d+&category=\S+$/g,'$1'),
        pageid = window.location.search.replace(/^\?categoryId=\d+&pageid=(\d+)&category=\S+$/g,'$1'),//当前页数
        category = window.location.search.replace(/^\?categoryId=\d+&pageid=\d+&category=(\S+)$/g,'$1'),
        htms = '';

    /*----------------------------------------------------------------------------------*/

    function dataIndex_list(data){
        htms = '';
        var dataResult = data.result,
            lengths = dataResult.length;
        if(lengths === 0){
            $('#index_list').html('<p style="text-align: center;padding-bottom: 5px">没有数据</p>');
            return;
        };
        dataResult.forEach(function (v,i){
            for(k in v){
                htms +=
                    '<li>'+
                    '<a href="../html/details.html?productid='+ v['productId'] +'&category='+ category +'">'+
                    v['productImg']+
                    '<p>'+ v['productName'] +'</p>'+
                    '<div class="money"><i>¥</i>'+ v['productPrice'].substring(1) +'</div>'+
                    '<div class="comment">'+
                    '<span>'+ v['productQuote'] +'</span>'+
                    '<div class="sk">'+
                    '<span>'+ v['productCom'] +'</span>'+
                    '</div>'+
                    '</div>'+
                    '</a>'+
                    '</li>'
                break;
            };
        });

        $('#index_list').html(htms);
    };/*渲染 #index_list*/

    function current(pages){
        var uls = '';
        for(var i= 0;i<pages;i++){
            uls += '<li>'+ (i+1) +'/'+ pages +'</li>';
        }
        $('.current').html(pageid+'/'+ pages +'<i></i><ul>'+ uls +'</ul>').click(function(){
            $('.current>ul').slideToggle();
        });
    };/*全部页码显示/隐藏*/
    function locationHref(hrefs,pageid){
        $('.current>ul>li').click(function(){
            pageid = $(this).css({'backgroundColor':'#c1bfbf'}).html().replace(/^(\d+)\/\d+$/g,'$1');
            window.location.href = '../html/prolist.html?categoryId='+ hrefs +'&pageid='+ pageid+'&category='+category;


        });
    };/*跳转到某页*/
    function previous(hrefs,pageid,pages){
        $('.previous').click(function(){//上一页
            if(pageid>1){
                pageid--;
                window.location.href = '../html/prolist.html?categoryId='+ hrefs +'&pageid='+ pageid+'&category='+category;
            }
        });
    };/*上一页*/
    function next(hrefs,pageid,pages){
        $('.next').click(function(){//下一页
            if(pageid<pages){
                pageid++;
                window.location.href = '../html/prolist.html?categoryId='+ hrefs +'&pageid='+ pageid+'&category='+category;
            }
        });
    };/*下一页*/

    /*----------------------------------------------------------------------------------*/

    $.get('http://127.0.0.1:3000/api/getproductlist',{categoryid:hrefs,pageid:pageid,category:category},function(data){
        var pages = Math.ceil(data.totalCount/data.pagesize);//总页数

        dataIndex_list(data);//渲染 #index_list

        current(pages);//全部页码显示/隐藏
        locationHref(hrefs,pageid);//跳转到某页
        previous(hrefs,pageid,pages);//上一页
        next(hrefs,pageid,pages);//下一页

    });
});