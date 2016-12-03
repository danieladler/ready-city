class CreateZones < ActiveRecord::Migration[5.0]
  def change
    create_table :zones do |t|
      t.integer :user_id
      t.integer :dependent_id
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip
      t.string :zone_type
      t.boolean :zone_primary

      t.timestamps
    end
  end
end
