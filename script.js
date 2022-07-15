$(function(){
    // ボタンアニメーション
    $(".button-more").on("mouseover", function(){
        $(this).animate({
            opacity: 0.5,
            marginLeft: 20,
        }, 100);
    });

    $(".button-more").on("mouseout", function(){
        $(this).animate({
            opacity: 1.0,
            marginLeft: 0,
        }, 100);
    });

    // カルーセル
    $(".carousel").slick({
        autoplay: true, /*画像を自動的に切り替える*/
        dots: true,     /*カルーセルの下に現在地を示すUI(ドット)を表示*/
        infinite: true, /*画像をループさせる*/
        autoplaySpeed: 5000,    /*5秒ごとに画像を切り替える*/
        arrows: false,  /*カルーセルの左右の矢印を非表示にする*/
    });
});