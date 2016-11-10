class Preparation < ApplicationRecord
  validates_presence_of :prep_maintype, :keyword, :instructions
  validates_uniqueness_of :keyword, :instructions
  validates_inclusion_of :stage, in: %w( before during after )
  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      if Preparation.where(keyword: row["keyword"]).exists? == false
        Preparation.create row.to_hash
      else
        @preparation = Preparation.find_by(keyword: row["keyword"])
        @preparation.update(row.to_hash)
      end
    end
  end
end
