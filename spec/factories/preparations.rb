FactoryGirl.define do
  factory :preparation do
    prep_maintype "home"
    keyword "keyword"
    instructions "instructions"
    base_cost_in_cents 100

    factory :home_prep do
      prep_maintype "home"
      prep_subtype "home_structure"
      keyword "foundation"
      instructions "anchor home frame to foundation"
      base_cost_in_cents 400000
    end

    factory :gear_human do
      prep_maintype "gear"
      prep_subtype "gear_human"
      keyword "map"
      instructions "local map"
      base_cost_in_cents 500
    end

    factory :gear_pet do
      prep_maintype "gear"
      prep_subtype "gear_pet"
      keyword "pet_food"
      instructions "nonperishable pet food"
      base_cost_in_cents 200
    end
  end
end
