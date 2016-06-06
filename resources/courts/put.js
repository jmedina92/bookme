if (!(me && (me.role == 'administrator' && me.id  == this.productOwner || me.role == 'limit' && me.productsId.indexOf(this.id) != -1 ))) {
    cancel("This is not the correct user or role", 401);
}