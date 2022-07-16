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

    // AjaxでSTATIC FORMSにデータを送信
    $("#submit").on("click", function(event){
        // formタグによる送信を拒否
        event.preventDefault();
        // 入力チェックをした結果、エラーがあるかないか判定
        let result = inputCheck();
        // エラー判定とメッセージを取得
        let error = result.error;
        let message = result.message;

        // エラーが無かったらフォームを送信する
        if(error == false){
            // Ajaxでformを送信する
            $.ajax({
                url: "https://api.staticforms.xyz/submit", /*フォームの送信先*/
                type: "POST",
                dataType: "json",
                data: $("#form").serialize(),    /*フォームの入力内容取得*/
                success: function(result){
                    alert("お問い合わせを送信しました。")   /*送信完了メッセージを表示する*/
                },
                error: function(xhr, resp, text){
                    alert("お問い合わせを送信できません。") /*送信失敗メッセージを表示する*/
                }
            })
        }else{
            // エラーメッセージを表示する
            alert(message);
        }
    });

    // フォーカスが外れた時（blur）にフォームの入力チェックをする
    $("#name").blur(function(){
        inputCheck();
    });
    $("#hurigana").blur(function(){
        inputCheck();
    });
    $("#email").blur(function(){
        inputCheck();
    });
    $("#message").blur(function(){
        inputCheck();
    });
    $("#agree").click(function(){
        inputCheck();
    });

    //  お問い合わせフォームの入力チェック
    function inputCheck(){
        // エラーチェック結果
        let result;
        // エラーメッセージのテキスト
        let message = "";
        // エラーがなければfalse,エラーがあればtrue
        let error = false;

        // 名前チェック
        if($("#name").val() == ""){
            // エラーあり
            $("#name").css("background-color", "#f79999");
            error = true;
            message += "お名前を入力してください。\n";
        }else{
            // エラーなし
            $("#name").css("background-color", "#fafafa");
        }
        // フリガナチェック
        if($("#hurigana").val() == ""){
            // エラーあり
            $("#hurigana").css("background-color", "#f79999");
            error = true;
            message += "フリガナを入力してください。\n";
        }else{
            // エラーなし
            $("#hurigana").css("background-color", "#fafafa");
        }
        // お問い合わせのチェック
        if($("#message").val() == ""){
            // エラーあり
            $("#message").css("background-color", "#f79999");
            error = true;
            message += "お問い合わせ内容を入力してください。\n";
        }else{
            // エラーなし
            $("#message").css("background-color", "#fafafa");
        }
        // メールアドレスのチェック
        if($("#email").val() == "" || $("#email").val().indexOf("@") == -1 || $("#email").val().indexOf(".") == -1){
            // エラーあり
            $("#email").css("background-color", "#f79999");
            error = true;
            message += "メールアドレスが未記入、または「@」「.」が含まれていません。\n";
        }else{
            // エラーなし
            $("#email").css("background-color", "#fafafa");
        }
        // 電話番号のチェック（未入力はOK、未入力でない場合は-が必要）
        if($("#tel").val() != "" && $("#tel").val().indexOf("-") == -1){
            // エラーあり
            $("#tel").css("background-color", "#f79999");
            error = true;
            message += "電話番号に「-」が含まれていません。\n";
        }else{
            // エラーなし
            $("#tel").css("background-color", "#fafafa");
        }
        // 個人情報のチェックボックスのチェック
        if($("#agree").prop("checked") == false){
            error = true;
            message += "個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n";
        }
        // エラーの有無で送信ボタンを切り替え
        if(error == true){
            $("#submit").attr("src", "images/button-submit.png");
        }else{
            $("#submit").attr("src", "images/button-submit-blue.png");
        }

        // オブジェクトでエラー判定とメッセージを返す
        result = {
            error: error,
            message: message
        }

        // 戻り値としてエラーがあるかどうかを返す
        return result;
    }
});