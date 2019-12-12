class UsersController < ApplicationController

  def index
    # binding.pry
    return nil if params[:keyword] == ""#キーワードの中身がからだった場合nilで返すよ。と行っている
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)#検索ワードに入力された値を含んでいて、かつログイン中のユーザーを含まない。%#{params[:keyword]%}で入力した値を含む文字。
    # binding.pry
    respond_to do |format|#インクリメンタルサーチのための記述。APIを生成。下記条件分岐させる
      format.html#HTMLの時
      format.json#jsonの時
    end
  end
  
  def edit
  end

  def new
  end

  def create
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end