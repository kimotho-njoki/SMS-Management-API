exports.up = function(knex, Promise) {
  return knex.schema
                  .createTable('contacts', function(table) {
                    table.increments('contactId').primary().notNullable();
                    table.string('first_name', 50).notNullable().unique;
                    table.string('last_name', 50).notNullable().unique;
                    table.string('phone_number', 11).notNullable();
                    table.timestamp('created_at');
                    table.timestamp('updated_at');
                  })
                  .createTable('sms', function(table) {
                    table.increments('smsId').primary().notNullable();
                    table.string('message');
                    table.string('status');
                    table.timestamp('created_at');
                    table.timestamp('updated_at');

                    table.integer('sender_id').unsigned().references('contactId').inTable('contacts').onDelete('CASCADE');
                    table.integer('receiver_id').unsigned().references('contactId').inTable('contacts').onDelete('CASCADE');
                  });
};

exports.down = function(knex, Promise) {
  return knex.schema
                    .dropTableIfExists('sms')
                    .dropTableIfExists('contacts');
};
