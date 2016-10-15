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
    else
      flash[:error] = "Wrong username or password"
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
