class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: {with: /@/}
  has_secure_password
  has_one :home
  has_many :user_preps
  has_many :dependents

  def has_dependents?
    true if self.dependents.count > 0
  end
end
