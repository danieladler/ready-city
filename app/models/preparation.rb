class Preparation < ApplicationRecord
  include ActiveModel::Dirty # for tracking changes of attrs due to CSV import

  validates_presence_of :prep_maintype, :keyword, :instructions, :tracker_id
  validates_uniqueness_of :keyword, :instructions, :tracker_id
  validates_inclusion_of :stage, in: %w( before during after )
end
