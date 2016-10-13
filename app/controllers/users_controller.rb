class UsersController < ApplicationController
  def sign_up
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # session[:user_id] = @user.id # TODO: add sessions!
      redirect_to root_path
      flash[:success] = "Account created. Welcome to Ready City!"
    else
      flash[:error] = "username and/or e-mail are already taken."
      render :sign_up
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
