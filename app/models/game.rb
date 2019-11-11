class Game < ApplicationRecord
  belongs_to :board
  belongs_to :user
end
