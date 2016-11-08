class UsersController < ApplicationController
  def sign_up
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.admin = false
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

  def update
    current_user.update(user_params)
    d = DependentAssessmentController.new
    d.generate_dependent_preps(current_user)
    # re-run UserPrepBuilder (via DependentAssessmentController) for all of this
    # user's UserPreps where total_cost varies based on user's # of days_to_cover
    # TODO: run this same check but using a method on the user or user's
    # UserPreps, not through DependentAssessmentController.
    flash[:success] = "User Updated"
    redirect_to user_path(current_user)
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
