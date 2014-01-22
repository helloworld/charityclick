# Charity Click


Made for for One &amp; Together


Charity click is built with [meteor.js](https://www.meteor.com)

### Required Packages

- accounts-ui
- Pure

### Editing Upgrades 

Simply modify the Items array in model.js

```javascript

Items = [
		{name: "Item 1", cost: 500, description: "Description 1"}, 
		{name: "Item 2", cost: 1000, description: "Description 2."}, 
		{name: "Item 3", cost: 1500, description: "Description 3"}, 
		{name: "Item n", cost: 2000, description: "Description n"}
		];

```

### Modify Cost to Rate ratio and Click value

Ratio is currently  a linear 500:1. ($500 dollars in cost translates into $1 increase in rate). In the future, this will be an inverse ratio (as the price increases, the ratio will decrease)

The value of the click button is currently $25.

Both of these functions can be found in server.js.

```javascript

 Meteor.methods({
  buy: function(amount) {
    if(Meteor.user().money >= amount && amount > 0) 
      Meteor.users.update({_id: this.userId}, {$inc: {'rate': (Math.floor(amount/500)), 'money': (0-amount)}}); //Change the ratio of cost to rate
  },
  click: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 25}}); //Modify the click value
  },
})

```

### Changing the update rate 

Change the setInterval() function in server.js. It is currently set to every second (1000 milliseconds).

```javascript

 Meteor.startup(function () {
    Meteor.setInterval(function() {
      Meteor.users.find({}).map(function(user) {
        Meteor.users.update({_id: user._id}, {$inc: {'money': user.rate}})
      });
    }, 1000) //You can change this number
  });

```

### Todo

- [ ] Create login page
- [ ] Make upgrades to increase value of click button
- [ ] Make upgrades follow an exponential scale (currently linear)
- [ ] Block console spam for all browsers (currently only blocks Chrome)



