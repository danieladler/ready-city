
class UserPrepBuilder
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :user_id

  def initialize(user)
    @user_id = user.id
  end

  def generate_preps(prep_subtype, options)
    Preparation.where(prep_subtype: prep_subtype).each do |p|
      @prep = UserPrep.where(user_id: user_id, keyword: p.keyword).first_or_create
      @prep.update(
        prep_id: p.id,
        keyword: p.keyword,
        prep_maintype: p.prep_maintype,
        prep_subtype: p.prep_subtype,
        instructions: p.instructions
      )

      if p.variable_quantity_type == 'by_user' || p.variable_quantity_type == 'N/A' # or nil
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
