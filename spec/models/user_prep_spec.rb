require 'rails_helper'
require 'pry'

describe UserPrep, type: :model do
  let(:generic_user_prep) { create(:user_prep) }
  let(:home_prep) { create(:home_prep) }

  describe ".validates" do
    context "is invalid" do
      it "when not assigned to a User" do
        generic_user_prep.user = nil
        generic_user_prep.valid?
        expect(generic_user_prep.errors.messages[:user]).to include("must exist")
      end

      it "is missing instructions" do
        generic_user_prep.instructions = nil
        generic_user_prep.valid?
        expect(generic_user_prep.errors.messages[:instructions]).to include("can't be blank")
      end

      it "when a prep with this keyword already exists for this User" do
        home_prep = create(:home_prep)                  # instantiate first factory as a home_prep
        duplicate_home_prep = build_stubbed(:home_prep) # stub out a duplicate home_prep with a redundant keyword
        duplicate_home_prep.valid?
        expect(duplicate_home_prep.errors.messages[:keyword]).to include("has already been taken")
      end

      it "is assigned a prep_maintype that is not one of home_/gear_/plan_prep" do
        improperly_assigned_user_prep = build(:user_prep, prep_maintype: "food")
        improperly_assigned_user_prep.valid?
        expect(improperly_assigned_user_prep.errors.messages[:prep_maintype]).to include("is not included in the list")
      end

      it "is assigned an invalid prep_subtype" do
        improperly_assigned_user_prep = build(:user_prep, prep_subtype: "wrong")
        improperly_assigned_user_prep.valid?
        expect(improperly_assigned_user_prep.errors.messages[:prep_subtype]).to include("is not included in the list")
      end
    end
  end
end
