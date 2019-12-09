$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }


$('#new_message').on('submit', function(e){
  // メッセージを送信用のformタグに.form__maskと言うクラスを適用。formがsubmitされた際に以下の処理が行われる
  e.preventDefault();
  //  通常だとフォームを送信するために通信が行われるため.preventDefault();を利用しデフォルトのイベントを止める。
  // 通常の動作：submit押される→create_controllerでform内容をdbに保存→viewにリダイレクト
  var formData = new FormData(this);
  // new FormData()でFormDataオブジェクトを作成。引数にformの情報を入れられる
  // this:イベントを発火させた要素、＃new_messageのこと。formのことでもある。

  var url = $(this).attr('action')
  // テキストフィールドの中身を取得
  $.ajax({
    url:url,
    type: "POST",
    // createアクションに飛ぶ
    data: formData,
    dataType: 'json',
    // json型
    processData: false,
    contentType: false
  })
  // ajaxの処理が行われる。

    .done(function(data){
      // .done以下非同期通信が行われた際の記述がされている
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');         
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
});
