import Vue from 'vue'
import Vuex from 'vuex'
import userService from '@/api/UserService'

export const POST_FAV_USER = 'fetchUser'
export const FETCH_MULTIPLE_USERS = 'fetchMultipleUsers'
export const SET_NEW_USER = 'set_new_user'
export const SAVE_FAVORITE_USER = 'save_favourite_user'

Vue.use(Vuex)

let maxNumOfUser = 10
export default new Vuex.Store({
  state: {
    users: [],
    favouriteUsers: []
  },
  actions: {
    [POST_FAV_USER] (context, data) {
      return userService.postFavouriteUser(data.nickname, data.list)
        .then(() => {
          return Promise.resolve
        })
        .catch(() => {
          return Promise.reject
        })
    },
    [FETCH_MULTIPLE_USERS] (context) {
      const { commit, dispatch } = context
      userService.getUserData()
        .then(user => {
          commit(SET_NEW_USER, user)
          if (maxNumOfUser >= 0) {
            maxNumOfUser--
            dispatch(FETCH_MULTIPLE_USERS)
          } else {
            Promise.resolve()
          }
        })
        .catch((err) => {
          Promise.reject(err)
        })
    }
  },
  mutations: {
    [SET_NEW_USER] (state, user) {
      state.users.push(user)
      state.filteredUser = state.users
    },
    [SAVE_FAVORITE_USER] (state, user) {
      const userEmail = user.email
      const userIndexInFav = state.favouriteUsers.findIndex(
        user => user.email === userEmail
      )
      if (userIndexInFav === -1) {
        state.favouriteUsers.push(user.getFavouriteData())
      } else {
        state.favouriteUsers.splice(userIndexInFav, 1)
      }
    }
  },
  modules: {
  },
  getters: {
    usersData: state => state.users,
    usersByGender: state => gender => state.users.filter(user => user.gender === gender),
    usersByAge: state => age => state.users.filter(user => user.age === age),
    usersByLocation: state => location => state.users.filter(user => user.country === location),
    userByEmail: state => email => state.users.find(user => user.email === email),
    userGenresOptions: state => {
      const genders = state.users.map(user => user.gender)
      const a = [...new Set(genders)]
      return a
    },
    userAgeOptions: state => {
      const ages = state.users.map(user => user.age)
      const a = [...new Set(ages)]
      return a
    },
    userLocationOptions: state => {
      const locations = state.users.map(user => user.country)
      const a = [...new Set(locations)]
      return a
    },
    isFavUser: state => userEmail => state.favouriteUsers.findIndex(user => user.email === userEmail),
    favouriteUsers: state => state.favouriteUsers
  }
})
