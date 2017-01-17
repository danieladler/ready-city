class ZoneAssessmentController < ApplicationController
  def api
    @zones = current_user.zones
    render :json => @zones
  end

  def create
    @zone = Zone.new(zone_params)
    @zone.user_id = current_user.id
    if @zone.save
      generate_zone_preps(current_user)
      render json: { zone: @zone, success: "Zone Added" }
    elsif @zone.errors
      render json: { zone: @zone, errors: @zone.errors.full_messages }, status: 422
    end
  end

  def update
    @zone = Zone.find(params[:id])
    @zone.assign_attributes(zone_params)
    if @zone.save
      generate_zone_preps(current_user)
      render json: { zone: @zone, success: "Zone Updated" }
    elsif @zone.errors
      render json: { zone: @zone, errors: @zone.errors.full_messages }, status: 422
    end
  end

  def destroy
    @zone = Zone.find(params[:id])
    @zone.destroy
    destroy_zone_userpreps if !current_user.has_zones?
    # generate_zone_preps(current_user) # NB: commented out for now because currently no plan_zone UserPreps vary based on # of zones.
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

  def destroy_zone_userpreps
    UserPrep.where(prep_subtype: "plan_zone", user_id: current_user.id).destroy_all
  end

  private
  def zone_params
    # params.require(:zone).permit(
    params.permit(
      :dependent_id,
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
