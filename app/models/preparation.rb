class Preparation < ApplicationRecord
  validates_presence_of :prep_maintype, :keyword, :instructions, :tracker_id
  validates_uniqueness_of :keyword, :instructions
  validates_inclusion_of :stage, in: %w( before during after )
end
