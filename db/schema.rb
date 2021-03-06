# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170201203902) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contacts", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.boolean  "out_of_area"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "dependents", force: :cascade do |t|
    t.integer  "user_id"
    t.boolean  "human"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "homes", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.integer  "zip"
    t.boolean  "is_house"
    t.integer  "floor_count"
    t.integer  "year_built"
    t.boolean  "fdn_bolted"
    t.boolean  "h20_strapped"
    t.string   "structure_material"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "preparations", force: :cascade do |t|
    t.string   "prep_maintype"
    t.string   "keyword"
    t.string   "instructions"
    t.integer  "base_cost_in_cents"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "variable_quantity_type"
    t.integer  "priority"
    t.string   "prep_subtype"
    t.boolean  "variable_action"
    t.string   "stage"
    t.integer  "tracker_id"
  end

  create_table "user_preps", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "prep_id"
    t.string   "prep_maintype"
    t.string   "keyword"
    t.text     "note"
    t.integer  "total_cost_in_cents"
    t.datetime "completed_at"
    t.boolean  "completed"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "instructions"
    t.string   "prep_subtype"
    t.string   "stage"
    t.integer  "priority"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.boolean  "admin"
    t.integer  "days_to_cover"
  end

  create_table "zones", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "dependent_id"
    t.string   "name"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.integer  "zip"
    t.string   "zone_type"
    t.boolean  "zone_primary"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

end
