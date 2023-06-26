class ExpensesController < ApplicationController

  def index
    render json: Expense.all
  end

  def create
    expenses = Expense.create!(expense_params)
    render json: expenses, status: :created
  end

  def update
    expense = Expense.find(params[:id])
    expense.update!(expense_params)
    render json: expense, status: :accepted
  end

  def destroy
    expense = Expense.find(params[:id])
    expense.destroy
    render json: {}, status: :no_content
  end

  private



  def expense_params
    params.permit(:name, :amount, :date, :paid, :user_id, :category_id)
  end
end
