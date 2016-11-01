# require 'rails_helper'
#
# describe DependentAssessmentController, type: :controller do
#
#   describe "POST #create" do
#     let(:user) { create(:user) }
#
#     before(:each) do
#       stub_current_user(user)
#     end
#
#     context "with invalid attributes" do
#       let(:make_request) {
#         post :create, params: {dependent: attributes_for(:dependent, :human, name: nil)}
#       }
#
#       it "renders a descriptive error message" do
#         make_request
#         expect(flash[:error]).to include "name: can't be blank"
#       end
#     end
#
#     context "with valid attributes; Dependent is a HUMAN" do
#       let(:make_request) {
#         post :create, params: {dependent: attributes_for(:dependent, :human)}
#       }
#
#       it "creates a new Dependent" do
#         expect { make_request }.to change(Dependent, :count).by(1)
#       end
#
#       it "returns a descriptive success message" do
#         make_request
#         expect(flash[:success]).to include "Dependent Added"
#       end
#
#       it "redirects to current_user's profile" do
#         make_request
#         expect(response).to redirect_to user_path(user.id)
#       end
#
#       it "generates gear_human gear preps" do
#         preparation_gear_human = create(:gear_human)
#         make_request
#         expect(user.user_preps.where(prep_subtype: 'gear_human').count).to eq 1
#       end
#
#       it "does not generate any gear_pet gear preps" do
#         make_request
#         expect(user.user_preps.where(prep_subtype: 'gear_pet').count).to eq 0
#       end
#     end
#
#     context "with valid attributes; Dependent is a PET" do
#       let(:make_request) {
#         post :create, params: {dependent: attributes_for(:dependent, :pet)}
#       }
#
#       it "generates gear_pet gear preps" do
#         preparation_gear_pet =  create(:gear_pet)
#         make_request
#         expect(user.user_preps.where(prep_subtype: 'gear_pet').count).to eq 1
#       end
#
#       it "does not generate any gear_human gear preps" do
#         make_request
#         expect(user.user_preps.where(prep_subtype: 'gear_human').count).to eq 0
#       end
#     end
#
#     context "with valid attributes; two PET Dependents" do # This context is to test that the total_cost_in_cents of a given user_prep is updated based on qty of dependents
#       let(:make_first_request) {
#         post :create, params: {dependent: attributes_for(:dependent, :pet)}
#       }
#       let(:make_second_request) {
#         post :create, params: {dependent: attributes_for(:dependent, :pet, name: "dog")}
#       }
#       it "passes in correct # of Pets for consumer_multiplier as
#       reflected in double quantities of gear_pet gear preps" do
#         gear_pet_base_preparation = create(:gear_pet) # instantiate the Preparation with the base cost data
#         make_first_request
#         make_second_request # create two dependents so that the total cost of the user_prep is doubled.
#         variable_qty_user_prep = user.user_preps.where(prep_subtype:'gear_pet').first # isolate the user_prep to be checked
#         expect(variable_qty_user_prep.total_cost_in_cents).to eq(gear_pet_base_preparation.base_cost_in_cents * user.dependents.count) # confirm the total_cost is double the base_cost
#       end
#     end
#   end
# end
