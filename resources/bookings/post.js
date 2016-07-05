if (!me) {
    cancel("You must be logged", 401);
}
dpd.equipments.get({ dbId: this.dbProductId },function(equipment, error) {
	if(error){
		cancel("There are errors", 404);
	}else if (equipment && equipment.length){
		var self = this;
		equipment.forEach(function(t){
			if (!(self.endDate && self.endDate.length)) self.endDate = self.initDate + t.unitTime;
			var array = [self.id,self.initDate,self.endDate];			
			dpd.equipments.put(t.id, {checkBook:{$push: array}}, function(result,error){
				if (error) {
					cancel("Error in date", 400);
				}else{
					self.bookPrice = calculateBookPrice(t.unitTime, t.unitPrice, self.initDate, self.endDate);
					self.itemId = t.id;
				}
			});
		});
	}else{
		cancel("Equipment doesn't exists", 404);
	}
});


function calculateBookPrice(equipmentUnitTime, equipmentUnitPrice, bookInitDate, bookEndDate){
	return equipmentUnitPrice * (bookEndDate - bookInitDate) / equipmentUnitTime;
}