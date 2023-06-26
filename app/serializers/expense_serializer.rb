class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :date, :paid, :category
end
