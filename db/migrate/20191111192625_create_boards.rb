class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :letter_pop

      t.timestamps
    end
  end
end
