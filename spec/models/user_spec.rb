require 'rails_helper'

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

    describe "#people_in_household" do
      context "is single" do
        it "returns 1" do
          expect(user.people_in_household).to eq 1
        end
      end

      context "has two human dependents" do
        it "returns 3" do
          dependent_spouse = create(:dependent, :human, name: "spouse", user_id: user.id)
          dependent_child = create(:dependent, :human, name: "child", user_id: user.id)
          expect(user.people_in_household).to eq 3
        end
      end
    end

    describe "#pets_in_household" do
      context "owns no pets" do
        it "returns nil" do
          expect(user.pets_in_household).to eq 0
        end
      end

      context "owns a single pet" do
        it "returns 1" do
          depenent_pet = create(:dependent, :pet, user_id: user.id)
          expect(user.pets_in_household).to eq 1
        end
      end
    end

    describe "#has_zones?" do
      context "has set up a zone" do
        it "returns true" do
          zone = create(:zone, :home, user_id: user.id)
          expect(user.has_zones?).to eq true
        end
      end
    end

    describe "#has_contacts?" do
      context "has one contact" do
        it "returns true" do
          contact = create(:contact, user_id: user.id)
          expect(user.has_contacts?).to eq  true
        end
      end
    end

    describe "#destroy_contact_userpreps" do
      context "has one contact" do
        it "removes UserPreps with prep_subtype: 'plan_contact'" do
          contact = create(:contact, user_id: user.id)
          prep = create(:plan_prep, prep_subtype: "plan_contact")
          upb = UserPrepBuilder.new(user)
          upb.generate_preps('plan_contact')
          expect(user.user_preps.count).to eq 1
          user.destroy_contact_userpreps
          expect(user.user_preps.count).to eq 0
        end
      end
    end
  end
end
