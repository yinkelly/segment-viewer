<template>
  <div class="chart-container">
    <div :id="`histogram-${name}`" />
  </div>
</template>

<script>
import vegaembed from 'vega-embed'
import * as d3 from 'd3'

export default {
  props: {
    name: String,
    data: Object
  },
  computed: {
    vegaSpec () {
      const yBin = d3.set([
        'satisfaction_level',
        'last_evaluation',
        'average_montly_hours'
      ]).has(this.name)

      return {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        mark: 'bar',
        encoding: {
          y: {
            bin: yBin,
            field: this.name,
            type: yBin ? 'quantitative' : 'nominal'
          },
          x: {
            aggregate: 'count',
            type: 'quantitative',
            stack: null
          },
          color: {
            field: 'left',
            type: 'nominal',
            scale: {
              domain: [
                0,
                1
              ],
              range: [
                'gray',
                'blue'
              ],
              type: 'ordinal'
            }
          }
        },
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
    }
  },
  mounted () {
    const spec = {
      data: { values: this.data.overall },
      ...this.vegaSpec
    }
    vegaembed(`#histogram-${this.name}`, spec, { actions: false })
  }
}
</script>
