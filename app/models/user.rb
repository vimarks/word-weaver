class User < ApplicationRecord
  has_many :games
  has_many :boards, through: :games
  has_many :words, through: :games
end
