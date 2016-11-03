FactoryGirl.define do
  factory :zone do
    user
    name "placeholder name"
    address "placeholder address"
    city "placeholder city"
    state "CA"
    zip 90000
  end

  trait :home do
    name "home"
    zone_primary true
    zone_type "zone_home"
  end

  trait :work do
    name "work"
    zone_primary false
    zone_type "zone_work"
  end

  trait :school do
    # dependent_id 1
    name "depenent's school"
    zone_primary false
    zone_type "zone_home"
  end

  trait :meetup do
    name "neighborhood meetup site"
    zone_type "zone_safety"
  end
end
