class UsersController < ApplicationController

  def create

    resource_params[:users].each do |user| if user[:username] != ""
      then User.create(user)
    end
  end
  
end






  def new

  end

  def resource_params
    params.permit(users: [:username])
  end

end
