class UserPrepBuilder
  include ActiveModel::Model
  include ActiveModel::Validations

  attr_accessor :user_id,
                :constant_quantity_prep_subtypes,
                :variable_quantity_prep_subtypes,
                :home_prep_subtypes,
                :dependent_prep_subtypes,
                :contact_prep_subtypes,
                :zone_prep_subtypes

  def initialize(user)
    @user    = user
    @user_id = user.id
    @home_prep_subtypes = %w(
      home_interior home_check plan_home
    )
    @house_prep_subtypes = %w(
      home_structure
    )
    @dependent_human_prep_subtypes = %w(
      plan_dependent_human
    )
    @dependent_pet_prep_subtypes = %w(
      plan_dependent_pet
    )
    @variable_quantity_prep_subtypes = %w(
      gear_human gear_pet
    )
    @contact_prep_subtypes = %w(
      plan_contact
    )
    @zone_prep_subtypes = %w(
      plan_zone
    )
    @generic_prep_subtypes = %w(
      plan_check
    )
  end

  def generate_all_user_preps
    # generate ceratin user_preps conditionally based on the user's associations
    self.generate_constant_quantity_user_preps(@house_prep_subtypes) if @user.home && @user.home.is_house == true
    self.generate_constant_quantity_user_preps(@dependent_human_prep_subtypes) if @user.people_in_household > 1
    self.generate_constant_quantity_user_preps(@dependent_pet_prep_subtypes) if @user.pets_in_household > 0
    self.generate_constant_quantity_user_preps(@contact_prep_subtypes) if @user.has_contacts?
    self.generate_constant_quantity_user_preps(@zone_prep_subtypes) if @user.has_zones?
    # generate user_preps common to all users
    self.generate_constant_quantity_user_preps(@home_prep_subtypes)
    self.generate_constant_quantity_user_preps(@generic_prep_subtypes)
    # generate user_preps where variable quantity affects total_cost_in_cents
    self.generate_variable_quantity_user_preps
  end

  def generate_constant_quantity_user_preps(prep_subtype_array)
    prep_subtype_array.each do |prep_subtype|
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
