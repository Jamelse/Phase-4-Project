Rails.application.routes.draw do
  
  resources :categories, only: :index
  resources :expenses, only: [:index, :update, :create, :destroy]
  resources :users, only: [:show, :create, :update]
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
 
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
