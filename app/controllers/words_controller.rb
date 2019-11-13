class WordsController < ApplicationController
    def create
        # should have a param of a word
        # byebug
        word=params["word"]
        response = Word.lookup(word)
        
        
        
        if response.error
            render json: {error: "word not valid"},status: :not_found
        else
            # is a word
            # create a new word and associate to game
            render json: {word: word}
        end
    end
end
