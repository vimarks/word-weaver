class Board < ApplicationRecord
  has_many :games
  has_many :users, through: :games
  has_many :words, through: :games

end
