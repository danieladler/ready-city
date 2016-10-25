require 'rails_helper'
require 'pry'

describe Admin::PreparationsController, type: :controller do
  let(:user) { create(:user, :admin) }
  before do
    allow(controller).to receive(:current_user).and_return(user)
  end

  context "when not logged in" do
    it "redirects to root path" do
      user = build_stubbed(:user)
      allow(controller).to receive(:current_user).and_return(user)
      get :preparations
      expect(response).to redirect_to root_path
    end
  end

  context "when logged in" do
    describe "GET #admin/preparations" do
      it "returns 200" do
        get :preparations
        expect(response.status).to eq(200)
      end
    end

    describe "POST create" do
      context "with valid attributes" do
        let(:make_request) {
          post :create, params: {preparation: attributes_for(:preparation)}
        }

        it "creates a new Preparation" do
          expect { make_request }.to change(Preparation, :count).by(1)
        end

        it "returns a descriptive success message" do
          make_request
          expect(flash[:success]).to include "New Preparation Created"
        end
      end

      context "with invalid attributes" do
        let(:make_request) {
          post :create, params: {preparation: attributes_for(:preparation, keyword: nil)}
        }

        it "renders /preparations (admin dashboard) template" do
          make_request
          expect(response).to render_template :preparations
        end

        it "returns a descriptive error message" do
          make_request
          expect(flash[:error]).to include "keyword: can't be blank"
        end
      end
    end

    describe "PATCH update" do
      # specs for update
    end

    describe "DESTROY destroy" do
      # specs for destroy
    end
  end
end
