class CreateWaitingusers < ActiveRecord::Migration[6.1]
  def change
    unless table_exists?(:waitingusers)
      create_table :waitingusers do |t|
        t.text :email, null: false
        t.timestamps
      end
    end
  end
end
