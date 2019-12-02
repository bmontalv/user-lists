<template>
  <div>
    <p>{{ this.header }}</p>
    <select
      v-model="selectedOption"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
      >
        {{option}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FilterOption',
  props: {
    header: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedOption: null
    }
  },
  watch: {
    selectedOption () {
      this.$emit('filter-option-changed', this.selectedOption)
    }
  }
}
</script>
