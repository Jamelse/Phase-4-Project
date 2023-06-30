class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :paid_on, :category
end
