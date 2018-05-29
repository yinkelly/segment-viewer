import Vue from 'vue'
import App from './components/App.vue'
import 'vuetify/dist/vuetify.min.css'

new Vue({
  el: '#app',
  render (createElement) {
    return createElement(App, {
      props: {
        views: [
          'disinformation',
          'actors',
          'tweets'
        ]
      }
    })
  }
})
