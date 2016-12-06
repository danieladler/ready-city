require 'rails_helper'

describe HomeAssessmentController, type: :controller do
  describe "POST #update_home" do
    let(:user) { create(:user) }
    let(:home) { create(:home) }
    before(:each) do
      stub_current_user(user)
    end

    context "with valid params, home is a HOUSE" do
      before(:each) do
        @home = create(:home, :house)
      end

      let(:make_request) {
        post :update_home, params: {id: @home, home: attributes_for(:home, :house)}
      }

      it "displays a descriptive success message" do
        make_request
        expect(flash[:success]).to include "Home Updated"
      end

      it "creates a new UserPrep with prep_subtype: home_structure" do
        home_prep = create(:home_prep)
        make_request
        expect(UserPrep.last.prep_subtype).to eq("home_structure")
      end

      it "creates a new UserPrep that belongs to user" do
        home_prep = create(:home_prep)
        make_request
        expect(UserPrep.last.user).to eq(user)
      end
    end

    context "with invalid params" do
      before(:each) do
        @home = create(:home, :house)
      end

      let(:make_request) {
        post :update_home, params: {id: @home.id, home: attributes_for(:home, :house, zip: nil)}
      }

      it "displays a descriptive error message" do
        make_request
        expect(flash[:error]).to include "zip: can't be blank"
      end

      it "renders the 'users/show' template" do
        make_request
        expect(response).to render_template "users/show"
      end
    end
  end
end
