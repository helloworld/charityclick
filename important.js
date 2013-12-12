//Matthew is too cool.
var numDivs = 8;
var numPurchases = 4;
var yourClicks = 400;

$(function(){
    hideStuff(1);
    updatePurchasable();
    updateClicks();
});
function hideStuff(n){
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
function increaseClicks(){
	yourClicks++;
	updateClicks();
	updatePurchasable();	
}