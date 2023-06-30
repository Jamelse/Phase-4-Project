class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :total_expense_cost

  def total_expense_cost
    self.object.expenses.sum(:amount)
  end
end
