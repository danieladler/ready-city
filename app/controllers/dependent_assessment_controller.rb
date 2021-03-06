class DependentAssessmentController < ApplicationController
  def dependents
    @dependents = current_user.dependents
    render :json => @dependents
  end

  def create
    @dependent = Dependent.new(dependent_params)
    @dependent.user_id = current_user.id
    if @dependent.save
      generate_dependent_preps(current_user)
      render json: { dependent: @dependent, success: "Dependent Added" }
    elsif @dependent.errors
      render json: { dependent: @dependent, errors: @dependent.errors.full_messages }, status: 422
    end
  end

  def update
    @dependent = Dependent.find(params[:id])
    @dependent.assign_attributes(dependent_params)
    if @dependent.save
      generate_dependent_preps(current_user)
      render json: { dependent: @dependent, success: "Dependent Updated" }
    elsif @dependent.errors
      render json: { dependent: @dependent, errors: @dependent.errors.full_messages }, status: 422
    end
  end

  def destroy
    @dependent = Dependent.find(params[:id])
    destroy_dependent_zones(@dependent.id)
    @dependent.destroy
    destroy_obsolete_pet_user_preps if current_user.has_obsolete_pet_user_preps?
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
    if user.has_pets?
      @pb.generate_preps("gear_pet", options = {consumer_multiplier: user.pets_in_household})
      @pb.generate_preps("plan_dependent_pet")
    else
      destroy_obsolete_pet_user_preps
    end
  end

  def destroy_obsolete_pet_user_preps
    UserPrep.where(user_id: current_user.id, prep_subtype: 'gear_pet').destroy_all # delete UserPreps for pets if the user no longer has pets
    UserPrep.where(user_id: current_user.id, prep_subtype: 'plan_dependent_pet').destroy_all # delete UserPreps for pets if the user no longer has pets
    # TODO: make sure this captures all user_preps for pets (not just gear_pet)
  end

  def destroy_dependent_zones(dependent_id)
    Zone.where(dependent_id: dependent_id).destroy_all
  end

  private
  def dependent_params
    # TODO: troubleshoot strong params interaction w/ Redux – why does the
    # reducer apply the ENTIRE @dependent to the returned new state, instead
    # of just the attributes permitted in params?
    # params.require(:dependent).permit(:id, :human, :name)
    # ~*~*~*~*~*~*~*~*~
    params.permit(:id, :human, :name)
  end
end
