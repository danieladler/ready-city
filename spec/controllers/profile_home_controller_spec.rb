require 'rails_helper'

describe ProfileHomeController, type: :controller do
  describe "POST #update_home" do
    context "with valid params" do
      it "responds" do
        user = create(:user)
        expect(post :update_home, params: {user: user}).to eq "here"
      end
    end

    context "with invalid params" do

    end
  end
end
