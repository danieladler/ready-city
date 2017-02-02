class AddPriorityToUserPreps < ActiveRecord::Migration[5.0]
  def change
    add_column :user_preps, :priority, :integer
  end
end
