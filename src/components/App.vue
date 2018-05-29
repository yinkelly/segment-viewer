<template>
  <v-app id="app">
    <v-content>
      <v-container
        v-if="allData.length > 0"
        grid-list-md
        fluid>
        <v-layout
          row
          wrap>
          <v-flex xs2>
            <selection-card
              name="Segment"
              :selections="selections"
              :on-selection-change="updateSegment" />
          </v-flex>
          <v-flex xs10>
            <v-layout
              row
              wrap>
              <v-flex
                xs4
                v-for="variable in variables">
                <div class="subtitle">{{ formatLabel(variable) }}</div>
                <histogram
                  :name="variable"
                  :data="getHistograms(variable)" />
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
      Work_accident: Number(d.Work_accident),
      average_montly_hours: Number(d.average_montly_hours),
      last_evaluation: Number(d.last_evaluation),
      left: Number(d.left),
      number_project: Number(d.number_project),
      promotion_last_5years: Number(d.promotion_last_5years),
      salary: d.salary,
      sales: d.sales,
      satisfaction_level: Number(d.satisfaction_level),
      time_spend_company: Number(d.time_spend_company),
      left: d.left
    })).then((data) => {
      console.log(data)
      this.allData = data
      this.segmentData = data

      this.selections = this.selectionVariables.map((variable) => ({
        name: variable,
        options: d3.set(data.map((d) => d[variable])).values()
      }))
      console.log(this.selections)
    })
  },
  // watch: {
  //   segmentData() {
  //     this.getHistograms()
  //   }
  // }
  methods: {
    getHistograms () {
      return {
        overall: this.allData,
        segment: this.segmentData
      }
    },
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
