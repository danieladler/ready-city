class UserPrep < ApplicationRecord
  validates_presence_of :instructions
  validates_uniqueness_of :keyword, scope: :user
  validates_inclusion_of :prep_maintype, in: %w( home gear plan )
  validates_inclusion_of :prep_subtype, in: %w(
    home_structure home_interior home_check
    gear_human gear_pet gear_check
    plan_home plan_dependent plan_zone plan_contact plan_check
  )
  validates_inclusion_of :stage, in: %w( before during after )
  belongs_to :user
end
