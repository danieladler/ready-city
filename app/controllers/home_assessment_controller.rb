class HomeAssessmentController < ApplicationController
  def update_home
    @home ||= Home.load_home(current_user)
    @home.update_db_values(params)
    if @home.save
      generate_home_preps(current_user, @home)
      flash[:success] = "Home Updated"
      redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    elsif @home.errors
      @errors = []
      @home.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      # @dependent = Dependent.new
      # @zone = Zone.new
      # NB: alternate way to get empty @dependent, @zone instances in render if @home.render fails
      # ^^^ woudl have to replicate across the other assessment_controllers, swapping out @home
      render "users/show"
    end
  end

  def generate_home_preps(user, home)
    @pb = UserPrepBuilder.new(user)
    @pb.generate_preps("home_interior") # generic stage:before home preps regardless of house/apt/etc.
    @pb.generate_preps("home_structure") if @home.is_house # home preps that a homeowner can work on but renter likely cannot.
    @pb.generate_preps("home_check")    # generic stage:after preps for all home types
    @pb.generate_preps("plan_home")
  end
end
