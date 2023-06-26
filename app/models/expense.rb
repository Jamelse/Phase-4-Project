class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :name, presence: true
  validates :amount, presence: true, allow_nil: false
  validates :date, presence: true
end
