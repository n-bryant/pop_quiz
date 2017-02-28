class UsersController < ApplicationController
  # GET /users
  def index
    @users = User.all

    email = params[:email]
    unless email.blank?
      @users = User.find_by(email: email)
    end

    search = params[:search]
    unless search.nil?
      @users = User.where("username ILIKE ?", "%#{search}%")
    end

    render json: @users
  end

  # GET /users/1
  def show
    @user = User.find_by_id(params[:id])
    render json: @user
  end
end
