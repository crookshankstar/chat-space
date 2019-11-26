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

$('.main_chat').on('submit', function(e){
  // メッセージを送信用のformタグにmain_chatと言うクラスを適用。formがsubmitされた際に以下の処理が行われる
  e.priventDefault();
  //  通常だとフォームを送信するために通信が行われるため.preventDefault();を利用しデフォルトのイベントを止める。
  var formData = new FormData(this);
  // new FormData()でFormDataオブジェクトを作成。
  var url = $(this).attr('action')
  $.ajax({
    url:url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
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
// 