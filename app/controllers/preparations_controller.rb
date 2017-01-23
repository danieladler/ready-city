class PreparationsController < ApplicationController
  def show
    @gear_user_preps ||= UserPrep.where(user_id: current_user.id, prep_maintype: 'gear')
    @home_user_preps ||= UserPrep.where(user_id: current_user.id, prep_maintype: 'home')
    @plan_user_preps ||= UserPrep.where(user_id: current_user.id, prep_maintype: 'plan')
    respond_to do |format|

      format.html {
        puts "!!!!! HTML !!!!!!"
        puts format.inspect
      }
      format.json {
        puts "!!!!! JSON !!!!!!"
        render json: {
          gear_user_preps: @gear_user_preps,
          home_user_preps: @home_user_preps,
          plan_user_preps: @plan_user_preps
        }
      }
    end
  end
end
