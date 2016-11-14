class ContactAssessmentController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    @contact.user_id = current_user.id
    if @contact.save
      generate_contact_preps(current_user)
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
    @contact = Contact.find(params[:id])
    @contact.update_db_values(params)
    if @contact.save
      generate_contact_preps(current_user)
      flash[:success] = "Contact Updated"
      redirect_to user_path(current_user.id) # TODO: replace redirect w/ AJAX
    elsif @contact.errors
      @errors = []
      @contact.errors.each do |column, message|
        @errors << column.to_s + ": " + message.to_s
      end
      flash[:error] = @errors
      render "users/show"
    end
  end

  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    current_user.destroy_contact_userpreps if !current_user.has_contacts? #clean out UserPreps for Contacts if there are no Contacts.
    flash[:notice] = "Contact Deleted"
    redirect_to user_path(current_user.id)
  end

  def generate_contact_preps(user)
    @pb = UserPrepBuilder.new(user)
    @pb.generate_preps("plan_contact")
  end

  private
  def contact_params
    params.require(:contact).permit(:name, :email, :phone, :out_of_area)
  end
end
