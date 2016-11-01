require 'rails_helper'
require 'pry'

describe DependentAssessmentController, type: :controller do

  describe "POST #create" do
    let(:user) { create(:user) }
    before(:each) do
      stub_current_user(user)
    end

    context "with invalid attributes" do

    end

    context "with valid attributes; Dependent is a HUMAN" do
      let(:make_request) {
        post :create, params: {dependent: attributes_for(:dependent, :human)}
      }

      it "creates a new Dependent" do
        expect { make_request }.to change(Dependent, :count).by(1)
      end

      it "returns a descriptive success message" do

      end

      it "redirects to current_user's profile" do

      end

      it "generates gear_human gear preps" do

      end

      it "does not generate any gear_pet gear preps" do

      end
    end

    context "with valid attributes; Dependent is a PET" do
      it "generates gear_pet gear preps" do

      end
    end

    context "with valid attributes; two PET Dependents" do
      it "passes in correct # of Pets for consumer_multiplier as
      reflected in double quantities of gear_pet gear preps" do

      end
    end
  end
end
