class UsersController < ApplicationController
  def sign_up
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.admin = false
    @user.days_to_cover = 3 # default
    if @user.save
      session[:user_id] = @user.id
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

  def api
    @user = current_user
    @allowable_attrs = {
      id: current_user.id,
      username: current_user.username,
      email: current_user.email,
      days_to_cover: current_user.days_to_cover
    }
    render :json => @allowable_attrs
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
    current_user.generate_all_user_preps
    # load_assessment_data
  end

  def update
    current_user.update(user_params)
    current_user.generate_all_user_preps # regenerate all preps so that those with variable quantities impacted by changing days_to_cover are updated.
    flash[:success] = "User Updated"
    render json: current_user
    # redirect_to user_path(current_user)
  end

  def load_assessment_data
    @home = Home.load_home(current_user)
    @dependents = current_user.dependents.where(human: true).map {|d| ["#{d.name}", d.id]}
    @dependents.unshift(["Me", nil])
    # ^^ this puts all of current_user's human dependents into the right format
    # for displaying in a <select> dropdown, to assign dependent_id to a Zone
    @dependent = Dependent.new
    # ^^ this pre-loads a Dependent instance for creating a new Dependent; the
    # form_helper that requires it is in _depdendent_assessment_form template
    @zone = Zone.new
    @contact = Contact.new
    # ^^ same as above comment, but for Zones & Contacts
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :days_to_cover)
  end
end
