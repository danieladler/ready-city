class AddColumnsToPreparations < ActiveRecord::Migration[5.0]
  def change
    add_column :preparations, :variable, :boolean
    add_column :preparations, :priority, :integer
  end
end
