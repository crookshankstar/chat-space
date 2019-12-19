$(function() { //ユーザーが見つかった場合と見つからなかった場合で条件分岐する
  function addUser(user) {//ユーザーが見つかった場合↓
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {//ユーザーが見つからなかった場合↓
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
    console.log(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {//クラス名がuser-search-fieldのテキストフィールドがkeyupしたらテキストフィールドの文字を取得して変数inputに代入する
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",//HTTPメソッド
      url: "/users",//users_controllernoindexアクションにリクエスト先を設置する
      data: { keyword: input },//テキストフィールドに入力された文字を設置する
      dataType: "json"
    })
      .done(function(users) {//うまく行った時の処理
        $("#user-search-result").empty();//user-search-resultをajaxを発動する前に削除する必要がある
          // console.table(users)
        if (users.length !== 0) {//userに文字が入力されている場合
          users.forEach(function(user){//usersの情報を１つずつ取り出す
            // console.log(user)
            addUser(user);
          });
        } else if (input.length == 0) {//入力されている文字が0の場合
          return false;//falseを返す
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  
  $(document).on("click", ".chat-group-user__btn--add", function() {//クラスchat-group-user__btn--addにあるボタンをクリックするとdocumentを発動する
    const userName = $(this).attr("data-user-name");//値が変わらないようにconstを使って変数userNameにdate-user-nameを代入
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();//クリックされたら親要素ごと消す
    addDeleteUser(userName, userId); 
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();//クリックされたら親要素ごと消す
  });
});