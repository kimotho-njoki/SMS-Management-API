
exports.seed = function(knex, Promise) {

  const tableName = 'sms';

  const rows = [
    {
      smsId: 1,
      message: 'Hey, how are you?',
      status: 'sent',
      sender_id: 1,
      receiver_id: 2,
    },
  ];

  return knex( tableName )
              .del()
              .then( function() {
                return knex.insert(rows).into(tableName);
              });
};
