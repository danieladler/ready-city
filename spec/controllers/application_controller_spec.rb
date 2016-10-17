require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  describe "current_user" do
    context "there is an active session" do
      it "sets current user" do
        user = create(:user)
        session[:user_id] = user.id
        expect(subject.current_user.id).to eq user.id # NB: here, 'subject' is the ApplicationController itself
      end
    end

    context "there is not an active session" do
      it "does not set a current user" do
        session[:user_id] = nil
        expect(subject.current_user).to eq nil
      end
    end
  end

  describe "logged_in?" do
    context "user is logged in" do
      it "returns true" do
        user = create(:user)
        session[:user_id] = user.id
        subject.current_user
        expect(subject.logged_in?).to eq true
      end
    end

    context "user is not logged in" do
      it "returns false" do
        session[:user_id] = nil
        expect(subject.logged_in?).to eq false
      end
    end
  end
end
