class Preparation < ApplicationRecord
  validates_presence_of :prep_type, :keyword, :instructions
  validates_uniqueness_of :keyword, :instructions
end
