class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses do |t|
      t.string :name
      t.integer :amount, default: 0
      t.date :paid_on
      t.integer :user_id
      t.integer :category_id
    end
  end
end
