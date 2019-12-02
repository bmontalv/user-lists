<template>
  <div>
    <table>
      <tr>
        <th/>
        <th  v-for="(header, index) in headers" :key="index">
          {{ header }}
        </th>
      </tr>
      <tr
        v-for="(user, index) in users"
        :class="{'selected-row': userEmailSelected == user.email}"
        :key="index"
        @click="handleSelectedRow(user.email)" >
        <td >
          <input type="checkbox" :checked="userEmailSelected == user.email"  >
        </td>
        <td >
          {{ user.gender }}
        </td>
         <td >
          {{ user.name }}
        </td>
        <td >
          {{ user.email }}
        </td>
        <td >
          {{ user.country }}
        </td>
        <td >
          {{ user.birthday }}
        </td>
        <td >
          {{ user.registerDate }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProfilesList',
  data () {
    return {
      headers: ['Gender', 'Name', 'Email', 'Nationality', 'Birthday', 'Registration date'],
      userEmailSelected: ''
    }
  },
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelectedRow (userEmail) {
      this.userEmailSelected = this.userEmailSelected !== userEmail ? userEmail : ''
      if (this.userEmailSelected.length > 0) {
        this.$emit('selected-user-email', userEmail)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  text-align: left;
  padding: 8px;
}

tr {
  border: 1px solid black;
}

td {
  cursor: pointer;
}

.selected-row {
  background-color: #dddddd;
}

</style>
