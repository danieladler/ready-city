class Admin::PrepRecordManagerController < ApplicationController
  def import_and_reconcile
    import_preps_from_CSV
    reconcile_user_preps
    flash[:success] = "Preparations Updated"
    redirect_to admin_preparations_path
  end

  def import_preps_from_CSV
    PrepRecordManager.import(params[:file])
  end

  def reconcile_user_preps
    PrepRecordManager.reconcile
  end
end
