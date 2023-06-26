class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses do |t|
      t.string :name
      t.integer :amount, default: 0
      t.date :date
      t.boolean :paid, default: false
      t.integer :user_id
      t.integer :category_id
      
      t.timestamps
    end
  end
end
