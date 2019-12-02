export default class User {
  constructor (user) {
    this.gender = user.gender
    this.name = `${user.name.title} ${user.name.first} ${user.name.last}`
    this.email = user.email
    this.country = user.location.country
    this.city = user.location.city
    this.street = user.location.street.name
    this.phone = user.phone
    this.birthday = (user.dob.date).split('T', 1)[0]
    this.age = user.dob.age
    this.registerDate = (user.registered.date).split('T', 1)[0]
    this.image = user.picture.medium
  }

  getFavouriteData () {
    return {
      gender: this.gender,
      name: this.name,
      email: this.email,
      country: this.country,
      birthday: this.birthday,
      registerDate: this.registerDate
    }
  }
}
