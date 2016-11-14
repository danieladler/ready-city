require 'rails_helper'
require 'pry'

describe Zone, type: :model do
  subject(:zone) { create(:zone, :home) }

  describe ".validates" do
    context "is invalid" do
      it "when zip code is missing" do
        zone.zip = nil
        zone.valid?
        expect(zone.errors.messages[:zip]).to include("can't be blank")
      end

      it "when zip code is wrong length" do
        zone.zip = "1111"
        zone.valid?
        expect(zone.errors.messages[:zip]).to include("is the wrong length (should be 5 characters)")
      end
    end
  end

  describe "#dependent" do
    let(:user) { create(:user) }

    context "Zone has a dependent_id" do
      it "belongs_to User and is connected to one of User's Dependents" do
        dependent = create(:dependent, :human, user_id: user.id)
        zone = create(:zone, :school, dependent_id: dependent.id, user_id: user.id)
        expect(zone.dependent).to eq(dependent)
        expect(zone.user).to eq(user)
      end
    end

    context "Zone's dependent_id is nil" do
      it "belongs_to User and is not connected to a dependent" do
        zone = create(:zone, :home, user_id: user.id)
        expect(zone.dependent).to eq(nil)
        expect(zone.user).to eq(user)
      end
    end
  end

  describe "#update_db_values" do
    let (:incomplete_zone) {build_stubbed(:zone, {
        name: nil,
        address: nil,
        city: nil,
        state: nil,
        zone_type: nil,
        zip: nil
      })}

    context "User updates blank fields, entering work zone" do
      it "updates those fields in the database" do
        incomplete_zone.update_db_values(zone: {
          name: "work",
          address: "123 work street",
          city: "city",
          state: "CA",
          zone_type: "zone_work",
          zip: 90000,
        })
        expect(incomplete_zone).to have_attributes({
          name: "work",
          address: "123 work street",
          city: "city",
          state: "CA",
          zone_type: "zone_work",
          zip: 90000
        })
      end
    end
  end
end
