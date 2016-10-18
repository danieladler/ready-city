require 'rails_helper'

describe Home, type: :model do
  subject(:home) {create(:home)}

  describe ".validates" do
    context "is valid" do
      it "responds" do
        puts home.inspect
        puts home.user.inspect
      end
    end

    # replace the above with context "is invalid" and TDD-out Home model validations
    # add context: is house
    # add context: is apartment
  end
end
