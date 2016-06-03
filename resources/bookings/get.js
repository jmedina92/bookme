if (!me) {
    cancel("You must be logged", 401);
}
if(this.itemId){
	dpd.courts.get(this.itemId,function(item, error) {
		if(error){
			console.log(error);
			cancel("There are errors", 404);
		}else if (item){
			var self = this;
			if (!(me.role == 'administrator' || me.role == 'consult' || me.role == 'limit')){
		    	cancel("Role Error", 401);
			}else if (!(item.productOwner ==  me.id || me.productsId.indexOf(item.id) != -1)){
	    		cancel("It's not your product", 401);
			}
		}else{
			cancel("Court doesn't exists", 404);
		}
	});
}else{
	cancel("There are errors", 404);	
}