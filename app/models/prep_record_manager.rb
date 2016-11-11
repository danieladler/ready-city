class PrepRecordManager
  include ActiveModel::Model
  include ActiveModel::Validations
  require 'csv'

  def self.import(file)
    load_CSV_rows(file, @csv_rows = [])                     # load CSV contents as local array
    load_preparation_keywords(@preparation_keywords = [])   # load Preparation keywords from DB
    compare_csv_to_db(@csv_rows, @preparation_keywords, @preparation_keywords_to_clear = nil) # compare the two arrays of CSV & DB, returning modified preparation_keywords array
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

  def self.reconcile
    # GOAL:
    # fix UserPreps where keywords are outdated.
    # These will be created whenever Preparations' keywords are updated
    # Any NEW UserPreps after Prep import will be fine because they'll be generated from the latest Preparation keywords
    # But existing UserPreps, which were created based on shared keyword w/ Preps, will be 'orphaned'
    # These UserPreps need to be kept because they'll still contain valuable information & user-specific notes
    # So how to find & correct them?

    load_preparation_keywords(@preparation_keywords = []) # load Preparation keywords from DB
    load_userprep_keywords(@user_prep_keywords = [])
    compare_prep_to_user_prep_keywords(@preparation_keywords, @user_prep_keywords, @user_prep_keywords_to_fix = nil)
    update_old_user_prep_keywords(@user_prep_keywords_to_fix)
  end

  def self.load_userprep_keywords(user_prep_keywords)
    UserPrep.all.each {|up| @user_prep_keywords.push(up.keyword)}
  end

  def self.compare_prep_to_user_prep_keywords(preparation_keywords, user_prep_keywords, user_prep_keywords_to_fix)
    pk = @preparation_keywords
    uk = @user_prep_keywords
    if (@user_prep_keywords - @preparation_keywords).empty? == false # if there are UserPreps w/ keywords that don't match what's in db
      @user_prep_keywords_to_fix = @user_prep_keywords - @preparation_keywords
    end
    raise
  end

  def self.update_old_user_prep_keywords(user_prep_keywords_to_fix)
    @user_prep_keywords_to_fix.each do |k|
      UserPrep.where(keyword: k).each do |up|
        p = Preparation.find_by(id: up.prep_id)
        raise if Preparation.find_by(id: up.prep_id) == nil
          # If this happens, it means a UserPrep's parent Preparation was destroyed.
          # In this case, just manually figure out if the Preparation has been recreated.
            # IF YES, then update the UserPrep's prep_id to match the Preparation
            # IF NO, then the UserPrep may not be needed since its parent Preparation was destroyed.
          # NB: just handle this all manually since these cases should be rare.
        up.update(keyword: p.keyword) # update all attributes?
      end
      # raise
    end
  end
end
