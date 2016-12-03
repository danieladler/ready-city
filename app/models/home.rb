class Home < ApplicationRecord
  belongs_to :user, optional: true
  # validates_presence_of :is_house # TODO: think about if we need this validation.
  validates_presence_of :zip, :user
  validates :zip, length: { is: 5 }
      # NB: chose to validate zip but not other address fields as a user may
      # not want to share their full address, but they should be required to
      # share zip code so that app can provide information relevant to their
      # general vicinity.

  def self.load_home(current_user)
    if current_user.home
      @home = self.find_by(user_id: current_user.id)
    else
      @home = Home.new(user_id: current_user.id)
    end
  end

  def update_db_values(params)
    self.address                 = params[:home][:address]
    self.city                    = params[:home][:city]
    self.state                   = params[:home][:state]
    self.zip                     = params[:home][:zip]
    self.is_house                = params[:home][:is_house]
    self.floor_count             = params[:home][:floor_count].to_i
    self.year_built              = params[:home][:year_built].to_i
    # self.filter_house_specific_fields(params)
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
