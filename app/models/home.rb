class Home < ApplicationRecord
  belongs_to :user, optional: true
  # validates_presence_of :is_house # TODO: think about if we need this validation.
  validates_presence_of :zip, :user
  validates :zip, length: { is: 5 }
      # NB: chose to validate zip but not other address fields as a user may
      # not want to share their full address, but they should be required to
      # share zip code so that app can provide information relevant to their
      # general vicinity.

  def self.load_homes(current_user)
    if current_user.home
      @homes = self.where(user_id: current_user.id)
      # NB: this returns an activeRecord association which the API consumes
      # as an array – which is what we want, so that it can be rendered correctly
      # via Redux as a redux-form with initialValues.
    else
      @homes = [ Home.new(user_id: current_user.id) ]
      # NB: this is wrapped in an array so that it can be rendered correctly
      # per above. 
    end
  end

  def is_house?
    self.is_house ? true : false
  end

  # def filter_house_specific_fields(params)
  #   if self.is_house == false
  #     self.fdn_bolted         = nil
  #     self.structure_material = nil
  #   else
  #     self.fdn_bolted         = params[:fdn_bolted]
  #     self.structure_material = params[:structure_material]
  #   end
  # end
end
