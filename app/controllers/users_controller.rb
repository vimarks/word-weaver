class UsersController < ApplicationController
  def create
    puts "we hit the right route"
    # user = User.create
    render :json ["cool"]
  end

end
