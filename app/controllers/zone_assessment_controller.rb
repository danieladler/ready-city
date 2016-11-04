class ZoneAssessmentController < ApplicationController
  def create
    @zone = Zone.new(zone_params)
    @zone.user_id = current_user.id
    if @zone.save
      # generate_zone_preps(current_user)a
      flash[:success] = "Zone Added"
      redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    elsif @zone.errors
      @errors = []
      @zone.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render "users/show"
    end
  end

  def generate_zone_preps(user)
    @pb = UserPrepBuilder.new(user)
  end

  private
  def zone_params
    params.require(:zone).permit(
      :name,
      :zone_type,
      :dependent,
      :address,
      :city,
      :state,
      :zip,
    )
  end
end
