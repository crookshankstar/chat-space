## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
|messages|char|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|char|
|image|char|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups_messages
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|messages|char|null: false, foreign_key: true|
|groups_users|integer|null: false, foreign_key: true|

### Association
- has_many :groups
- has_many :users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


