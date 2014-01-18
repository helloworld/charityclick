  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
  Meteor.subscribe('userData');

  //DIV1: PROFILE (User)
  Template.div1.user = function () {
    return Meteor.user();
  }
  
  //DIV2: RANKINGS (Users, in Order)
  Template.div2.players = function () {
    return Meteor.users.find({}, {sort: {'money': -1}});
  };

  //DIV3: CONTROl CENTER (User)
  Template.div3.user = function () {
    return Meteor.user();
  }

  //DIV4: UPGRADES (User, Items)
  Template.div4.user = function () {
    return Meteor.user();
  }

  Template.div4.items = function () {
    return Items;
  }

 


 

 
  Template.div3.events({
    'click input.code': function () {
      Meteor.call('click');
    }
  });

  Template.div3.events({
    'click input.buy': function (event) {
      Meteor.call('buy', event.target.id); 
    }
  });

  Template.div4.events({
    'click input.code': function () {
      Meteor.call('click');
    }
  });


  Template.div4.events({
    'click input.buy': function (event) {
      Meteor.call('buy', event.target.id); 
    }
  });

  Template.base.events({
    'click .ld' : function(event){
      switchTabs("div" + event.target.id);
    }               
  })

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


function switchTabs(templateName){
    console.log('it actually does stuff');
    var fragment = Meteor.render( function() {
      return Template[ templateName ]();
    });
    $('#pageContent').html(fragment);
}

Meteor.methods({
  st : function(ts){
    switchTabs(ts);
  }
});

// function hideStuff(n){
//   console.log('debug abc');
//     for(var i = 1; i <= numDivs; i++){
//         if(n!=i){
//             $('#div' + i).hide();
//             $('#men' + i).removeClass();
//         }
//         else{
//             $('#div' + n).show();
//             $('#men' + i).removeClass().addClass('pure-menu-selected menu-item-divided');
//         }
//     }
// }



 

function updatePurchasable(){//Are we going to base purchasing upgrades on click-count or on $$$ donated?
  for(var i = 1; i <= numPurchases; i++){
    //based purely on click count
    var cost = parseInt($('#cost' + i).text().split(",").join(""));
    if(yourClicks >= cost)
      $('#but' + i).removeClass().addClass("pure-button ld");
    else
      $('#but' + i).removeClass().addClass("pure-button pure-button-disabled ld");
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

Meteor.startup(function(){

  switchTabs('div1');

});