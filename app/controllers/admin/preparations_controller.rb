class Admin::PreparationsController < AdminController
  def preparations
    # show all preps
    @preparations = Preparation.all
  end
end
