if (!me) {
    cancel("You must be logged", 401);
}
if(this.itemId){
	dpd.equipments.get(this.itemId,function(item, error) {
		if(error){
			cancel("There are errors", 404);
		}else if (item){
			var self = this;
			if (!(me.role == 'administrator' || me.role == 'consult' || me.role == 'limit')){
		    	cancel("Role Error", 401);
			}else if (!(item.productOwner ==  me.id || me.productsId.indexOf(item.id) != -1)){
	    		cancel("It's not your product", 401);
			}			
			if (item.booked){
				var array = [self.id,self.initDate,self.endDate];
				item.booked = deleteBookInProduct(array, item.booked);
				dpd.equipments.put(item.id, {checkBook: {$push:"Pull Request"}, booked : item.booked }, function(result,error){
					if (error) {
						cancel("Error in Pull", 400);
					}
				});
			}
		}else{
			cancel("Equipment doesn't exists", 404);
		}
	});
}else{
	cancel("There are errors", 404);	
}

function deleteBookInProduct(array, bookedArray){
	aux1 = bookedArray;
	for(var i = aux1.length - 1; i >= 0; i--) {
	    if(arraysIdentical(aux1[i], array)) {
	    	if (aux1.length == 1) aux1 = null;
		    else aux1.splice(i, 1);
	    }
	}
	return aux1;
}

function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};