require 'rails_helper'

describe User, type: :model do
  describe ".validates" do
    context "when email is empty" do
      it "is invalid" do
        user = build_stubbed(:user, email: nil)
        expect(user.valid?).to eq false
      end
    end
  #
  #   context "when email not unique" do
  #     it "is invalid" do
  #       user_2.update(email: user_1.email)
  #       expect(user_2.valid?).to eq false
  #     end
  #   end
  #
  #   context "when email is missing '@'" do
  #     it "is invalid" do
  #       user_2.update(email: 'myemail')
  #       expect(user_2.valid?).to eq false
  #     end
  #   end
  #
  #   context "when username is empty" do
  #     it "is invalid" do
  #       user_1.update(username: nil)
  #       expect(user_1.valid?).to eq false
  #     end
  #   end
  #
  #   context "when username not unique" do
  #     it "is invalid" do
  #       user_2.update(username: "user_1")
  #       expect(user_2.valid?).to eq false
  #     end
  #   end
  end
end
