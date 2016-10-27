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
end
