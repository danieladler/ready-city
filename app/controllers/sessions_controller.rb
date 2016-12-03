class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user == nil
      redirect_to root_path
      flash[:error] = 'Account does not exist'
    elsif @user.authenticate(params[:password])
      session[:user_id] = @user.id
      if @user.admin == true
        redirect_to admin_preparations_path
      else
        @user.generate_all_user_preps
        redirect_to root_path
      end
    else
      redirect_to root_path
      flash[:error] = "Wrong username or password"
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
