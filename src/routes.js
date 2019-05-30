const knex = require('./knex');

const routes = [
  {
    method: 'GET',
    path: '/sms',
    handler: (request, h) => {
      return knex('sms')
                .where({ status : 'sent' })
                .select('smsId', 'message', 'status', 'sender_id', 'receiver_id')
                .then((results) => {
                  if (results.length === 0) {
                    return "There are no messages yet";
                  }

                  return results;
                }).catch((err) => {
                  return "An error occurred. Please try again.";
                });
    }
  },

  {
    method: 'POST',
    path: '/{contactId}/sms',
    handler: (request, h) => {
      const { message, receiver_id } = request.payload;

      let hasID;

      return knex('contacts')
                .select('contactId')
                .then((results) => {
                  if (results.length === 0) {
                    return "Sorry we do not have any contacts at the moment."
                  }

                  return results.map((result) => {
                    let param = request.params.contactId
                    hasID = result.contactId ==  param ? true : false
                  });
                }).then(() => {
                  if(!hasID) {
                    return "Sorry, that contact ID does not exist."
                  }

                  return knex('sms')
                              .insert({
                                  message,
                                  receiver_id,
                                  sender_id: request.params.contactId,
                                  status: 'sent'
                                })
                                .then((response) => {
                                  return "Message sent successfully"
                                }).catch((err) => {
                                  return "An error occurred. Please try again."
                                })
                }).catch((err) => {
                  return "An error occurred. Please try again."
                });
    }
  },

  {
    method: 'GET',
    path: '/sms/sent/{contactId}',
    handler: (request, h) => {
      return knex('sms')
                .where({ sender_id: request.params.contactId })
                .select('smsId', 'message', 'receiver_id')
                .then((results) => {
                  if(results.length === 0) {
                    return "There are no messages for that sender ID."
                  }

                  return results;
                }).catch((err) => {
                  return "An error occurred. Please try again."
                })
    }
  },

  {
    method: 'GET',
    path: '/sms/received/{contactId}',
    handler: (request, h) => {
      return knex('sms')
                .where({ receiver_id: request.params.contactId })
                .select('smsId', 'message', 'sender_id')
                .then((results) => {
                  if(results.length === 0) {
                    return "There are no messages for that receiver ID."
                  }

                  return results;
                }).catch((err) => {
                  return "An error occurred. Please try again."
                })
    }
  },

  {
    method: 'DELETE',
    path: '/sms/delete/{contactId}/{smsId}',
    handler: (request, h) => {
      return knex('sms')
                .where({ smsId: request.params.smsId, sender_id: request.params.contactId })
                .del()
                .then((results) => {
                  if (results === 0) {
                    return "Sorry, the sms ID does not exist"
                  }

                  return "Message deleted successfully"
                }).catch((err) => {
                  return "An error occurred. Please try again."
                });
    }
  },

  {
    method: 'POST',
    path: '/contact',
    handler: (request, h) => {
      const { first_name, last_name, phone_number } = request.payload;
      return knex('contacts')
                .insert({
                  first_name,
                  last_name,
                  phone_number
                })
                .then((response) => {
                  return `Contact successfully created with ID ${response}`;
                }).catch((err) => {
                  return "An error occurred. Please try again.";
                });
    }
  },

  {
    method: 'GET',
    path: '/contacts',
    handler: (request, h) => {
      return knex('contacts')
                .select('contactId', 'first_name', 'last_name', 'phone_number')
                .then((results) => {
                  if(results.length === 0) {
                    return "There are no contacts yet";
                  }

                  return results;
                }).catch((err) => {
                  return "An error occurred. Please try again.";
                });
    }
  },

  {
    method: 'GET',
    path: '/contacts/{contactId}',
    handler: (request, h) => {
      return knex('contacts')
                .where({ contactId: request.params.contactId })
                .select('contactId', 'first_name', 'last_name', 'phone_number')
                .then((results) => {
                  if(results.length === 0) {
                    return "The contact ID does not exist"
                  }

                  return results;
                }).catch((err) => {
                  return "An error occurred. Please try again."
                });
    }
  },

  {
    method: 'DELETE',
    path: '/contacts/delete/{contactId}',
    handler: (request, h) => {
      return knex('contacts')
                .where({ contactId: request.params.contactId })
                .del()
                .then((results) => {
                  if (results === 0) {
                    return "Sorry, the contact ID does not exist"
                  }

                  return "Contact deleted successfully"
                }).catch((err) => {
                  return "An error occurred. Please try again."
                });
    }
  }
]

module.exports =  routes;
