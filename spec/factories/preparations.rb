FactoryGirl.define do
  factory :preparation do
    prep_maintype "home"
    keyword "keyword"
    instructions "instructions"
    base_cost_in_cents 100
    stage "before"
    tracker_id 1

    factory :plan_prep do
      prep_maintype "plan"
      prep_subtype "plan_check"
      keyword "meetup_neighborhood"
      instructions "Identify a neighborhood meeting place"
      variable_quantity_type "N/A"
      tracker_id 2
    end

    factory :home_prep do
      prep_maintype "home"
      prep_subtype "home_structure"
      keyword "foundation"
      instructions "anchor home frame to foundation"
      base_cost_in_cents 400000
      variable_quantity_type "by_user"
      tracker_id 3
    end

    factory :gear_human do
      prep_maintype "gear"
      prep_subtype "gear_human"
      keyword "headlamp"
      instructions "put a headlamp next to bedside of each person in home"
      base_cost_in_cents 1500
      variable_quantity_type "by_dependent"
      tracker_id 4
    end

    factory :gear_pet do
      prep_maintype "gear"
      prep_subtype "gear_pet"
      keyword "pet_food"
      instructions "nonperishable pet food"
      base_cost_in_cents 200
      variable_quantity_type "by_day"
      tracker_id 5
    end
  end
end
