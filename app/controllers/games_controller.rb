class GamesController < ApplicationController
    def update
        
        
        # byebug
        # permit params
        game_ids = (params.permit( game_ids: []))["game_ids"]
        # open array of game ids and map it to make an array of hashes
        
        return_hash = game_ids.map do |game_id|
            # find game, username and words
            game = Game.find(game_id)
            if game
                user = game.user.username
                words = game.words.map{ |word| word.sub_word }
                {user: user, words: words}
            end
        end
        # fake return hash
        # return_hash = [
        #     {user: "test", words: ["abc","cde","fgh"]},
        #     {user: "test2", words: ["abc","cde","fgh","ijk"]},
        #     {user: "test3", words: ["abc","cde","fgh","ijk","lmn"]},
            
        # ]
        # byebug
        # send array back to front end
        render json: return_hash
    end
end
