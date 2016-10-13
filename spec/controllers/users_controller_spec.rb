require 'rails_helper'

describe UsersController, type: :controller do
  fixtures :users

  describe "GET #sign-up" do
    it "returns 200" do
      get :sign_up
      expect(response.status).to eq 200
    end
  end

  describe "POST #create" do
    let(:make_request!) {post :create, params: {user: {username: "user_0", email:"user_0@user.com", password: "pw", password_confirmation: "pw"}}}

      context "new User is valid" do
        it "redirects to root" do # TODO: redirect to new user's account show page instead
          make_request!
          expect(response).to redirect_to root_path
        end

        it "returns a descriptive welcome message" do
          make_request!
          expect(flash[:success]).to eq "Account created. Welcome to Ready City!"
        end
      end

      context "new User is invalid" do
        let(:make_request!) {post :create, params: { user: {username: "user_2", email:"user_2@user.com"} } }

        it "renders /sign-up template" do
          make_request!
          expect(response).to render_template :sign_up
        end

        it "returns a descriptive error message" do
          make_request!
          expect(flash[:error]).to include "username: has already been taken"
        end
      end
  end
end
