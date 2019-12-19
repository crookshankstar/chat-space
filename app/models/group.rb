class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true
  has_many :messages

  def show_last_message
    if (last_message = messages.last).present?#変数の値が取れているかどうかを確認している
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
