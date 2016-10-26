class DependentAssessmentController < ApplicationController
  def create
    @dependent = Dependent.new(dependent_params)
    @dependent.user_id = current_user.id
    if @dependent.save
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
      # generate_dependent_preps(current_user, @dependent)
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

  def generate_dependent_preps(user, dependent)
    # NB: need to think through how I'm going to dynamically create gear & plan
    # preps based on each create/update of a Dependent

    # Things to consider:
    # Are there certain preps that'll be created for *each* new dependent added?
    # How will I handle updating preps that are updated based on qty of dependents? (i.e. food, water)

    # @pb = PrepBuilder.new(user)

    # @pb.generate_preps("plan")
    # @pb.generate_preps("gear")
  end

  private
  def dependent_params
    params.permit(:id, :human, :name)
  end
end
