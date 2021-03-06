class HomeAssessmentController < ApplicationController
  def api
    @homes ||= Home.load_homes(current_user)
    render :json => @homes
  end

  def update_home
    if current_user.home
      @home = Home.find(params[:id])
    else
      @home = Home.new(user_id: current_user.id)
    end
    @home.assign_attributes(home_assessment_params)
    destroy_house_preps if !@home.is_house # have to call this before @save in order to return a value from .changed method below
    if @home.save
      generate_home_preps(current_user, @home)
      render json: { home: @home, success: "Home Updated" }
    elsif @home.errors
      render json: { home: @home, errors: @home.errors.full_messages }, status: 422
    end
  end

  def generate_home_preps(user, home)
    @pb = UserPrepBuilder.new(user)
    @pb.generate_preps("home_interior") # generic stage:before home preps regardless of house/apt/etc.
    @pb.generate_preps("home_structure") if @home.is_house # home preps that a homeowner can work on but renter likely cannot.
    @pb.generate_preps("home_check")    # generic stage:after preps for all home types
    @pb.generate_preps("plan_home")
    destroy_house_preps if !@home.is_house?
  end

  def destroy_house_preps
    if @home.changed == ["is_house"]
      up = UserPrep.where(user_id: current_user.id, prep_subtype: 'home_structure')
      up.destroy_all
    end
  end

  private

  def home_assessment_params
    params.permit(
      :address,
      :city,
      :state,
      :zip,
      :is_house,
      :floor_count,
      :year_built
    )
  end
end
