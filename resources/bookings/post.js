if (!me) {
    cancel("You must be logged", 401);
}
dpd.courts.get({ dbId: this.dbProductId },function(court, error) {
	if(error){
		cancel("There are errors", 404);
	}else if (court && court.length){
		var self = this;
		court.forEach(function(t){
			if (!(self.endDate && self.endDate.length)) self.endDate = self.initDate + t.unitTime;
			var array = [self.id,self.initDate,self.endDate];			
			dpd.courts.put(t.id, {checkBook:{$push: array}}, function(result,error){
				if (error) {
					cancel("Error in date", 400);
				}else{
					self.bookPrice = calculateBookPrice(t.unitTime, t.unitPrice, self.initDate, self.endDate);
					self.itemId = t.id;
				}
			});
		});
	}else{
		cancel("Court doesn't exists", 404);
	}
});


function calculateBookPrice(courtUnitTime, courtUnitPrice, bookInitDate, bookEndDate){
	return courtUnitPrice * (bookEndDate - bookInitDate) / courtUnitTime;
}