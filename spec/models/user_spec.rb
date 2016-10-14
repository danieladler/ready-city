require 'rails_helper'

describe User, type: :model do
  describe ".validates" do
    context "when email is empty" do
      it "is invalid" do
        user = build_stubbed(:user, email: nil)
        expect(user.valid?).to eq false
      end
    end

    context "when email not unique" do
      it "is invalid" do
        user_1 = create(:user) # use `create` here to save user_1 to db...
        user_2 = build(:user)  # ...and `build` here so that user_2 is NOT saved...
        user_2.save            # ...so that when we DO save it, validation errors occur
        expect(user_2.valid?).to eq false
        # if we use `create` for user_2 then validation errors occur before the test can catch it.
      end
    end

    context "when email is missing '@'" do
      it "is invalid" do
        user = build(:user, email: "invalid email")
        user.save
        expect(user.valid?).to eq false
      end
    end

    context "when username is empty" do
      it "is invalid" do
        user = build(:user, username: nil)
        user.save
        puts user.errors.inspect
        expect(user.valid?).to eq false
      end
    end
  #
  #   context "when username not unique" do
  #     it "is invalid" do
  #       user_2.update(username: "user_1")
  #       expect(user_2.valid?).to eq false
  #     end
  #   end
  end
end
