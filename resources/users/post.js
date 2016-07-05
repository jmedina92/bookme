if (!(me && me.role == 'administrator')) {
    cancel("This is not administrator user", 401);
}else if (this.role == 'administrator') {
    cancel("Can't create an administrator user", 401);
}else if (!(this.role == 'limit' || this.role == 'consult')){
    cancel("This is not a valid role", 401);
}
this.owner = me.id;
