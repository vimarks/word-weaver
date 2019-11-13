class WordsController < ApplicationController
    def create
        # should have a param of a word
        word="swomling"
        
        # create a new word and associate to game
       
        
        response = Word.lookup(word)
        if response.error
            # not a word
        else
            # is a word
        end
    end
end
