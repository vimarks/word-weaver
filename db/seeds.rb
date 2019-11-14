# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Word.destroy_all
Game.destroy_all
Board.destroy_all
User.destroy_all

b1 = Board.new()
b1.new_letters
b1.save
b2 = Board.new()
b2.new_letters
b2.save

player1 = User.create(username:"player1")
player2 = User.create(username:"player2")
player3 = User.create(username:"player3")
player4 = User.create(username:"player4")
player5 = User.create(username:"player5")
player6 = User.create(username:"player6")

game1 = Game.create(user: player1, board: b1)
game2= Game.create(user: player2, board: b1)
game3 = Game.create(user: player3, board: b1)
game4 = Game.create(user: player4, board: b2)
game5 = Game.create(user: player5, board: b2)
game6 = Game.create(user: player6, board: b2)

word1 = Word.create(sub_word: "test1", game: game1)
word2 = Word.create(sub_word: "test2", game: game2)
word3 = Word.create(sub_word: "test3", game: game2)
word4 = Word.create(sub_word: "test4", game: game3)
word5 = Word.create(sub_word: "test5", game: game3)
word6 = Word.create(sub_word: "test6", game: game3)
word7 = Word.create(sub_word: "test7", game: game4)
word8 = Word.create(sub_word: "test8", game: game4)
word9 = Word.create(sub_word: "test9", game: game4)
word10 = Word.create(sub_word: "test10", game: game5)

