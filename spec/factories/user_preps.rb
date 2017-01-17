FactoryGirl.define do
  factory :user_prep do
    user
    prep_maintype "plan"
    prep_subtype "plan_check"
    total_cost_in_cents 1
    completed false
    instructions "placeholder instructions"
    stage "before"

    trait :home_prep do
      prep_maintype "home"
      keyword "foundation"
      instructions "anchor home frame to foundation"
    end

    factory :gear_prep do
      prep_maintype "gear"
      total_cost_in_cents 100
      instructions "gear_prep instructions"

      trait :gear_human do
        prep_subtype "gear_human"
      end

      trait :gear_pet do
        prep_subtype "gear_pet"
      end
    end
  end

end
