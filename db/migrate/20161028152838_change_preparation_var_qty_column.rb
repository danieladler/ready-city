class ChangePreparationVarQtyColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :preparations, :variable_quantity, :variable_quantity_type
    change_column :preparations, :variable_quantity_type, :string
  end
end
