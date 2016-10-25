class Admin::PreparationsController < AdminController
  def preparations
    @preparations = Preparation.all
  end

  def create
    @preparation = Preparation.new(preparation_params)
    if @preparation.save
      flash[:success] = "New Preparation Created"
    else
      @errors = []
      @preparation.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render :preparations
    end
  end

  def update
    @preparation = Preparation.find(params[:id])
    @preparation.update(preparation_params)
    # @line_item.update(params.require(:line_item).permit(:quantity, :order_id))
  end

  private
  def preparation_params
    params.require(:preparation).permit(:prep_type, :keyword, :instructions, :base_cost_in_cents)
  end
end
