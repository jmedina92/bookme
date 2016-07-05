if(this.checkBook){
	if (this.checkBook != 'Pull Request' ) {
		var checkBook = this.checkBook;
		this.checkBook = null;	

		var initDateNew = checkBook[0][1];
		var endDateNew = checkBook[0][2];

		if (initDateNew > endDateNew) {		
			error('initDate',"Init Date is higher than End Date" );
			cancel("Error in date", 400);
		}

		if (!checkBookingDuration(initDateNew, endDateNew, this.unitTime)) {
			error('date',"Booking duration is not correct");
			cancel("Error in duration", 400);
		}

		if (this.maxTime && !checkMaxDuration(initDateNew, endDateNew, this.maxTime)) {
			error('date',"Booking duration is more than maximum");
			cancel("Error in max time", 400);
		}

		if (this.booked) {
			var booked = this.booked;
			self =  this;
			this.booked.forEach(function(book){
				var initDateCheck = book[1];   
				var endDateCheck = book[2];   
				if (initDateNew < initDateCheck && endDateNew < endDateCheck) {
					self.booked = arrayPush(booked,checkBook);
				}else if(initDateNew > initDateCheck && initDateNew >= endDateCheck){
					self.booked = arrayPush(booked,checkBook);
				}else{
					error('overlap',"Error in dates" );
					cancel("Error of overlap", 400);	
				}
			});		
		}else{
			this.booked = checkBook;
		}
	}else{
		this.checkBook = null;	
	}
}else{
	if (me.role == 'limit') {
		cancel("This user role can't create product or modify attributes", 401);			
	}
}

function arrayPush(booked, newbook){
	aux = booked;
	aux2 = aux.concat(newbook);
	return aux2;
}

function checkBookingDuration(initDate, endDate, equipmentUnitTime){
	if ((endDate - initDate) % equipmentUnitTime == 0) return true;
	return false;
}

function checkMaxDuration(initDate, endDate, maxDurationTime){
	if (endDateNew - initDateNew >  maxDurationTime) return false;
	return true;
}
