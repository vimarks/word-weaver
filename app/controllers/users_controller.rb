class UsersController < ApplicationController

  def create
    newBoard = Board.new
    newBoard.new_letters
    newBoard.save
    gameArray = []
    userArray = []
    resource_params[:users].each do |user|
       if user[:username] != ""
         currentUser = User.create(user)
         userArray.push(currentUser)
         newGame = Game.create(user_id: currentUser.id, board_id: newBoard.id)
         gameArray.push(newGame)
       end
    end

    render json: {
      users: userArray,
      board: newBoard.letter_pop,
      games: gameArray
    }


  end






  def new

  end

  def resource_params
    params.permit(users: [:username])
  end

end
