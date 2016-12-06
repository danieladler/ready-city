require 'rails_helper'
require 'pry'

describe DependentAssessmentController, type: :controller do

  describe "POST #create" do
    let(:user) { create(:user) }

    before(:each) do
      stub_current_user(user)
    end

    context "with invalid attributes" do
      let(:make_request) {
        post :create, params: {dependent: attributes_for(:dependent, :human, name: nil)}
      }

      it "renders a descriptive error message" do
        make_request
        expect(flash[:error]).to include "name: can't be blank"
      end
    end

    context "with valid attributes" do
      context "0 Dependents to begin with, new Dependent is a HUMAN" do
        let(:make_request) {
          post :create, params: {dependent: attributes_for(:dependent, :human)}
        }

        it "creates a new Dependent" do
          expect { make_request }.to change(Dependent, :count).from(0).to(1)
        end

        it "returns a descriptive success message" do
          make_request
          expect(flash[:success]).to include "Dependent Added"
        end

        it "generates gear_human gear preps" do
          preparation_gear_human = create(:gear_human)
          make_request
          expect(user.user_preps.where(prep_subtype: 'gear_human').count).to eq 1
        end

        it "does not generate any gear_pet gear preps" do
          make_request
          expect(user.user_preps.where(prep_subtype: 'gear_pet').count).to eq 0
        end
      end

      context "0 Dependents to begin with, new Dependent is a PET" do
        let(:make_request) {
          post :create, params: {dependent: attributes_for(:dependent, :pet)}
        }

        it "generates gear_pet gear preps" do
          preparation_gear_pet =  create(:gear_pet)
          make_request
          expect(user.user_preps.where(prep_subtype: 'gear_pet').count).to eq 1
        end

        it "does not generate any gear_human gear preps" do
          make_request
          expect(user.user_preps.where(prep_subtype: 'gear_human').count).to eq 0
        end
      end

      context "0 Dependents to begin with, new Dependents are two PETS" do # This context is to test that the total_cost_in_cents of a given user_prep is updated based on qty of dependents
        let(:make_first_request) {
          post :create, params: {dependent: attributes_for(:dependent, :pet)}
        }
        let(:make_second_request) {
          post :create, params: {dependent: attributes_for(:dependent, :pet, name: "dog")}
        }
        it "passes in correct # of Pets for consumer_multiplier as
        reflected in double quantities of gear_pet gear preps" do
          gear_pet_base_preparation = create(:gear_pet) # instantiate the Preparation with the base cost data
          make_first_request
          make_second_request # create two dependents so that the total cost of the user_prep is doubled.
          variable_qty_user_prep = user.user_preps.where(prep_subtype:'gear_pet').first # isolate the user_prep to be checked
          expect(variable_qty_user_prep.total_cost_in_cents).to eq(gear_pet_base_preparation.base_cost_in_cents * user.dependents.count) # confirm the total_cost is double the base_cost
        end
      end
    end
  end

  describe "DELETE #destroy" do
    let(:user) { create(:user) }
    before(:each) do
      stub_current_user(user)
    end

    context "dependent is a pet" do
      it "reduces # of Dependents" do
        dependent = create(:dependent, :pet, user_id: user.id)
        expect{
          delete :destroy, params: {id: dependent, dependent: attributes_for(:dependent)}
        }.to change(Dependent, :count).from(1).to(0)
      end

      it "returns a 200" do
        dependent = create(:dependent, :pet, user_id: user.id)
        delete :destroy, params: {id: dependent, dependent: attributes_for(:dependent)}
        expect(response.status).to eq(200)
      end
    end

    context "2 Dependents to begin with, both Dependents are PETS" do # This context is to test that the total_cost_in_cents of a given user_prep is REDUCED based on qty of dependents
      let(:make_first_create_request) {
        post :create, params: {dependent: attributes_for(:dependent, :pet)}
      }
      let(:make_second_create_request) {
        post :create, params: {dependent: attributes_for(:dependent, :pet, name: "dog")}
      }
      it "passes in correct # of Pets for consumer_multiplier as
      reflected in quantity of gear_pet gear preps being reduced from double to single" do
        gear_pet_base_preparation = create(:gear_pet) # instantiate the Preparation with the base cost data
        make_first_create_request
        make_second_create_request # create two dependents so that the total cost of the user_prep is doubled.
        # placeholder 1
        dependent = Dependent.first
        delete :destroy, params: {id: dependent.id, dependent: attributes_for(:dependent)} # destroy one of the dependents
        expect(user.dependents.count).to eq(1) # confirm there's only one Dependent left
        # placeholder 2
        expect(user.user_preps.where(prep_subtype:'gear_pet').first.total_cost_in_cents).to eq(gear_pet_base_preparation.base_cost_in_cents * user.dependents.count) # confirm the total_cost_in_cents has been reduced

        # TODO: figure out why these two lines return a failed test.
        #       binding.pry shows that calling UserPrep.last returns the UserPrep instance with the correct total_cost_in_cents,
        #       but calling variable_qty_user_prep returns the *same* UserPrep (same id) but with the original (non-reduced after #destroy action) total_cost_in_cents
        #       ...and I can't figure out why the same instance could simultaneously have different attribute values!
        # 
        # Steps to recreate:
        # 1) move following line up to 'placeholder 1'
        # variable_qty_user_prep = user.user_preps.where(prep_subtype:'gear_pet').first # isolate the user_prep to be checked
        # 2) move following line up to 'placeholder 2'
        # expect(variable_qty_user_prep.total_cost_in_cents).to eq(gear_pet_base_preparation.base_cost_in_cents * user.dependents.count) # confirm the total_cost_in_cents has been reduced
      end
    end
  end
end
