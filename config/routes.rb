Rails.application.routes.draw do
  root 'home#index'

  resources :tracks, only: [:index, :show]
end
