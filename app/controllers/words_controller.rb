class WordsController < ApplicationController
    def create
        # should have a param of a word
        # byebug
        word=params["word"]
        game_id = params["game_id"].to_i
        oxford_api_response = Word.lookup(word)
        

        
        
        if oxford_api_response.error

            render json: {error: "word not valid"},status: :not_found
        else
            # is a word
            # create a new word and associate to game
            # default game_id sent is zero
            if game_id != 0
                Word.create(sub_word: word, game_id: game_id)
            end
            render json: {word: word}
        end
    end
    def index
        render json: Word.all
    end
end
