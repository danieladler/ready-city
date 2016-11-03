require 'rails_helper'
require 'pry'

describe Zone, type: :model do
  subject(:zone) { create(:zone) }

  describe ".validates" do
    context "is invalid" do
      it "test" do
        zone = create(:zone, :meetup)
        binding.pry
      end
    end
  end
end
