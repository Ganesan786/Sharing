angular.module('starter.services', [])

.factory('UsersInfo', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var users = [];
  var results = []; 
  return {
    all: function() {
      return users;
    },
    remove: function(users) {
      users.splice(users.indexOf(users), 1);
    },
    get: function(userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(userId)) {
          return users[i];
        }
      }
      return null;
    },
    result:function(){
       return results; 
    }
  };
});
