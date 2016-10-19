require 'rails_helper'
require 'pry'

describe Home, type: :model do
  subject(:home) {create(:home)}

  describe ".validates" do
    context "is invalid" do
      it "when is not associated with a user" do
        home.user = nil
        expect(home.valid?).to eq false
      end

      it "when zip code is missing" do
        home.zip = nil
        home.valid?
        expect(home.errors.messages[:zip]).to include("can't be blank")
      end

      it "when zip code is wrong length" do
        home.zip = "1111"
        home.valid?
        expect(home.errors.messages[:zip]).to include("is the wrong length (should be 5 characters)")
      end

      # TODO: add specs in this context for existince of has_many preps
    end

    # TODO: add context: is house (is_house == true)
    # TODO: add context: is apartment (is_house == false)
  end

  describe ".load_home" do
    context "a Home for current_user has already been instantiated" do
      it "returns that User's home" do
        current_user = create(:user)
        current_user.home = home
        expect(Home.load_home(current_user)).to eq(home) #user.home
      end
    end
  end
end
