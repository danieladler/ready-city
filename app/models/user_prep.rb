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

  # Called in PrepRecordManager whenever a Preparation has been updated,
  # since any UserPreps connected to it need their attrs updated as well.
  def update_attrs_from_preparation(preparation_attributes)
    self.update(
      keyword:       preparation_attributes["keyword"],
      instructions:  preparation_attributes["instructions"],
      prep_maintype: preparation_attributes["prep_maintype"],
      prep_subtype:  preparation_attributes["prep_subtype"],
      stage:         preparation_attributes["stage"]
    )
  end
end
