class AddTrackerIdToPreparations < ActiveRecord::Migration[5.0]
  def change
    add_column :preparations, :tracker_id, :integer
  end
end
