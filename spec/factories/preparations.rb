FactoryGirl.define do
  factory :preparation do
    prep_maintype "home"
    keyword "keyword"
    instructions "instructions"
    base_cost_in_cents 100

    factory :home_prep do
      prep_subtype "home"
      keyword "foundation"
      instructions "anchor home frame to foundation"
      base_cost_in_cents 400000
    end
  end
end
