class ContactAssessmentController < ApplicationController
  def api
    @contacts = current_user.contacts
    render :json => @contacts
  end

  def create
    @contact = Contact.new(contact_params)
    @contact.user_id = current_user.id
    if @contact.save
      generate_contact_preps(current_user)
      render json: { contact: @contact, success: "Contact Added" }
    elsif @contact.errors
      render json: { contact: @contact, errors: @contact.errors.full_messages }, status: 422
    end
  end

  def update
    @contact = Contact.find(params[:id])
    @contact.assign_attributes(contact_params)
    if @contact.save
      generate_contact_preps(current_user)
      render json: { contact: @contact, success: "Contact Updated" }
    elsif @contact.errors
      render json: { contact: @contact, errors: @contact.errors.full_messages }, status: 422
    end
  end

  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    destroy_contact_userpreps if !current_user.has_contacts? #clean out UserPreps for Contacts if there are no Contacts.
    head :ok
  end

  def destroy_contact_userpreps
    UserPrep.where(prep_subtype: "plan_contact", user_id: current_user.id).destroy_all
  end

  def generate_contact_preps(user)
    @pb = UserPrepBuilder.new(user)
    @pb.generate_preps("plan_contact")
  end

  private
  def contact_params
    # params.require(:contact).permit(:name, :email, :phone, :out_of_area)
    params.permit(:name, :email, :phone, :out_of_area)
  end
end
