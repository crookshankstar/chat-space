Rails.application.routes.draw do
  resources :products
  devise_for :users
  root to: 'messages#index' # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
  resources :messages, only: [:index, :create]
end
