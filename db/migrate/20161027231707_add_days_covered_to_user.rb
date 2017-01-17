class AddDaysCoveredToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :days_to_cover, :integer
  end
end
