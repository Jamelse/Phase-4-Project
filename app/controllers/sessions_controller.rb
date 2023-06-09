class SessionsController < ApplicationController 
  skip_before_action :unauthorized_error_message, only: [:create]
  
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    render json: {}, status: :no_content
  end

end