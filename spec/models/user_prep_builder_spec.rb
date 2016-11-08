require 'rails_helper'

describe DependentAssessmentController, type: :controller do
  let(:user) { create(:user) }
  let(:upb) { build(:user_prep_builder, user_id: user.id) }

  before(:each) do
    stub_current_user(user)
  end

  describe "#.generate_preps" do
    context "receives args for plan_prep, variable quantity is irrelevant" do
      let(:make_request) { upb.generate_preps("plan_check", options = nil) }

      it "creates a new UserPrep" do
        preparation = create(:plan_prep)
        expect{ make_request }.to change(UserPrep, :count).by(1)
      end

      it "new UserPrep belongs to user" do
        preparation = create(:plan_prep)
        make_request
        expect(UserPrep.last.user).to eq(user)
      end

      it "new UserPrep's keyword matches that of Preparation" do
        preparation = create(:plan_prep)
        make_request
        expect(UserPrep.last.keyword).to eq(preparation.keyword)
      end
    end

    context "2 dependents; method receives args for gear_prep/gear_human needing 1 unit per human dependent (per_dependent)" do
      let(:make_request) {
        upb.generate_preps("gear_human",
        options = {consumer_multiplier: user.people_in_household})
      }

      it "triples the total cost of the corresponding Preparation's base amount" do
        preparation = create(:gear_human)
        first_human_dependent = create(:dependent, :human, name: "spouse", user_id: user.id)
        second_human_dependent = create(:dependent, :human, name: "child", user_id: user.id)
        make_request
        expect(UserPrep.last.total_cost_in_cents).to eq(Preparation.last.base_cost_in_cents * user.people_in_household)
      end
    end

    context "2 pets; 5 days to cover, receives args for gear_prep/gear_pet needing 1 unit per pet per day (per_day)" do
      let(:make_request) {
        upb.generate_preps("gear_pet",
        options = {consumer_multiplier: user.pets_in_household})
      }

      it "doubles the total cost of the corresponding Preparation's base amount" do
        user.update(days_to_cover: 5)
        preparation = create(:gear_pet)
        first_pet_dependent = create(:dependent, :pet, name: "cat", user_id: user.id)
        second_pet_dependent = create(:dependent, :pet, name: "dog", user_id: user.id)
        make_request
        upb.generate_preps("gear_pet", options = {consumer_multiplier: user.pets_in_household})
        expect(UserPrep.last.total_cost_in_cents).to eq(Preparation.last.base_cost_in_cents * user.pets_in_household * user.days_to_cover)
      end
    end
  end
end
