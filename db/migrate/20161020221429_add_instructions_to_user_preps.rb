class AddInstructionsToUserPreps < ActiveRecord::Migration[5.0]
  def change
    add_column :user_preps, :instructions, :string
  end
end
