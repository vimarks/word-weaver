class WordsController < ApplicationController
    def create
        # should have a param of a word
        # byebug
        word=params["word"]
        oxford_api_response = Word.lookup(word)
        
        
        
        if oxford_api_response.error
            render json: {error: "word not valid"},status: :not_found
        else
            # is a word
            # create a new word and associate to game
            render json: {word: word}
        end
    end
end
