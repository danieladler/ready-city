class CreateDependents < ActiveRecord::Migration[5.0]
  def change
    create_table :dependents do |t|
      t.integer :user_id
      t.boolean :human
      t.string :name

      t.timestamps
    end
  end
end
