class ExpensesController < ApplicationController

  def index
    render json: Expense.all
  end

  def show 
    expense = Expense.find(params[:id])
    render json: expense
  end

  def create
    user = User.find_by(id: session[:user_id])
    render json: user.expenses.create!(expense_params), status: :created
  end

  def update
    user = User.find_by(id: session[:user_id])
    expense = user.expenses.find(params[:id])
    expense.update!(expense_params)
    render json: expense, status: :accepted
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    expense = user.expenses.find(params[:id])
    expense.destroy
    render json: {}, status: :no_content
  end

  private

  def expense_params
    params.permit(:name, :amount, :date, :category_id)
  end
end
