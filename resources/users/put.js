if (!(me)) {
    cancel("Log to access", 401);
}else if (!(me.role == 'administrator')){
    cancel("This is not administrator user", 401);
}else if(!(me.id == this.owner)){
    cancel("This is not your user", 401);
}