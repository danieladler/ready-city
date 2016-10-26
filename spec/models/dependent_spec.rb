require 'rails_helper'
require 'pry'

describe Dependent, type: :model do
  subject(:dependent) { create(:dependent, :human) }

  describe ".validates" do
    context "is invalid" do
      it "when is not associated with a user" do
        dependent.user = nil
        expect(dependent.valid?).to eq false
      end
    end
  end
end
