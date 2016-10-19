class UsersController < ApplicationController
  def sign_up
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # TODO: add sessions!
      # session[:user_id] = @user.id
      redirect_to user_path(id: @user.id)
      flash[:success] = "Account created. Welcome to Ready City!"
    else
      @errors = []
      @user.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render :sign_up
    end
  end

  def show
    if current_user == nil
       redirect_to root_path
       flash[:error] = "Sign in to view your profile"
    elsif params[:id].to_i != current_user.id
      redirect_to root_path
      flash[:error] = "You may only view your own profile"
    else
      @user = current_user
    end
    load_assessment_data
  end

  def load_assessment_data
    @home = Home.load_home(current_user)
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
