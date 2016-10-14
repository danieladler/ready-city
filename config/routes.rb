Rails.application.routes.draw do
  root to: "home#index"

  # USERS
  get "/sign-up",        to: "users#sign_up", as: :sign_up
  post "users",          to: "users#create",  as: :users
  get "/users/:id",      to: "users#show",    as: :user

  # SESSIONS
  post    "/sign-in",    to: "sessions#create",  as: :sign_in
  get     "/sign-out",   to: "sessions#destroy", as: :sign_out

end
