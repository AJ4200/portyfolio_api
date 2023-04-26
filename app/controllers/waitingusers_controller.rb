class WaitingusersController < ApplicationController
    def index
      @waitingusers = Waitinguser.all
      render json: @waitingusers
    end
  
    def show
      @waitinguser = Waitinguser.find(params[:id])
      render json: @waitinguser
    end
  
    def create
      @waitinguser = Waitinguser.new(waitinguser_params)
  
      if @waitinguser.save
        render json: @waitinguser, status: :created
      else
        render json: @waitinguser.errors, status: :unprocessable_entity
      end
    end
  
    def update
      @waitinguser = Waitinguser.find(params[:id])
  
      if @waitinguser.update(waitinguser_params)
        render json: @waitinguser
      else
        render json: @waitinguser.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @waitinguser = Waitinguser.find(params[:id])
      @waitinguser.destroy
    end
  
    private
  
    def waitinguser_params
      params.require(:waitinguser).permit(:email)
    end
  end
  