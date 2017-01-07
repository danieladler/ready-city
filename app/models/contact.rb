class Contact < ApplicationRecord
  belongs_to :user
  validates_presence_of :name, :email
  validates_inclusion_of :out_of_area, in: [true, false]
  validates :email, format: {with: /@/}
  validates_uniqueness_of :name, scope: :user
end
