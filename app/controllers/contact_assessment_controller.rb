class ContactAssessmentController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    @contact.user_id = current_user.id
    if @contact.save
      # generate_contact_preps(current_user)
      flash[:success] = "Contact Added"
      redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    elsif @contact.errors
      @errors = []
      @contact.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render "users/show", locals: {home: current_user.home}
    end
  end

  def update
    raise
  end

  def destroy
    raise
  end

  private
  def contact_params
    params.require(:contact).permit(:name, :email, :phone, :out_of_area)
  end
end
