require 'rails_helper'

describe UsersController, type: :controller do
  let(:user) { create(:user) }
  before(:each) do
    stub_current_user(user)
  end

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
    before(:each) do
      stub_current_user(user)
    end

    # TODO: troubleshoot this context, as I can't get the code to run in the spec
    # even though it works in the browser. Something to do with setting current_user?
    # context "when current_user is not signed in" do
      # it "redirects to root" do
      #   current_user = nil
      #   get :show, params: {id: 0} # have to hard-code id into params b/c spec fails if id == nil, due to :id not being an optional param
      #   expect(response).to redirect_to root_path
      # end
    # end

    context "when id in params does not match current_user's id" do
      it "redirects to root" do
        other_user = build_stubbed(:user)
        get :show, params: {id: other_user.id}
        expect(response.status).to redirect_to root_path
      end
    end

    context "with valid attributes" do
      it "returns 200" do
        get :show, params: { id: user.id }
        expect(response.status).to eq 200
      end

      it "renders the #show view" do
        get :show, params: { id: user.id }
        expect(response).to render_template :show
      end

      it "user passed in params == current_user == @user instance shown" do
        get :show, params: { id: user }
        expect(assigns(:user)).to eq(user)
      end
    end

    # context "User's Home has not yet been instantiated" do
    #   it "creates a new Home belonging to the User" do
    #     get :show, params: { id: user }
        # expect(assigns(:home)).to eq("home") # Debug
        #  GOAL: expect Home.count to increase by 1
      # end
    # end
    #
    # context "associated Home exists" do
    #   it "Home shown in the view belongs to the User" do
    #     # GOAL: expect home's user id to match User.id
    #   end
    # end
  end

  describe "PATCH #update" do
    context "with valid attributes" do
      let(:make_request) {
        patch :update, params: {id: user, user: attributes_for(:user, days_to_cover: 2)}
      }

      it "changes the # of days to cover" do
        expect { make_request }.to change { user.days_to_cover }.from(1).to(2)
      end

      it "total_cost_in_cents of by_day UserPrep is updated accurately" do
        dependent = create(:dependent, :human, user_id: user.id)
        gear_prep = create(:gear_human)
        make_request
        expect(UserPrep.last.total_cost_in_cents).to eq(
          gear_prep.base_cost_in_cents * user.days_to_cover * user.dependents.count
        )
      end
    end
  end
end
