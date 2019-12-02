<template>
  <div>
    <h1>Favourite users</h1>
    <ProfilesList
        :users='allFavUsers' />
    <button>
      <download-csv
        :data="allFavUsers">
        Download CVS
      </download-csv>
    </button>
    <input v-model="userName" placeholder="user name">
    <button @click="sendToLocalEndpoint">Save in local DB</button>
    <button>
      <router-link class="link" :to="{ name: 'home' }">
        Go to home
      </router-link>
    </button>
  </div>
</template>
<script>
import ProfilesList from '@/components/ProfilesList.vue'
import JsonCSV from 'vue-json-csv'
import { mapGetters } from 'vuex'
import { POST_FAV_USER } from '@/store/index.js'

export default {
  name: 'favouriteUsrs',
  components: {
    ProfilesList,
    'download-csv': JsonCSV
  },
  computed: {
    ...mapGetters({
      allFavUsers: 'favouriteUsers'
    })
  },
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    sendToLocalEndpoint () {
      this.$store.dispatch(POST_FAV_USER, { nickname: this.userName, list: this.allFavUsers })
    }
  }
}
</script>

<style scoped>
  button {
    margin: 20px;
    cursor: pointer;
  }

  .link {
    text-decoration: none;
    color: black;
  }
</style>
