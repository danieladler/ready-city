class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  rescue_from ActiveRecord::RecordNotFound do
    redirect_to root_path, notice: "Oops, couldn't find that page"
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    end
  end

  def logged_in?
    current_user != nil
  end
end
