class CreateHomes < ActiveRecord::Migration[5.0]
  def change
    create_table :homes do |t|
      t.integer :user_id
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip
      t.boolean :is_house
      t.integer :floor_count
      t.integer :year_built
      t.boolean :fdn_bolted
      t.boolean :h20_strapped
      t.string :structure_material

      t.timestamps
    end
  end
end
