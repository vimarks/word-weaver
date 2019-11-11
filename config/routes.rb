Rails.application.routes.draw do
  resources :games
  resources :boards
  resources :users
  resources :words

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
