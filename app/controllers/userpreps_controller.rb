class UserprepsController < ApplicationController
  def show
  end

  def api
    @all_user_preps ||= UserPrep.where(user_id: current_user.id)
    render :json => @all_user_preps
  end
end
