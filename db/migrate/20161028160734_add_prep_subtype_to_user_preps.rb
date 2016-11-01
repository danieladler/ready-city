class AddPrepSubtypeToUserPreps < ActiveRecord::Migration[5.0]
  def change
    rename_column :user_preps, :prep_type, :prep_maintype
    add_column :user_preps, :prep_subtype, :string
  end
end
