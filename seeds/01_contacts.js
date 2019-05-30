
exports.seed = function(knex, Promise) {

  const tableName = 'contacts';

  const rows = [
    {
      contactId: 1,
      first_name: 'Billie',
      last_name: 'Jean',
      phone_number: '0948948989',
    },
    {
      contactId: 2,
      first_name: 'Michael',
      last_name: 'Jackson',
      phone_number: '0893784783',
    },
  ];

  return knex ( tableName )
            .del()
            .then( function() {
              return knex.insert(rows).into(tableName);
            });
};
