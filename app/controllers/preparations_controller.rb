class PreparationsController < ApplicationController
  def overview
    @gear_user_preps ||= UserPrep.where(user_id: current_user.id, prep_maintype: 'gear')
    @home_user_preps ||= UserPrep.where(user_id: current_user.id, prep_maintype: 'home')
    @plan_user_preps ||= UserPrep.where(user_id: current_user.id, prep_maintype: 'plan')
  end
end
