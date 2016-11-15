class UserPrepBuilder
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :user_id,
                :constant_quantity_prep_subtypes,
                :variable_quantity_prep_subtypes

  def initialize(user)
    @user    = user
    @user_id = user.id
    @variable_quantity_prep_subtypes = %w(
      gear_human gear_pet
    )
    @constant_quantity_prep_subtypes = %w(
      home_structure home_interior home_check
      gear_check
      plan_home plan_dependent_human plan_dependent_pet plan_zone plan_contact plan_check
    )
  end

  def generate_all_user_preps
    self.generate_constant_quantity_user_preps
    self.generate_variable_quantity_user_preps
  end

  def generate_constant_quantity_user_preps
    @constant_quantity_prep_subtypes.each do |prep_subtype|
      self.generate_preps(prep_subtype)
    end
  end

  def generate_variable_quantity_user_preps
    self.generate_preps("gear_human", options = {consumer_multiplier: @user.people_in_household})
    if @user.pets_in_household > 0
      self.generate_preps("gear_pet", options = {consumer_multiplier: @user.pets_in_household})
    end
  end

  def generate_preps(prep_subtype, options = nil)
    Preparation.where(prep_subtype: prep_subtype).each do |p|
      @prep = UserPrep.where(user_id: user_id, keyword: p.keyword).first_or_create
      @prep.update(
        prep_id: p.id,
        keyword: p.keyword,
        prep_maintype: p.prep_maintype,
        prep_subtype: p.prep_subtype,
        instructions: p.instructions,
        stage: p.stage
      )

      # First condition generates prep_maintype: Home & Plan UserPreps, where quantity doesn't matter.
      if p.variable_quantity_type == 'N/A' # or nil
        @prep.update(
          total_cost_in_cents: 0
          # LATER: plan_zone route instructions vary based on zones passed in via options?
        )
      # Following conditions generate prep_maintype: Gear UserPreps by how quantity should be multipled, based on dependents & type of gear.
      elsif p.variable_quantity_type == 'by_user'
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
