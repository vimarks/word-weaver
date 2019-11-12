class WordsController < ApplicationController
    def create
        # should have a param of a word
        word="swomling"
        
        
       
        
        response = Word.lookup(word)
        if response.error
            # not a word
        else
            # is a word
        end
    end
end
