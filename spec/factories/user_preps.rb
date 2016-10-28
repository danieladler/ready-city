FactoryGirl.define do
  factory :user_prep do
    user
    # user_id 1
    prep_maintype "plan"
    prep_subtype "plan"
    total_cost_in_cents 1
    completed false
    instructions "placeholder instructions"

    trait :home_prep do
    # factory :home_user_prep do
      # user_id 1
      prep_maintype "home"
      keyword "foundation"
      instructions "anchor home frame to foundation"
    end
  end
end
