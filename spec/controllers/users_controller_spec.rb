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
      let(:make_request) {
        post :create, params: {user: attributes_for(:user)}
      }

      it "creates a new user" do
        expect { make_request }.to change(User, :count).by(1)
      end

      it "redirects to the new user" do
        make_request
        expect(response).to redirect_to User.last
      end

      it "returns a descriptive success message" do
        make_request
        expect(flash[:success]).to include "Account created. Welcome to Ready City!"
      end
    end

    context "with invalid attributes" do
      let(:make_request) {
        post :create, params: {user: attributes_for(:user, username: nil)}
      }

      it "renders /sign-up template" do
        make_request
        expect(response).to render_template :sign_up
      end

      it "returns a descriptive error message" do
        make_request
        expect(flash[:error]).to include "username: can't be blank"
      end

      # TODO: add spec for ActiveRecord::RecordNotFound & redirect to root_path
    end
  end

  describe "GET #show" do
    subject(:user) {create(:user)}

    context "with valid attributes" do
      it "returns 200" do
        get :show, params: { id: user.id }
        expect(response.status).to eq 200
      end

      it "renders the #show view" do
        get :show, params: { id: user.id }
        expect(response).to render_template :show
      end

      it "assigns the requested user to @user" do
        get :show, params: { id: user }
        expect(assigns(:user)).to eq(user)
      end
    end

    context "associated Home has not yet been instantiated" do
      it "creates a new Home belonging to the User" do
        get :show, params: { id: user }
        # DEBUG:
        # puts user.inspect
        # puts user.home.inspect

        # expect(assigns(:home)).to eq("home")

        #  GOAL: expect Home.count to increase by 1
      end
    end

    context "associated Home exists" do
      it "Home shown in the view belongs to the User" do
        # GOAL: expect home's user id to match User.id
      end
    end
  end
end
