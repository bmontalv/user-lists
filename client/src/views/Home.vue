<template>
  <div class="home">
    <button class="detail-button">
      <router-link
        class="link"
        :to="{ name: 'userDetail', params: { user: userEmailSelected }}">
        Go to user detail
      </router-link>
    </button>
    <ProfilesList
      :users='users'
      @selected-user-email="handleSelectedUser" />
    <div class="filters">
      <FilterOption
        :header="genderTitle"
        :options="userGendersInStore"
        @filter-option-changed="filterByGender" />

      <FilterOption
        :header="ageTitle"
        :options="userAgesInStore"
        @filter-option-changed="filterByAge" />

      <FilterOption
        :header="locationTitle"
        :options="userLocationInStore"
        @filter-option-changed="filterByLocation" />
    </div>
    <div class="button-container">
      <button @click="removeFilters">Remove filters</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProfilesList from '@/components/ProfilesList.vue'
import FilterOption from '@/components/FilterOption.vue'
import { mapGetters } from 'vuex'
import { FETCH_MULTIPLE_USERS } from '@/store/index.js'

export default {
  name: 'home',
  components: {
    ProfilesList,
    FilterOption
  },
  computed: {
    ...mapGetters({
      allUsers: 'usersData',
      userGendersInStore: 'userGenresOptions',
      userAgesInStore: 'userAgeOptions',
      userLocationInStore: 'userLocationOptions'
    }),
    users () {
      return this.filteredUsers || this.allUsers
    }
  },
  data () {
    return {
      userEmailSelected: '',
      genderTitle: 'Gender',
      userGenders: [''],
      ageTitle: 'Age',
      locationTitle: 'Nationality',
      filteredUsers: undefined
    }
  },
  mounted () {
    if (!this.users.length) {
      this.$store.dispatch(FETCH_MULTIPLE_USERS)
    }
  },
  methods: {
    handleSelectedUser (userEmail) {
      this.userEmailSelected = userEmail
    },
    removeFilters () {
      this.filteredUsers = undefined
    },
    filterByGender (optionFilter) {
      this.filteredUsers = this.$store.getters.usersByGender(optionFilter)
    },
    filterByAge (optionFilter) {
      this.filteredUsers = this.$store.getters.usersByAge(parseInt(optionFilter))
    },
    filterByLocation (optionFilter) {
      this.filteredUsers = this.$store.getters.usersByLocation(optionFilter)
    }
  }
}
</script>

<style scoped>
  button {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .filters {
    padding: 0 20px 20px 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    border: 1px solid gainsboro;
    border-radius: 8px;
    width: 500px;
    text-align: center;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .button-container {
    width: 100%;
  }

  .link {
    text-decoration: none;
    color: black;
    font-size: medium;
  }

  .detail-button {
    border-radius: 3px;
    font-weight: 600;
    height: 40px;
    width: 300px;
    margin-bottom: 20px;
  }
</style>
