class Admin::PreparationsController < AdminController
  def preparations
    @preparations = Preparation.all
    @preparation = Preparation.new
  end

  def create
    @preparation = Preparation.new(preparation_params)
    if @preparation.save
      flash[:success] = "New Preparation Created"
      redirect_to admin_preparations_path
    else
      @errors = []
      @preparation.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      @preparations = Preparation.all
      render :preparations
    end
  end

  def edit
    @preparation = Preparation.find(params[:id])
  end

  def update
    @preparation = Preparation.find(params[:id])
    if @preparation.update(preparation_params)
      flash[:success] = "Preparation Updated"
      redirect_to admin_preparations_path
    else
      @errors = []
      @preparation.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      @preparations = Preparation.all
      render :edit
    end
  end

  def destroy
    @preparation = Preparation.find(params[:id])
    @preparation.destroy
    flash[:notice] = "Preparation Deleted"
    redirect_to admin_preparations_path
  end

  private
  def preparation_params
    params.require(:preparation).permit(:prep_type, :keyword, :instructions, :base_cost_in_cents)
  end
end
