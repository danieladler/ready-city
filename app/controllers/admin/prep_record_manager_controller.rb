class Admin::PrepRecordManagerController < ApplicationController
  def import_and_reconcile
    import_preps_from_CSV
    flash[:success] = "Preparations Updated"
    redirect_to admin_preparations_path
  end

  def import_preps_from_CSV
    PrepRecordManager.import(params[:file])
  end
end
