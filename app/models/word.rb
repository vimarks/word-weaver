
class Word < ApplicationRecord
  belongs_to :game
  def self.lookup(word)
    
        # make the right url to call
        # make a request header with our api id and key
        # if response is 200, word is okay, if response is 404, word is bad
        # otherwise throw error
        # url = "https://od-api.oxforddictionaries.com/api/v2/lemmas/en/"
        # puts "key check"
        # puts ENV['OXFORD_API_APP_KEY']
        
        # response = HTTP.headers("accept" => "application/json", "app_id" => ENV['OXFORD_API_APP_ID'],
        # "app_key" => ENV['OXFORD_API_APP_KEY']).get('http://localhost:8080')
        # puts response
        client = OxfordDictionary::Client.new(app_id: ENV['OXFORD_API_APP_ID'], app_key: ENV['OXFORD_API_APP_KEY'])
        response = client.lemma(word: word, language: 'en', params: {})
      puts response
      return response
  end
end
