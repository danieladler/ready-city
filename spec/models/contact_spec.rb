require 'rails_helper'

describe Contact, type: :model do
  subject(:contact) { create(:contact) }

  describe ".validates" do
    context "is invalid" do
      it "when name is missing" do
        contact.name = nil
        contact.valid?
        expect(contact.errors.messages[:name]).to include("can't be blank")
      end

      it "when email is missing" do
        contact.email = nil
        contact.valid?
        expect(contact.errors.messages[:email]).to include("can't be blank")
      end

      it "when out_of_area is not selected" do
        contact.out_of_area = nil
        contact.valid?
        expect(contact.errors.messages[:out_of_area]).to include("is not included in the list")
      end

      it "when email is missing '@'" do
        contact.email = "contact at google dot com"
        contact.valid?
        expect(contact.errors.messages[:email]).to include("is invalid")
      end

      it "when name is duplciate of existing Contact for this User" do
        user = create(:user)
        contact.update(name: "name", user_id: user.id)
        new_contact = build(:contact, name: "name", user_id: user.id)
        new_contact.valid?
        expect(new_contact.errors.messages[:name]).to include("has already been taken")
      end
    end
  end

  describe "#update_db_values" do
    let (:incomplete_contact) {build_stubbed(:contact, {
        name: nil,
        email: nil,
        phone: nil,
        out_of_area: nil
      })}

    context "User updates blank fields, entering out_of_area contact" do
      it "updates those fields in the database" do
        incomplete_contact.update_db_values(contact: {
          name: "dad",
          email: "dad@family.com",
          phone: "1234567890",
          out_of_area: true
        })
        expect(incomplete_contact).to have_attributes({
          name: "dad",
          email: "dad@family.com"
        })
      end
    end
  end
end
