class HomeAssessmentController < ApplicationController
  def update_home
    @home ||= Home.load_home(current_user)
    @home.update_db_values(params)
    if @home.invalid?
      @errors = []
      @home.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render "users/show"
    else
      @home.save
      flash[:success] = "Home Updated"
      redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    end
    # TODO: add assessment checks
  end
end
