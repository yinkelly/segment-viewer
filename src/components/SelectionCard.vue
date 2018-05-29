<template>
  <v-card>
    <v-card-media
      :height="30"
      :class="name" />
    <v-card-title>
      <div class="title">{{ name }}</div>
    </v-card-title>
    <v-card-text>
      <template v-for="selection in selections">
        <div class="subheading">{{ selection.name }}</div>
        <v-select
          :items="selection.options"
          v-model="selected[selection.name]"
          multiple
          hide-details />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    name: String,
    selections: Array,
    onSelectionChange: Function
  },
  data () {
    return { selected: {} }
  },
  watch: {
    selected: {
      handler (selections) {
        this.onSelectionChange(selections)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .Segment {
    background: blue;
    opacity: 0.6;
  }
  .Overall {
    background: gray;
    opacity: 0.6;
  }
  .subheading {
    margin-top: 20px;
  }
  .subheading:first-child {
    margin-top: 0px;
  }
</style>
