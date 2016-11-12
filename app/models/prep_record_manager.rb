class PrepRecordManager
  include ActiveModel::Model
  include ActiveModel::Validations
  require 'csv'

  def self.import(file)
    load_CSV_rows(file, @csv_rows = [])                           # load CSV contents as an array
    load_preparation_tracker_ids(@preparation_tracker_ids = [])   # load Preparation tracker_ids from DB
    compare_csv_to_db(@csv_rows, @preparation_tracker_ids, @preparation_tracker_ids_to_clear = nil) # compare the two arrays of CSV & DB by tracker_id, returning modified preparation_tracker_ids array
    if @preparation_tracker_ids_to_clear != nil          # if there ARE old db preparations to clear out...
      clear_old_db_preparations(@preparation_tracker_ids_to_clear)   # ...then remove from DB any record w/ tracker_id that does not exist in CSV
    end
    add_and_update(@csv_rows)
  end

  def self.load_CSV_rows(file, csv_rows)
    CSV.foreach(file.path, headers: true) do |row|
      csv_rows.push(row.to_hash)
    end
  end

  def self.load_preparation_tracker_ids(preparation_tracker_ids)
    Preparation.all.each {|p| @preparation_tracker_ids.push(p.tracker_id.to_s)}
  end

  def self.compare_csv_to_db(csv_rows, preparation_tracker_ids, preparation_tracker_ids_to_clear)
    csv_tracker_ids = []
    csv_rows.map {|row| csv_tracker_ids.push(row["tracker_id"])}
    # If there extraneous tracker_ids in db they'll be in the resulting non-empty array...
    if (@preparation_tracker_ids - csv_tracker_ids).empty? == false
      # ...and this will make the array accessible to the parent method
      @preparation_tracker_ids_to_clear = @preparation_tracker_ids - csv_tracker_ids
    end
  end

  def self.clear_old_db_preparations(preparation_tracker_ids_to_clear)
    @preparation_tracker_ids_to_clear.each do |tid|
      Preparation.find_by(tracker_id: tid).destroy
    end
  end

  def self.add_and_update(csv_rows)
    @csv_rows.each do |row|
      if @preparation = Preparation.find_by(tracker_id: row["tracker_id"]) # if this Preparation already exists in db...
        @preparation.attributes = row.to_hash # ...resassign its attributes from the data in the CSV row...
        if @preparation.changed? # ...and if its attrs were changed in this process...
          reconcile_user_preps(@preparation)
        end
        @preparation.save # then go ahead and save the Preparation with its new attrs.
      else
        Preparation.create row.to_hash # if this Preparation doesn't exist in db, create it now.
      end
    end
  end

  def self.reconcile_user_preps(preparation)
    UserPrep.where(prep_id: @preparation.id).each do |up| # ...find UserPreps matching this Prep...
      up.update_attrs_from_preparation(@preparation.attributes) # ...and update their attrs with all the new attrs of the updated Prep.
    end
  end
end
