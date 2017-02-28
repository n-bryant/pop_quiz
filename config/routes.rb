Rails.application.routes.draw do
  root 'home#index'

  mount_devise_token_auth_for 'User', at: 'auth'

  resources :tracks, only: [:index, :show]
  resources :users, only: [:index, :show]
end
