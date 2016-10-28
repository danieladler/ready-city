class DependentAssessmentController < ApplicationController
  def create
    @dependent = Dependent.new(dependent_params)
    @dependent.user_id = current_user.id
    if @dependent.save
      generate_dependent_preps(current_user)
      flash[:success] = "Dependent Added"
      redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    elsif @dependent.errors
      @errors = []
      @dependent.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render "users/show"
    end
  end

  def update
    @dependent = Dependent.find(params[:id])
    @dependent.update_db_values(params)
    if @dependent.save
      generate_dependent_preps(current_user)
      flash[:success] = "Dependent Updated"
      redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    elsif @dependent.errors
      @errors = []
      @dependent.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render "users/show"
    end
  end

  def destroy
    @dependent = Dependent.find(params[:id])
    @dependent.destroy
    flash[:notice] = "Dependent Deleted"
    redirect_to user_path(current_user.id)
  end

  def generate_dependent_preps(user)
    @pb = PrepBuilder.new(user)
    @pb.generate_preps("gear_pet", options={consumer_multiplier: user.pets_in_household}) if user.pets_in_household > 0
    @pb.generate_preps("gear_human", options = {consumer_multiplier: user.people_in_household})
    # @pb.generate_preps("plan")
  end

  private
  def dependent_params
    params.permit(:id, :human, :name)
  end
end
