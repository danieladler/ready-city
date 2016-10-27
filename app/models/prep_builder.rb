class PrepBuilder
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :user_id

  def initialize(user)
    @user_id = user.id
  end

  def generate_preps(prep_subtype, options)
    Preparation.where(prep_subtype: prep_subtype).each do |p|
      @prep = UserPrep.find_or_create_by(
        user_id: user_id,
        prep_id: p.id,
        keyword: p.keyword,
        prep_type: prep_maintype,
        instructions: p.instructions
      )

      if p.variable
        @prep.update(
          total_cost_in_cents: (p.base_cost_in_cents * options[:people_multiplier])
        )
      end
    end
  end
end
