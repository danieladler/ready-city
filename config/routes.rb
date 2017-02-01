
Rails.application.routes.draw do
  root to: "home#index"

  # ASSORTED
  get "/about",       to: "home#about",       as: :about

  # SESSIONS
  get "/sign-in",     to: "sessions#sign_in", as: :sign_in
  post  "/sign-in",   to: "sessions#create",  as: :create_session
  get  "/sign-out",   to: "sessions#destroy", as: :sign_out

  # USERS
  get "/sign-up",            to: "users#sign_up", as: :sign_up
  post "users",              to: "users#create",  as: :users
  get "/user",               to: "users#api",     as: :user_api
  get "/users/:id",          to: "users#show",    as: :user # AKA Profile
  patch "/users/:id/update", to: "users#update",  as: :update_user

  # PROFILE - ASSESSMENTS
  get   "/home",                   to: "home_assessment#api",             as: :home_api
  patch  "/homes/update/:id",      to: "home_assessment#update_home",     as: :update_home
  get   "/dependents",             to: "dependent_assessment#dependents", as: :dependents
  patch "/dependents/update/:id",  to: "dependent_assessment#update",     as: :update_dependent
  post  "/dependents/create",      to: "dependent_assessment#create",     as: :create_dependent
  delete  "/dependents/destroy/:id",  to: "dependent_assessment#destroy", as: :destroy_dependent
  get "/zones",                    to: "zone_assessment#api",             as: :zone_api
  post "/zones/create",            to: "zone_assessment#create",          as: :create_zone
  patch "/zones/update/:id",       to: "zone_assessment#update",          as: :update_zone
  delete "/zones/destroy/:id",     to: "zone_assessment#destroy",         as: :destroy_zone
  get   "/contacts",               to: "contact_assessment#api",          as: :contact_api
  post "/contacts/create",         to: "contact_assessment#create",       as: :create_contact
  patch "/contacts/update/:id",    to: "contact_assessment#update",       as: :update_contact
  delete "/contacts/destroy/:id",  to: "contact_assessment#destroy",      as: :destroy_contact

  # PREPARATIONS - VIEW AS USER
  get "/userpreps/:id",         to: "userpreps#show", as: :userpreps
  get "/userpreps/api/:id",     to: "userpreps#api",  as: :userpreps_api

  # PREPARATIONS - MANAGE AS ADMIN
  namespace :admin do
    get "/preparations", to: "preparations#preparations",  as: :preparations # AKA Admin Dashboard
    post "new_prep",     to: "preparations#create",        as: :new_prep
    get "/edit/:id",     to: "preparations#edit",          as: :edit_prep
    patch "/update/:id", to: "preparations#update",        as: :update_prep
    get "/destroy/:id",  to: "preparations#destroy",       as: :delete_prep
    post "import_preps", to: "prep_record_manager#import_and_reconcile", as: :import_preps
  end

end
