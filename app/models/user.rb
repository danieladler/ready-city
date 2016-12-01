class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: {with: /@/}
  has_secure_password
  has_one :home
  has_many :user_preps
  has_many :dependents
  has_many :zones
  has_many :contacts

  def has_dependents?
    true if self.dependents.count > 0
  end

  def people_in_household
    self.dependents.where(human: true).count + 1 # add 1 to count current_user!
  end

  def pets_in_household
    self.dependents.where(human: false).count
  end

  def has_pets?
    true if self.pets_in_household > 0
  end

  def has_obsolete_pet_user_preps?
    !self.has_pets? && UserPrep.where(user_id: self.id, prep_subtype: 'gear_pet').count > 0
  end

  def has_zones?
    true if self.zones.count > 0
  end

  def has_contacts?
    true if self.contacts.count > 0
  end

  def generate_all_user_preps
    @pb = UserPrepBuilder.new(self)
    @pb.generate_all_user_preps
  end
end
