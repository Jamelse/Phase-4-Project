class UsersController < ApplicationController
  skip_before_action :unauthorized_error_message, only: [:create]

  def create 
    user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user, status: :created
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user, status: :accepted
  end

  def reset
    user = user = User.find_by(id: session[:user_id])
    user.expenses.destroy_all
    render json: {}, status: :no_content
  end

  private

  def user_params
    params.permit(:email, :password, :first_name, :last_name, :income)
  end
end
