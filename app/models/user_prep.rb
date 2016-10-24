class UserPrep < ApplicationRecord
  validates_presence_of :instructions
  validates_uniqueness_of :keyword, scope: :user
  validates_inclusion_of :prep_type, in: %w( home gear plan )
  belongs_to :user
end
