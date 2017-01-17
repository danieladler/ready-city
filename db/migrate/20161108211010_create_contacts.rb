class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.integer :user_id
      t.string :name
      t.string :email
      t.string :phone
      t.boolean :out_of_area

      t.timestamps
    end
  end
end
