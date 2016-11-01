FactoryGirl.define do
  sequence(:username) { |n| "user_#{n}" }

  factory :user do
    username
    email { "#{username}@rc.com" }
    password "secret"
    password_confirmation "secret"
    days_to_cover 1

    trait :admin do
      admin true
    end
  end
end
