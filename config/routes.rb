Rails.application.routes.draw do
  # resources :products
  devise_for :users
  root 'groups#index' # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    # グループにネストさせルーティングを組む。index:メッセージの入力と表示。create:メッセージの保存
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }#defaultsはjson型で返す事が
    end
  end
end
