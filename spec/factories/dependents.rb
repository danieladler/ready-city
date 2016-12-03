FactoryGirl.define do
  factory :dependent do
    user
    name "placeholder name"

    trait :human do
      human true
      name "human"
    end

    trait :pet do
      human false
      name "cat"
    end
  end
end
