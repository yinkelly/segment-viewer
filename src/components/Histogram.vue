<template>
  <div class="chart-container">
    <div :id="`histogram-${name}`" />
  </div>
</template>

<script>
import vegaembed from 'vega-embed'
import * as d3 from 'd3'
import _ from 'lodash'

const colorMap = {
  base: 'gray',
  segment: 'blue'
}

export default {
  props: {
    name: String,
    base: Array,
    segment: Array
  },
  data () {
    return {
      config: {
        style: { bar: { fillOpacity: 0.5 } },
        view: { stroke: 'transparent' },
        axisX: {
          grid: true,
          gridWidth: 1,
          gridDash: [
            2,
            5
          ],
          domainWidth: 0,
          tickWidth: 0
        },
        axisY: { tickWidth: 0 }
      }
    }
  },
  computed: {
    commonEncoding () {
      const yBin = d3.set([
        'satisfaction_level',
        'last_evaluation',
        'average_montly_hours'
      ]).has(this.name)

      return {
        y: {
          bin: yBin,
          field: this.name,
          type: yBin ? 'quantitative' : 'nominal'
        },
        x: {
          aggregate: 'count',
          type: 'quantitative',
          stack: null
        }
      }
    },
    vegaSpec () {
      return {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.4.3.json',
        layer: _.map([
          'base',
          'segment'
        ], (val) => ({
          mark: 'bar',
          data: { values: this[val] },
          encoding: {
            color: { value: colorMap[val] },
            ...this.commonEncoding
          }
        })),
        config: this.config
      }
    }
  },
  watch: {
    segment: {
      handler () {
        this.renderChart()
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart()
  },
  methods: {
    renderChart () {
      vegaembed(`#histogram-${this.name}`, this.vegaSpec, { actions: false })
    }
  }
}
</script>
