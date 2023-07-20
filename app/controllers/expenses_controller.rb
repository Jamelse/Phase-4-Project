class ExpensesController < ApplicationController

  def index
    render json: Expense.all
  end

  def show 
    expense = Expense.find(params[:id])
    render json: expense
  end

  def create
   render json: Expense.create!(expense_params), status: :created
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
    params.permit(:name, :amount, :date, :user_id, :category_id)
  end
end
