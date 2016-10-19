FactoryGirl.define do
  sequence(:username) { |n| "user_#{n}" }

  factory :user do
    username
    email { "#{username}@rc.com" }
    password "secret"
    password_confirmation "secret"
  end
end
