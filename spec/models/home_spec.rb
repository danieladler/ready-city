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

      # TODO: add specs in this context for existince of has_many preps
    end

    # TODO: add context: is house
    # TODO: add context: is apartment
  end
end
