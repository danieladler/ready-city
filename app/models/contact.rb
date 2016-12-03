class Contact < ApplicationRecord
  belongs_to :user
  validates_presence_of :name, :email
  validates_inclusion_of :out_of_area, in: [true, false]
  validates :email, format: {with: /@/}
  validates_uniqueness_of :name, scope: :user

  def update_db_values(params)
    self.name        = params[:contact][:name]
    self.email       = params[:contact][:email]
    self.phone       = params[:contact][:phone]
    self.out_of_area = params[:contact][:out_of_area]
  end
end
