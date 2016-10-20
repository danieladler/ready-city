FactoryGirl.define do
  factory :home do
    user
    address "123 Main St."
    city "Portland"
    state "OR"
    zip 90000
    h20_strapped false # because both houses & apts have access to h20 heater

    factory :house do
      is_house true
      floor_count 2
      year_built 1901
      fdn_bolted false
      structure_material "post-and-beam"
    end

    factory :apartment do
      is_house false
      floor_count 1
      h20_strapped false
      structure_material "URM"
        # ^ Set this because assume apt-dweller should know if their building
        # is at especially high risk b/c of its material. Not sure there are
        # actions they can take, but they should at least be aware.
    end
  end

end
