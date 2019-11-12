class Board < ApplicationRecord
  has_many :games
  has_many :users, through: :games
  has_many :words, through: :games
  
  validates :letter_pop, presence: true
  validates :letter_pop, length: { is: 16 }
  def new_letters
    if !self.letter_pop
      die0 = "A,A,C,I,O,T".split(",")
      die1 = "A,H,M,O,R,S".split(",")
      die2 = "E,G,K,L,U,Y".split(",")
      die3 = "A,B,I,L,T,Y".split(",")
      die4 = "A,C,D,E,M,P".split(",")
      die5 = "E,G,I,N,T,V".split(",")
      die6 = "G,I,L,R,U,W".split(",")
      die7 = "E,L,P,S,T,U".split(",")
      die8 = "D,E,N,O,S,W".split(",")
      die9 = "A,C,E,L,R,S".split(",")
      die10 = "A,B,J,M,O,Q".split(",")
      die11 = "E,E,F,H,I,Y".split(",")
      die12 = "E,H,I,N,P,S".split(",")
      die13 = "D,K,N,O,T,U".split(",")
      die14 = "A,D,E,N,V,Z".split(",")
      die15 = "B,I,F,O,R,X".split(",")
      
      dice = [die0, die1, die2, die3, die4, die5, die6, die7, die8, die9, die10, die11, die12, die13, die14, die15]
      # first you shuffle the order of the dice,
      #  then you pick a random side,
      #  then you shrink it to a string
      new_board = dice.shuffle.map{ |die| die[rand(1..6)-1]}.join()
      
      
      self.letter_pop = new_board
    end
  end
end
