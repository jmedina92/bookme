if (!(me && me.role == 'administrator')) {
  cancel("This is not administrator user", 401);
}else if(!(me.id == this.owner || me.id == this.id)){
  cancel("This is not your user", 401);
}
