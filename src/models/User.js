/**
 * User model
 */
class User {

  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.logged_in = null;
    this.birthday = null;
    this.creation_date = null;
    Object.assign(this, data);
    if(this.logged_in){
      this.logged_in = "online"
    }
    else {
     this.logged_in = "offline"

    }
    /**
     * below it is to ensure the mapping to display some fields nicely
     */
    if(this.birthday== null){
      this.birthday = "no information"
    }
    else{
      this.birthday= this.birthday.substr(0, 10);

    }
    if(this.creation_date== null){
     this.creation_date = "no information"
    }
    else{
      this.creation_date = this.creation_date.substr(0, 10);;
    }

  }
}
export default User;
