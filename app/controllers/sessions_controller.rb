class SessionsController < ApplicationController

  def sign_in
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user == nil
      flash[:error] = 'Account does not exist'
      render :sign_in
    elsif @user.authenticate(params[:password])
      session[:user_id] = @user.id
      if @user.admin == true
        redirect_to admin_preparations_path
      else
        @user.generate_all_user_preps
        redirect_to root_path
      end
    else
      flash[:error] = "Wrong username or password"
      render :sign_in
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
