json.array! @users do |user|#jbuilder:array!メソッドを使用jbuilderオブジェクトを自動で利用できるようになる。array!を使用する事でjavascriptに配列で値を送る事が可能
  json.id user.id
  json.name user.name
end