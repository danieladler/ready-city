class ZoneAssessmentController < ApplicationController
  def create
    @zone = Zone.new(zone_params)
    @zone.user_id = current_user.id
    if @zone.save
      # generate_zone_preps(current_user)
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

  def update
    @zone = Zone.find(params[:id])
    @zone.update_db_values(params)
    if @zone.save
      generate_zone_preps(current_user)
      flash[:success] = "Zone Updated"
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

  def destroy
    @zone = Zone.find(params[:id])
    @zone.destroy
    # generate_zone_preps(current_user) # NB: commented out for now because currently no plan_zone UserPreps vary based on # of zones.
    flash[:notice] = "Zone Deleted"
    redirect_to user_path(current_user.id)
  end

  def generate_zone_preps(user)
    @pb = UserPrepBuilder.new(user)
    # 'plan_zone' prep_subtype generates generic UserPreps for meeting place, home evac plan, etc.
    @pb.generate_preps("plan_zone") #, options = { TBD })
    # LATER:
      # options hash generates dynamic criteria for other plan_zone UserPreps, i.e.:
        # routes from A to B (home to work, home to school, etc.)
        # options = route_calculator or zone_count: for each Zone, create a UserPrep to figure out the route between that Zone and Home
      # Goal of this approach: have just one plan_zone prep_subtype, so hoping
      # the options hash can carry the load of carrying & creating dynamic information.
    # @pb.generate_preps("plan_zone_humans") if user.has_dependents?
    # @pb.generate_preps("plan_zone_pets") if user.pets_in_household > 0
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
