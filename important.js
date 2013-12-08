//Matthew is too cool.
var numDivs = 8;

$(function(){
hideStuff(1);
});

function hideStuff(n)//needs jQuery because it makes life so much easier
{
        for(var i = 1; i <= numDivs; i++)
        {
        	var s = '#div' + i;
                if(n!=i)
                {

                        $('#div' + i).hide();
						$('#men' + i).removeClass();

                }
                else
                {
                        $('#div' + n).show();
						$('#men' + i).removeClass().addClass('pure-menu-selected menu-item-divided');

                }
        }
}