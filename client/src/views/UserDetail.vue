<template>
  <div>
    <h1>User details</h1>
    <div v-if="!userEmail.length">
      <p>No user selected</p>
    </div>
    <div v-else>
      <!-- <div class="top-content"> -->
        <img class="img-profile" :src="userImage" alt="foto de perfil">
        <!-- <div class="map">Mapa</div> -->
        <button @click="addToFav">
          <img class="img-icon" src="https://cdn2.iconfinder.com/data/icons/flat-game-ui-buttons-icons-1/512/10-512.png" alt="favourite icon">
          <p class="img-text">{{ isFavouriteUser ? 'Remove' : 'Save' }}</p>
        </button>
      <!-- </div> -->
      <div>
        <p class="name">{{ userName }}</p>
        <p><b>e-mail:</b> {{ userEmail }}</p>
      </div>
      <div class="personal-info">
        <p><b>City:</b> {{ userLocationCity }}</p>
        <p><b>Street:</b> {{ userLocationStreet }}</p>
        <p><b>Phone:</b>{{ userPhone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { SAVE_FAVORITE_USER } from '@/store/index.js'
export default {
  name: 'UserDetail',
  data () {
    return {
      userData: {},
      isFavouriteUser: false,
      userImage: '',
      userLocationCity: '',
      userLocationStreet: '',
      userName: '',
      userEmail: '',
      userPhone: '',
      map: undefined
    }
  },
  mounted () {
    this.userEmail = this.$route.params.user
    this.userData = this.$store.getters.userByEmail(this.userEmail)
    this.isFavouriteUser = (this.$store.getters.isFavUser(this.userEmail) !== -1) || false
    this.userImage = this.userData.image
    this.userLocationCity = this.userData.city
    this.userLocationStreet = this.userData.street
    this.userName = this.userData.name
    this.userPhone = this.userData.phone
  },
  methods: {
    addToFav () {
      this.$store.commit(SAVE_FAVORITE_USER, this.userData)
      this.$router.push({ name: 'favouriteUsers' })
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    border-radius: 4px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    height: 50px;
    position: absolute;
    top: 100px;
    right: 150px;
  }
  .img-icon {
    width: 20px;
    height: 20px;
    margin-top: 4px;
  }
  .img-text {
    margin-top: 4px;
  }

  .img-profile {
    width: 100px;
    height: 100px;
    border-radius:150px;
    top: 40px;
  }
  .personal-info {
    padding: 0 20px 0 20px;
    border: 1px solid grey;
    border-radius: 12px;
    width: 700px;
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .top-content {
    width: 500px;
    display: flex;
    justify-content: space-around;
    margin: auto;
  }

  .name {
    font-weight: 900;
  }

</style>
