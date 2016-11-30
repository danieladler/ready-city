class DependentAssessmentController < ApplicationController
  def dependents
    @dependents = current_user.dependents
    render :json => @dependents
  end

  def create
    @dependent = Dependent.new(dependent_params)
    @dependent.user_id = current_user.id
    if @dependent.save
      flash[:success] = "Dependent Added"
      render json: @dependent
      generate_dependent_preps(current_user)
    elsif @dependent.errors
      @errors = []
      @dependent.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render "users/show", locals: {home: current_user.home}
    end
  end

  def update
    @dependent = Dependent.find(params[:id])
    @dependent.update_db_values(params)
    if @dependent.save
      flash[:success] = "Dependent Updated"
      render json: @dependent
      generate_dependent_preps(current_user)
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
    destroy_dependent_zones(@dependent.id)
    if @dependent.human == false
      UserPrep.where(user_id: current_user.id, prep_subtype: 'gear_pet').destroy_all
      # TODO: make sure this captures all user_preps for pets (not just gear_pet)
    end
    @dependent.destroy
    generate_dependent_preps(current_user)
      # re-run this method so that user_preps with prep_subtype gear_pet and
      # gear_human are updated with the new quantity of dependents. This has
      # the effect of reducing these user_preps' total_cost_in_cents to the
      # appropriate amount given # of dependents.
    head :ok
  end

  def generate_dependent_preps(user)
    @pb = UserPrepBuilder.new(user)
    @pb.generate_preps("gear_human", options = {consumer_multiplier: user.people_in_household})
    @pb.generate_preps("gear_check")
    @pb.generate_preps("plan_dependent_human")
    if user.pets_in_household > 0
      @pb.generate_preps("gear_pet", options = {consumer_multiplier: user.pets_in_household})
      @pb.generate_preps("plan_dependent_pet")
    end
  end

  def destroy_dependent_zones(dependent_id)
    Zone.where(dependent_id: dependent_id).destroy_all
  end

  private
  def dependent_params
    params.require(:dependent).permit(:id, :human, :name)
  end
end
