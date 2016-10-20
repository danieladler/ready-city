class HomeAssessmentController < ApplicationController
  def update_home
    @home ||= Home.load_home(current_user)
    @home.update_db_values(params)
    if @home.save
      generate_home_preps(current_user)
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
    # if @home.invalid?
    #   @errors = []
    #   @home.errors.each do |column, message|
    #     @errors << column.to_s + ": " + message.to_s
    #   end
    #   flash[:error] = @errors
    #   render "users/show"
    # else
    #   @home.save
    #   flash[:success] = "Home Updated"
    #   redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    # end
  end

  def generate_home_preps(user)
    @pb = PrepBuilder.new(user)
    @pb.generate_home_preps
  end
end
