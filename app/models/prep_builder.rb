class PrepBuilder
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :user_id

  def initialize(user)
    @user_id = user.id
  end

  # def generate_home_preps
  def generate_preps(prep_type)
    Preparation.where(prep_type: prep_type).each do |p|
      @prep = UserPrep.find_or_create_by(
        user_id: user_id,
        prep_id: p.id,
        keyword: p.keyword,
        prep_type: prep_type,
        instructions: p.instructions
      )
    end
  end

  def generate_house_only_preps
  end
end
