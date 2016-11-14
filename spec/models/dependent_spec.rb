require 'rails_helper'

describe Dependent, type: :model do
  subject(:dependent) { create(:dependent, :human) }

  describe ".validates" do
    context "is invalid" do
      it "when is not associated with a user" do
        dependent.user = nil
        expect(dependent.valid?).to eq false
      end
    end

    it "when name is missing" do
      dependent.name = nil
      dependent.valid?
      expect(dependent.errors.messages[:name]).to include("can't be blank")
    end

    it "when User already has a dependent with this name" do
      dependent.update(name: "Flip")
      new_dependent = build(:dependent, :pet, name: "Flip", user: dependent.user)
      new_dependent.valid?
      expect(new_dependent.errors.messages[:name]).to include("has already been taken")
    end
  end

  describe "#zones" do
    context "a Zone has been given Dependent's dependent_id" do
      it "returns that Zone when accessed via Dependent" do
        zone = create(:zone, :school, dependent_id: dependent.id)
        expect(dependent.zones).to include(zone)
      end
    end
  end

  describe "#update_db_values" do
    let (:incomplete_dependent) {build_stubbed(:dependent, {
        name: nil,
        human: nil
      })}

    context "User updates blank fields, entering pet dog" do
      it "updates those fields in the database" do
        incomplete_dependent.update_db_values(dependent: {
          name: "dog",
          human: false
        })
        expect(incomplete_dependent).to have_attributes({
          name: "dog",
          human: false
        })
      end
    end
  end
end
