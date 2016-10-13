Rails.application.routes.draw do
  root to: "home#index"

  # USERS
  get "/sign-up",        to: "users#sign_up", as: :sign_up
  post "users",          to: "users#create",  as: :users
  get "/users/:id",      to: "users#show",    as: :user

end
