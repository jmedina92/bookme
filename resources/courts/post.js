if (!(me && me.role == 'administrator')) {
    cancel("This is not the correct user or role", 401);
}
this.productOwner = me.id;