class Home < ApplicationRecord
  belongs_to :user, optional: true
  # validates_presence_of addresses, etc.
end
