FactoryGirl.define do
  factory :contact do
    user
    name "placeholder name"
    email "placeholder@email"
    phone "placeholder phone"
    out_of_area true

    trait :in_area do
      name "in-area contact"
      out_of_area false
    end
  end
end
