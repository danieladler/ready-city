require 'rails_helper'
require 'pry'

describe HomeAssessmentController, type: :controller do
  describe "POST #update_home" do
    let(:user) { create(:user) }
    let(:home) { create(:home) }
    before(:each) do
      stub_current_user(user)
    end

    context "with valid params" do
      let(:make_request) {
        post :update_home, params: attributes_for(:home)
      }

      it "redirects to User's show/profile view" do
        make_request
        expect(response).to redirect_to user_path(user.id)
      end

      # it "displays a descriptive success message" do
        # make_request
        # expect(flash[:success]).to include "Home Updated!!"
      # end
    end

    # context "with invalid params" do
    #   let(:make_request) {
    #     post :update_home, params: {
    #       zip: nil
    #     }
    #   }
    #
    #   it "displays a descriptive error message" do
    #     make_request
    #     expect(flash[:error]).to include "zip: can't be blank"
    #   end
    #
    #   it "renders the 'users/show' template" do
    #     make_request
    #     expect(response).to render_template "users/show"
    #   end
    # end
  end
end
