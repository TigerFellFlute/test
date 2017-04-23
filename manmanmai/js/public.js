$(function (){
    $('#onTop').on('click',function(){
        $(window).scrollTop("0");
    });
    $('#offBanner').click(function(){
        $('.newsBanner').fadeOut();
    });
});
