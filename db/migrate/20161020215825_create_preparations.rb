class CreatePreparations < ActiveRecord::Migration[5.0]
  def change
    create_table :preparations do |t|
      t.string :prep_type
      t.string :keyword
      t.string :instructions
      t.integer :base_cost

      t.timestamps
    end
  end
end
