<template>
  <v-app id="app">
    <v-toolbar
      color="grey darken-4"
      dark
      dense>
      <v-toolbar-side-icon />
      <v-toolbar-title>HR Data Explorer</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container
        v-if="allData.length > 0"
        grid-list-xl
        fluid>
        <v-layout
          row
          wrap>
          <v-flex xs3>
            <v-layout
              row
              wrap>
              <v-flex xs12>
                <selection-card
                  name="Segment profile"
                  :selections="selections"
                  :on-selection-change="updateSegment"
                  color="blue" />
              </v-flex>
              <v-flex xs12>
                <selection-card
                  name="Overall distribution"
                  :selections="[]"
                  :on-selection-change="updateSegment"
                  color="gray" />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs9>
            <v-layout
              row
              wrap>
              <v-flex
                xs4
                v-for="variable in variables">
                <div class="subtitle">{{ formatLabel(variable) }}</div>
                <histogram
                  :name="variable"
                  :base="allData"
                  :segment="segmentData" />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import csv from '../HR_comma_sep.csv'
import Histogram from './Histogram'
import SelectionCard from './SelectionCard'

export default {
  data: () => ({
    drawer: true,
    variables: [
      'satisfaction_level',
      'last_evaluation',
      'average_montly_hours',
      'time_spend_company',
      'number_project',
      'salary',
      'promotion_last_5years',
      'left'
    ],
    allData: [],
    selectionVariables: [
      'left',
      'sales'
    ],
    selections: [],
    segmentData: []
  }),
  created () {
    d3.csv(csv, (d) => ({
      average_montly_hours: Number(d.average_montly_hours),
      last_evaluation: Number(d.last_evaluation),
      number_project: Number(d.number_project),
      promotion_last_5years: Number(d.promotion_last_5years),
      salary: d.salary,
      sales: d.sales,
      satisfaction_level: Number(d.satisfaction_level),
      time_spend_company: Number(d.time_spend_company),
      left: d.left
    })).then((data) => {
      this.allData = data
      this.segmentData = data
      this.selections = this.selectionVariables.map((variable) => ({
        name: variable,
        options: d3.set(data.map((d) => d[variable])).values()
      }))
    })
  },
  methods: {
    formatLabel (str) {
      return str.replace(/_/g, ' ')
    },
    updateSegment (selections) {
      this.segmentData = this.allData.filter((d) => _.reduce(selections, (result, values, variable) => result && _.includes(values, d[variable]), true))
    }
  },
  components: {
    Histogram,
    SelectionCard
  }
}
</script>

<style>
.subtitle {
  text-transform: capitalize;
}
</style>
