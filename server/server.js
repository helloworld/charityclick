  Accounts.onCreateUser(function(options, user) {
    user.money = 0;
    user.rate = 0;
    return user;
  })

  Meteor.publish("userData", function () {
    return Meteor.users.find({}, {sort: {'money': -1}});
  });

  Meteor.startup(function () {
    Meteor.setInterval(function() {
      Meteor.users.find({}).map(function(user) {
        Meteor.users.update({_id: user._id}, {$inc: {'money': user.rate}})
      });
    }, 10)

    

  });
  
Meteor.methods({
  buy: function(amount) {
    if(Meteor.user().money >= amount && amount > 0) 
      Meteor.users.update({_id: this.userId}, {$inc: {'rate': (Math.floor(amount/500)), 'money': (0-amount)}}); 
  },
  click: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 25}});
  },

})

