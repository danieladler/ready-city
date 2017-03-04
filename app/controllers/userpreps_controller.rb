class UserprepsController < ApplicationController
  def show
  end

  def api
    @all_user_preps ||= UserPrep.where(user_id: current_user.id).order(completed: :asc)
    render :json => @all_user_preps
  end

  def update
    @userprep = UserPrep.find(params[:id])
    if params[:updateTypeFlag] == 'toggleCompleted'
      @userprep.update(completed: params[:completed])
      render json: { userprep: @userprep }
    else
      @userprep.assign_attributes(userprep_params)
      if @userprep.save
        render json: { userprep: @userprep, success: "Userprep Updated"}
      elsif @userprep.errors
        render json: { userprep: @userprep, errors: @userprep.errors.full_messages }, status: 422
      end
    end
  end

  private
  def userprep_params
    params.permit(:id, :note)
  end
end
