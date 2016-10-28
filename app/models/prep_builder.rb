
class PrepBuilder
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :user_id

  def initialize(user)
    @user_id = user.id
    # @user = user
  end

  def generate_preps(prep_subtype, options)
    Preparation.where(prep_subtype: prep_subtype).each do |p|
      @prep = UserPrep.find_or_create_by(
        user_id: user_id,
        prep_id: p.id,
        keyword: p.keyword,
        prep_type: p.prep_maintype,
        instructions: p.instructions
      )

      if p.variable_quantity_type == 'by_user' || p.variable_quantity_type == 'N/A'
        @prep.update(total_cost_in_cents: (p.base_cost_in_cents))
      elsif p.variable_quantity_type == 'by_dependent'
        @prep.update(
          total_cost_in_cents: (
            p.base_cost_in_cents *
            options[:consumer_multiplier]
          )
        )
      elsif p.variable_quantity_type == 'by_day'
        @prep.update(
          total_cost_in_cents: (
            p.base_cost_in_cents *
            options[:consumer_multiplier] *
            @prep.user.days_to_cover
          )
        )
      end
    end
  end
end
