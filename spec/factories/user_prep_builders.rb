FactoryGirl.define do
  factory :user_prep_builder do
    user
    initialize_with { new(user) }
  end
end
