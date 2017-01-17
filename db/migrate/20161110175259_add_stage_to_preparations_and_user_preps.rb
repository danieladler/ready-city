class AddStageToPreparationsAndUserPreps < ActiveRecord::Migration[5.0]
  def change
    add_column :preparations, :stage, :string
    add_column :user_preps, :stage, :string
  end
end
