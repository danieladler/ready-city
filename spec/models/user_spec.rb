require 'rails_helper'

describe User, type: :model do
  subject(:user) {create(:user)}

  context "is invalid" do
    it "when email is empty" do
      user.email = nil
      expect(user.valid?).to eq false
    end

    it "when email is not unique" do
      new_user = build(:user, email: user.email)
      expect(new_user.valid?).to eq false
    end

    it "when email is missing '@'" do
      user.email = "user at google dot com"
      expect(user.valid?).to eq false
    end

    it "when username is empty" do
      user.username = nil
      expect(user.valid?).to eq false
    end

    it "when username not unique" do
      new_user = build(:user, username: user.username)
      new_user.valid?
      expect(new_user.errors.messages[:username]).to include("has already been taken")
      # TODO: figure out if there's a way to test for above error message in a
      #       one-liner spec that is roughly: expect(new_user.valid?).to include([error message])
    end
  end
end
