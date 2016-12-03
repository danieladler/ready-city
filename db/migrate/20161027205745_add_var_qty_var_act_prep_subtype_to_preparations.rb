class AddVarQtyVarActPrepSubtypeToPreparations < ActiveRecord::Migration[5.0]
  def change
    rename_column :preparations, :prep_type, :prep_maintype
    add_column :preparations, :prep_subtype, :string
    rename_column :preparations, :variable, :variable_quantity
    add_column :preparations, :variable_action, :boolean
  end
end
