class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :date, :category_id, :show_cat

  def show_cat 
    self.object.category.name
  end
end
