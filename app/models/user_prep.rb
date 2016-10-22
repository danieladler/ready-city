class UserPrep < ApplicationRecord
  # validates_presence_of
  belongs_to :user
  belongs_to :preparation
end
