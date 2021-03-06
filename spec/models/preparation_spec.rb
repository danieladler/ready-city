require 'rails_helper'

describe Preparation, type: :model do
  let(:prep) { create(:preparation) }
  let(:home_prep) { create(:home_prep) }

  describe ".validates" do
    context "is invalid" do
      it "when keyword is not unique" do
        prep.keyword = home_prep.keyword
        prep.valid?
        expect(prep.errors.messages[:keyword]).to include("has already been taken")
      end

      it "when prep_maintype is missing" do
        new_prep = build(:preparation, prep_maintype: nil)
        expect(new_prep.valid?).to eq false
      end

      it "when instructions are missing" do
        new_prep = build(:preparation, instructions: nil)
        expect(new_prep.valid?).to eq false
      end

      it "is assigned an invalid or missing stage" do
        new_prep = build(:preparation, stage: nil)
        new_prep.valid?
        expect(new_prep.errors.messages[:stage]).to include("is not included in the list")
      end

      it "uses a duplicate tracker_id" do
        new_prep = build(:preparation, tracker_id: home_prep.tracker_id)
        new_prep.valid?
        expect(new_prep.errors.messages[:tracker_id]).to include("has already been taken")
      end
    end
  end
end
