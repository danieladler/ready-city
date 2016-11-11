class Preparation < ApplicationRecord
  validates_presence_of :prep_maintype, :keyword, :instructions
  validates_uniqueness_of :keyword, :instructions
  validates_inclusion_of :stage, in: %w( before during after )
  require 'csv'

  def self.import(file)
    @csv_rows = []
    @preparation_keywords = []
    @preparation_keywords_to_clear = nil
    load_CSV_rows(file, @csv_rows)                     # load CSV contents as local array
    load_preparation_keywords(@preparation_keywords)   # load Preparation keywords from DB
    compare_csv_to_db(@csv_rows, @preparation_keywords, @preparation_keywords_to_clear) # compare the two arrays of CSV & DB, returning modified preparation_keywords array
    if @preparation_keywords_to_clear != nil          # if there are actually old db preparations to clear out...
      clear_old_db_preparations(@preparation_keywords_to_clear)   # ...then remove from DB any record w/ keyword that does not exist in CSV
    end
    add_and_update(@csv_rows)
  end

  def self.load_CSV_rows(file, csv_rows)
    CSV.foreach(file.path, headers: true) do |row|
      csv_rows.push(row.to_hash)
    end
  end

  def self.load_preparation_keywords(preparation_keywords)
    Preparation.all.each { |p| @preparation_keywords.push(p.keyword) }
  end

  def self.compare_csv_to_db(csv_rows, preparation_keywords, preparation_keywords_to_clear)
    csv_keywords = []
    csv_rows.map {|row| csv_keywords.push(row["keyword"])}
    # If there extraneous keywords in db they'll be in the resulting non-empty array...
    if (@preparation_keywords - csv_keywords).empty? == false
      # ...and this will make the array accessible to the parent method
      @preparation_keywords_to_clear = @preparation_keywords - csv_keywords
    end
  end

  def self.clear_old_db_preparations(preparation_keywords_to_clear)
    @preparation_keywords_to_clear.each do |keyword|
      Preparation.find_by(keyword: keyword).destroy
    end
  end

  def self.add_and_update(csv_rows)
    @csv_rows.each do |row|
      if @preparation = Preparation.find_by(keyword: row["keyword"])
        @preparation.update(row.to_hash)
      else
        Preparation.create row.to_hash
      end
    end
  end
end
