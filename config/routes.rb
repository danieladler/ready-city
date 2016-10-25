Rails.application.routes.draw do
  root to: "home#index"

  # SESSIONS
  get     "/sign-in",    to: "sessions#new",     as: :sign_in
  post    "/sign-in",    to: "sessions#create"
  get     "/sign-out",   to: "sessions#destroy", as: :sign_out

  # USERS
  get "/sign-up",        to: "users#sign_up", as: :sign_up
  post "users",          to: "users#create",  as: :users
  get "/users/:id",      to: "users#show",    as: :user # AKA Profile

  # PROFILE - ASSESSMENTS
  post   "/update_home", to: "home_assessment#update_home"

  namespace :admin do
    get "/preparations", to: "preparations#preparations", as: :preparations
    post "new_prep",     to: "preparations#create", as: :new_prep
    put "update/:id",    to: "preparations#update"
  end

end
