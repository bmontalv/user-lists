import axios from 'axios'
import User from '@/model/User.js'

export class UserService {
  getUserData () {
    const config = {
      dataType: 'json',
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
    return axios.get('https://randomuser.me/api/', config)
      .then(response => {
        const userData = new User(response.data.results[0])
        return userData
      })
      .catch(error => {
        throw error
      })
  }

  postFavouriteUser (nickname, data) {
    const headers = { 'Access-Control-Allow-Origin': '*' }

    return axios.post(`http://localhost:3000/users/${nickname}`, data, headers)
      .then(response => {
        return response
      })
      .catch(error => {
        throw error
      })
  }
}
const userService = new UserService()
export default userService
