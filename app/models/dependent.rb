class Dependent < ApplicationRecord
  belongs_to :user
  validates_presence_of :name
  validates_uniqueness_of :name, scope: :user

  def zones
    Zone.where(dependent_id: self.id).map {|z| z }
  end
end
