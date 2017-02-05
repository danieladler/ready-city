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
      puts "!!! ELSE !!!"
      # TODO: put logic for updating anything that isn't @userprep.completed
      # assign_attributes for all values of @userprep
      # render JSON
    end
  end
end
