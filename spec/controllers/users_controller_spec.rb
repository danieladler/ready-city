require 'rails_helper'

describe UsersController, type: :controller do
  describe "GET #sign-up" do
    it "returns 200" do
      get :sign_up
      expect(response.status).to eq 200
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new user" do
        expect {
          post :create, params: {user: attributes_for(:user)}
        }.to change(User, :count).by(1)
      end

      it "redirects to the new user" do
        post :create, params: {user: attributes_for(:user)}
        expect(response).to redirect_to User.last
      end

      it "returns a descriptive success message" do
        post :create, params: {user: attributes_for(:user)}
        expect(flash[:success]).to include "Account created. Welcome to Ready City!"
      end
    end

    context "with invalid attributes" do
      it "renders /sign-up template" do
        post :create, params: {user: attributes_for(:user, username: nil)}
        expect(response).to render_template :sign_up
      end

      it "returns a descriptive error message" do
        post :create, params: {user: attributes_for(:user, username: nil)}
        expect(flash[:error]).to include "username: can't be blank"
      end
    end
  end
end
