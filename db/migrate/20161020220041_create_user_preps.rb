class CreateUserPreps < ActiveRecord::Migration[5.0]
  def change
    create_table :user_preps do |t|
      t.integer :user_id
      t.integer :prep_id
      t.string :prep_type
      t.string :keyword
      t.text :note
      t.integer :mult_cost
      t.datetime :completed_at
      t.boolean :completed

      t.timestamps
    end
  end
end
