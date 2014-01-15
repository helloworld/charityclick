
Items = [{name: "Jae", cost: 500}, {name: "Matthew", cost: 1000}, {name: "God", cost: 100000}, {name: "Sashank", cost: 100000000000}];

if (Meteor.isClient) {
 
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
  Meteor.subscribe('userData');

  
  Template.leaderboard.players = function () {
    return Meteor.users.find({}, {sort: {'money': -1}});
  };
  Template.once.items = function () {
    return Items;
  }
  Template.once.user = function () {
    return Meteor.user();
  }

  Template.leaderboard.items = function () {
    return Items;
  }
  Template.leaderboard.user = function () {
    return Meteor.user();
  }

 
  Template.once.events({
    'click input.code': function () {
      Meteor.call('click');
    }
  });

  Template.once.events({
    'click input.buy': function (event) {
      Meteor.call('buy', event.target.id); 
    }
  });

    Template.leaderboard.events({
    'click input.code': function () {
      Meteor.call('click');
    }
  });

  Template.leaderboard.events({
    'click input.buy': function (event) {
      Meteor.call('buy', event.target.id); 
    }
  });

  Handlebars.registerHelper('formatCurrency', function(number) {
    return number.toLocaleString();
  });



//Matthew is too cool.
var numDivs = 8;
var numPurchases = 4;
var yourClicks = 400;

$(function(){
    hideStuff(1);
    updatePurchasable();
    updateClicks();

//What you need to do is take all of the #men divs and put them into their own templates. Then, choose when to show and hide the templates
});


function switchTabs(templateName)
    fragment = Meteor.render( function() {
      return Template[ templateName ]();
    });
    $('#pageContent').html(fragment);
}

function hideStuff(n){
  console.log('debug abc');
    for(var i = 1; i <= numDivs; i++){
        if(n!=i){
            $('#div' + i).hide();
            $('#men' + i).removeClass();
        }
        else{
            $('#div' + n).show();
            $('#men' + i).removeClass().addClass('pure-menu-selected menu-item-divided');
        }
    }
}



 

function updatePurchasable(){//Are we going to base purchasing upgrades on click-count or on $$$ donated?
  for(var i = 1; i <= numPurchases; i++){
    //based purely on click count
    var cost = parseInt($('#cost' + i).text().split(",").join(""));
    if(yourClicks >= cost)
      $('#but' + i).removeClass().addClass("pure-button");
    else
      $('#but' + i).removeClass().addClass("pure-button pure-button-disabled");
  }
}




function updateClicks(){
  $('.pclicks').html(yourClicks);
  //Below is code to update the donation based on the clicks. There'll likely be an algorithm to this, like 5 clicks is one dollar. Let's presume that that is the case.
  var cash = yourClicks / 5.0; //algorithm
  cash = (Math.round(cash*100)/100).toFixed(2); //rounding so the cash stays nice and formatted
  $('.pdon').html(cash);
}
function increaseClicks( event ){
  yourClicks++;
  updateClicks();
  updatePurchasable();  
}




       
      $(function(){
          $( "#men1" ).bind( "click", function() 
          {            
              hideStuff(1);
          }
          );                        
          $( "#men2" ).bind( "click", function() 
          {            
              hideStuff(2);
          }
          );                        
          $( "#men3" ).bind( "click", function() 
          {            
              hideStuff(3);
          }
          );                        
          $( "#men4" ).bind( "click", function() 
          {            
              hideStuff(4);
          }
          );                        
          $( "#men5" ).bind( "click", function() 
          {            
              hideStuff(5);
          }
          );                        
          $( "#men6" ).bind( "click", function() 
          {            
              hideStuff(6);
          }
          );                        
          $( "#men7" ).bind( "click", function() 
          {            
              hideStuff(7);
          }
          );  
          $( "#men8" ).bind( "click", function() 
          {            
              hideStuff(8);
          }
          );                          
      });
       




}


if (Meteor.isServer) {
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
    }, 1000)
  });
}

Meteor.methods({
  buy: function(amount) {
    if(Meteor.user().money >= amount && amount > 0) 
      Meteor.users.update({_id: this.userId}, {$inc: {'rate': (Math.floor(amount/500)), 'money': (0-amount)}}); 
  },
  click: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 25}});
  },
})















