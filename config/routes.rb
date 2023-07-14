Rails.application.routes.draw do
  
  resources :categories, only: :index
  resources :expenses
  resources :users, only: [:show, :create, :update]
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  delete '/reset', to: 'users#reset'
 
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
