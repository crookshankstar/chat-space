class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :content#string型でcontentカラム作成
      t.string :image#string型でimageカラム作成
      t.references :group, foreign_key: true#references型でgroupカラム作成。group_idにはgroup.idにある値しか入れられなくなる。関連できないような値は絶対来ない。
      t.references :user, foreign_key: true#reference型でuserカラムを作成。アソシエーションが組めないような値を取得できないようにするため外部キーを設定
      t.timestamps
    end
  end
end
