<template>
  <v-card>
    <v-card-media
      :height="30"
      :class="`segment segment-${name}`" />
    <v-card-text>
      <div class="title">{{ name }}</div>
      <template v-for="selection in selections">
        <v-select
          :items="selection.options"
          :label="selection.name"
          v-model="selected[selection.name]"
          multiple
          hide-details />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>

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

<style>
  .segment {
    background: blue;
    opacity: 0.5;
  }
</style>
