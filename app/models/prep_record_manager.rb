class PrepRecordManager
  include ActiveModel::Model
  include ActiveModel::Validations
  require 'csv'

  def self.import(file)
    load_CSV_rows(file, @csv_rows = [])                     # load CSV contents into an array
    load_db_tracker_ids(@db_tracker_ids = [])               # load Preparation tracker_ids from db into an array
    compare_csv_to_db(@csv_rows, @db_tracker_ids, @db_tracker_ids_to_clear = nil) # compare the two arrays of CSV & db by tracker_id, returning array of modified db_tracker_ids
    if @db_tracker_ids_to_clear != nil                      # if the array is not empty then there ARE old db preparations to clear out...
      clear_old_db_preparations(@db_tracker_ids_to_clear)   # ...so we remove from db any record w/ tracker_id that does not exist in CSV
    end
    add_and_update(@csv_rows) # once all the old Preparations are cleared out of db, update existing and add new Preparations
  end

  def self.load_CSV_rows(file, csv_rows)
    CSV.foreach(file.path, headers: true) do |row|
      csv_rows.push(row.to_hash)
    end
  end

  def self.load_db_tracker_ids(db_tracker_ids)
    Preparation.all.each {|p| @db_tracker_ids.push(p.tracker_id.to_s)}
  end

  def self.compare_csv_to_db(csv_rows, db_tracker_ids, db_tracker_ids_to_clear)
    csv_tracker_ids = []
    csv_rows.map {|row| csv_tracker_ids.push(row["tracker_id"])}   # load tracker_ids of each Preparation in CSV into a local array
    if (@db_tracker_ids - csv_tracker_ids).empty? == false         # subtracting arrays returns the difference. So here, if there are tracker_ids in the db that are not in the CSV...
      @db_tracker_ids_to_clear = @db_tracker_ids - csv_tracker_ids # ...then they'll go into this new array, which is then accessible back up in the .import method.
    end
  end

  def self.clear_old_db_preparations(db_tracker_ids_to_clear)
    @db_tracker_ids_to_clear.each do |tid|
      Preparation.find_by(tracker_id: tid).destroy
    end
  end

  def self.add_and_update(csv_rows)
    @csv_rows.each do |row|
      if @preparation = Preparation.find_by(tracker_id: row["tracker_id"]) # if this Preparation already exists in db...
        @preparation.attributes = row.to_hash # ...resassign its attributes using the data in the CSV row...
        if @preparation.changed?              # ...and if its attrs were changed in this process...
          reconcile_user_preps(@preparation)  # ...then renconcile them with the matching attrs in UserPreps generated from this Preparation.
        end
        @preparation.save # then go ahead and save the Preparation with its new attrs.
      else
        Preparation.create row.to_hash # if this Preparation doesn't exist in db, create it now.
      end
    end
  end

  def self.reconcile_user_preps(preparation)
    UserPrep.where(prep_id: @preparation.id).each do |up|       # Find UserPreps matching this Prep...
      up.update_attrs_from_preparation(@preparation.attributes) # ...and update their attrs with all the new attrs of the updated Preparation.
    end
  end
end
