require 'rails_helper'

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
    context "brand-new User" do
      let(:current_user) { create(:user) }

      it "User's home has not been instantiated" do
        expect(current_user.home).to eq nil
      end

      it "creates a new instance of Home" do
        expect(Home.load_home(current_user)).to be_a_new(Home)
      end


    end

    context "a Home for current_user has already been instantiated" do
      it "returns that User's home" do
        current_user = create(:user)
        current_user.home = home
        expect(Home.load_home(current_user)).to eq(home) #user.home
      end
    end
  end

  describe "#update_db_values" do
    let (:incomplete_home) {build_stubbed(:home, {
        address: nil,
        city: nil,
        state: nil,
      })}

    context "User updates blank Home address fields" do
      it "updates those fields in the database" do
        incomplete_home.update_db_values({
          address: "999 Fake St.",
          city: "New York",
          state: "NY"
        })
        expect(incomplete_home).to have_attributes({
          city: "New York",
          state: "NY"
        })
      end
    end

    context "Home is not a house" do
      it "sets non-house-related attributes to nil" do
        incomplete_home.update_db_values({
            address: "999 Fake St.",
            city: "New York",
            state: "NY",
            is_house: false
        })
        expect(incomplete_home).to have_attributes({
          fdn_bolted: nil,
          structure_material: nil
        })
      end
    end
  end
end
