if (this.username.match(/[^a-z0-9]/i)) {
    error('username', "must only include alphanumeric characters");
}