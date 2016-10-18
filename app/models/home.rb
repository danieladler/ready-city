class Home < ApplicationRecord
  belongs_to :user, optional: true
  validates_presence_of :zip, :user
      # NB: chose to validate zip but not other address fields as a user may
      # not want to share their full address, but they should be required to
      # share zip code so that app can provide information relevant to their
      # general vicinity.

end
