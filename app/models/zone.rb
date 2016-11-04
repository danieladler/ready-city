class Zone < ApplicationRecord
  belongs_to :user
  validates_presence_of :zip, :user
  validates :zip, length: { is: 5 }

  # this method returns Dependent associated through dependent_id, without
  # the Zone being in a belongs_to AR relationship with Dependent
  def dependent
    Dependent.find_by(id: self.dependent_id)
  end
end
