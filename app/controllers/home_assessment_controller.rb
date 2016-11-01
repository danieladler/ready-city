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
      render "users/show"
    end
  end

  def generate_home_preps(user, home)
    @pb = UserPrepBuilder.new(user)
    @pb.generate_preps("home") # generic home preps regardless of house/apt/etc.
    @pb.generate_preps("house") if @home.is_house
  end
end
