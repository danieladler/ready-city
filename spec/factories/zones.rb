FactoryGirl.define do
  factory :zone do
    user_id 1
    dependent_id 1
    name "MyString"
    address "MyString"
    city "MyString"
    state "MyString"
    zip 1
    zone_type "MyString"
    zone_primary false
  end
end
