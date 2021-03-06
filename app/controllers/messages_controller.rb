class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]#indexアクション、createアクションが呼び出された時、set_groupでグループidを取得して@groupを使えるようにしておく
  
  def index
    # binding.pry
    last_message_id = params[:id].to_i
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end
  

  def create
    # binding.pry
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end
  
  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
  
  def set_group
    @group = Group.find(params[:group_id])#@groupにGroupから取得したgroup_idを代入する
    Time.zone = 'Tokyo'
  end
end

