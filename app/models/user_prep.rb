class UserPrep < ApplicationRecord
  validates_presence_of :instructions
  validates_uniqueness_of :keyword, scope: :user
  validates_inclusion_of :prep_maintype, in: %w( home gear plan )
  validates_inclusion_of :prep_subtype, in: %w( home_structure home_interior gear_human gear_pet plan)
  belongs_to :user
end
