require 'rails_helper'

require 'pry'

describe HomeAssessmentController, type: :controller do
  describe "POST #update_home" do
    let(:user) { create(:user) }
    let(:home) { create(:home) }
    before do
      stub_current_user(user)
    end

    context "with valid params" do
      let(:make_request) {
        post :update_home, params: {
          is_house: true,
          floor_count: 3
        }
      }

      it "returns 200" do
        make_request
        expect(response.status).to eq 200
      end
    end

    context "with invalid params" do
      let(:make_request) {
        post :update_home, params: {
          zip: nil
        }
      }

      it "returns a descriptive error message" do
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
