class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.string :sub_word
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
