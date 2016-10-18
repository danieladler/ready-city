FactoryGirl.define do
  factory :home do
    user
    address "123 Main St."
    city "Portland"
    state "OR"
    zip 9000
    floor_count 2
    year_built 1901
    fdn_bolted false
    h20_strapped false
    structure_material "URM"
  end
end
