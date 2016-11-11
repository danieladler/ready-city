class PrepRecordManagerController < ApplicationController
  def import_preparations
    PrepRecordManager.import(params[:file])
    flash[:success] = "Preparations Updated"
    redirect_to admin_preparations_path
  end

  def reconcile_user_preps
  end
end
