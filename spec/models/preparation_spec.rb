require 'rails_helper'
require 'pry'

describe Preparation, type: :model do
  let(:home_prep) { create(:home_prep) }
  let(:prep) { create(:preparation) }

  describe ".validates" do
      context "is invalid" do
        it "when keyword is not unique" do
          prep.keyword = home_prep.keyword
          prep.valid?
          expect(prep.errors.messages[:keyword]).to include("has already been taken")
        end

        it "when prep_type is missing" do
          new_prep = build(:preparation, prep_type: nil)
            expect(new_prep.valid?).to eq false
        end

        it "when instructions are missing" do
          new_prep = build(:preparation, instructions: nil)
          expect(new_prep.valid?).to eq false
        end
      end
  end
end
