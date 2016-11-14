class Zone < ApplicationRecord
  belongs_to :user
  validates_presence_of :user, :address, :city, :state, :zip
  validates :zip, length: { is: 5 }
  validates_inclusion_of :zone_type, in: %w( zone_home zone_work zone_school zone_safety )

  # this method returns Dependent associated through dependent_id, without
  # the Zone being in a belongs_to AR relationship with Dependent
  def dependent
    Dependent.find_by(id: self.dependent_id)
  end

  def update_db_values(params)
    self.name         = params[:zone][:name]
    self.dependent_id = params[:zone][:dependent_id] # NB: TBD after figure out how to pass in dependents into <select> menu
    self.address      = params[:zone][:address]
    self.city         = params[:zone][:city]
    self.state        = params[:zone][:state]
    self.zone_type    = params[:zone][:zone_type]
    self.zip          = params[:zone][:zip]
  end
end
