class Contact < ApplicationRecord
  belongs_to :user

  def update_db_values(params)
    self.name        = params[:contact][:name]
    self.email       = params[:contact][:email]
    self.phone       = params[:contact][:phone]
    self.out_of_area = params[:contact][:out_of_area]
  end
end
