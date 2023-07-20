class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :date, :category_id
end
