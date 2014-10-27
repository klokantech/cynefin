/**************************************************************************
* Custom checkbox and radio inputs
* 
* Author: Tomas Lach (ahoj@tomaslach.cz)
* Version: 1.0                                                                                                           
**************************************************************************/

var Forms = function() {	

	if(document.querySelectorAll('input[type=checkbox]').length) {			

	    var checkbox = document.querySelectorAll('input[type=checkbox]');
		var label = new Array();

		for (var i = 0; i < checkbox.length; i++) {			 

			label[i] = checkbox[i].parentNode;

			label[i].classList.add('custom-checkbox');

			if (checkbox[i].checked === 'checked') {
				
				label[i].classList.add('custom-checked');

			}

			label[i].innerHTML += '<span class="custom-input"><span></span></span>';

			document.querySelectorAll('input[type=checkbox]')[i].onchange = function() {

				if (this.checked === false) {
					
					this.parentNode.classList.remove('custom-checked');	

				} else {
					
					this.parentNode.classList.add('custom-checked');			

				}

			};

		}					

	}

}
