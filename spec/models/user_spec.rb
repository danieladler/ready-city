require 'rails_helper'
require 'pry'

describe User, type: :model do
  subject(:user) {create(:user)}

  describe ".validates" do
    context "is invalid" do
      # TODO: figure out if there's a way to test for error messages in a one-liner
      #       spec that is roughly: expect(new_user.valid?).to include([error message])

      it "when email is empty" do
        user.email = nil
        user.valid?
        expect(user.errors.messages[:email]).to include("can't be blank")
      end

      it "when email is not unique" do
        new_user = build(:user, email: user.email)
        new_user.valid?
        expect(new_user.errors.messages[:email]).to include("has already been taken")
      end

      it "when email is missing '@'" do
        user.email = "user at google dot com"
        user.valid?
        expect(user.errors.messages[:email]).to include("is invalid")
      end

      it "when username is empty" do
        user.username = nil
        user.valid?
        expect(user.errors.messages[:username]).to include("can't be blank")
      end

      it "when username not unique" do
        new_user = build(:user, username: user.username)
        new_user.valid?
        expect(new_user.errors.messages[:username]).to include("has already been taken")
      end
    end

    describe "#has_dependents?" do
      context "has at least one dependent" do
        it "returns true" do
          dependent = create(:dependent, :pet, user_id: user.id)
          expect(user.has_dependents?).to eq true
        end
      end
    end
  end
end
