require 'rails_helper'

describe SessionsController, type: :controller do
  describe "#create" do
    context "attempts sign-in with valid credentials" do
      it "creates a user session" do
        user = create(:user)
        post :create, params: { email: user.email, password: user.password }
        expect(session[:user_id]).to eq user.id
      end
    end

    context "attempts sign-in with invalid credentials" do
      it "displays a descriptive error message" do
        user = create(:user)
        post :create, params: { email: user.email, password: "wrong password" }
        expect(flash[:error]).to include "Wrong username or password"
      end
    end

    context "attempts sign-in as non-existent user" do
      it "redirects to homepage" do
        post :create, params: { email: "fake user", password: "fake password" }
        expect(response).to redirect_to root_path
      end

      it "displays a descriptive error message" do
        post :create, params: { email: "fake user", password: "fake password" }
        expect(flash[:error]).to include "Account does not exist"
      end
    end
  end

  describe "#destroy" do
    context "when user is logged in" do
      let(:user) { create(:user ) }

      before(:each) do
        post :create, params: { email: user.email, password: user.password }
      end

      it "destroys user session" do
        get :destroy, session: { user_id: user.id }
        expect(session[:user_id]).to eq nil
      end

      it "redirects to homepage" do
        get :destroy, session: { user_id: user.id }
        expect(response).to redirect_to root_path
      end
    end
  end
end
