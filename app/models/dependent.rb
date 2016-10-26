class Dependent < ApplicationRecord
  belongs_to :user
  validates_presence_of :name
  # validates_uniqueness_of :name, scope: :user
  validates :name, :uniqueness => { :scope => [:user_id] }
end
