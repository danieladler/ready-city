require 'rails_helper'
require 'pry'

describe DependentAssessmentController, type: :controller do
  let(:user) { create(:user) }
  let(:pb) { build(:user_prep_builder) }

  before(:each) do
    stub_current_user(user)
  end

  it "test" do
    binding.pry
  end
end
