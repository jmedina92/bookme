if (!(me && me.role == 'administrator')) {
    cancel("This is not the correct user or role", 401);
}
this.booked.forEach(function(book){
	var idBook = book[0];   
	dpd.bookings.del(idBook);
});	