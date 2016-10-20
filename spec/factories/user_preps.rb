FactoryGirl.define do
  factory :user_prep do
    user_id 1
    prep_id 1
    prep_type "MyString"
    keyword "MyString"
    note "MyText"
    mult_cost 1
    completed_at "2016-10-20 15:00:41"
    completed false
  end
end
