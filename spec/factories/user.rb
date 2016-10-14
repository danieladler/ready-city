FactoryGirl.define do
  factory :user do
    username "user_0"
    email { "#{username}@rc.com" }
    password "secret"
    password_confirmation "secret"
  end
end
