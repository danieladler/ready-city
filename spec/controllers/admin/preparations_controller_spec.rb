require 'rails_helper'

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
  end
end
