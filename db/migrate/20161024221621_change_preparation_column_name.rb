class ChangePreparationColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :preparations, :base_cost, :base_cost_in_cents
    rename_column :user_preps, :mult_cost, :total_cost_in_cents
  end
end
