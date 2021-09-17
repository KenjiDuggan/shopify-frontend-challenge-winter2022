<template>
  <div>
    <v-row justify="center" >
      <v-col cols='6'>
        <v-card
          class="pa-2 boxTitle"
          tile
        >
          IMAGE SHARING FROM THE FINAL FRONTIER: <span class="yellowCl">SPACE</span>STAGRAM - Mars Rover Gallery
      </v-card>
      </v-col>
      <v-col cols='6'>
        <v-card
          class="pa-2 boxDescription"
          tile
        > 
          For the purposes of this project, Shopify is extending our mission to Make Commerce Better for Everyone to include the whole entire universe. Please build us an app to help share photos from one of NASA’s image APIs
        </v-card>
        <v-card
          class="pa-2 boxDescription"
          tile
        >
          We need a webpage that can pull images, and allow the user to “like” and “unlike” their favourite images.
          We'd like a simple to use interface that makes it easy to:
          <br/>
          <ul>
            <li>Fetch data from one of NASA’s APIs and display the resulting images (more details under Technical Requirements)</li>
            <li>Display descriptive data for each image (for example: title, date, description, etc.)</li>
            <li>Like an image</li>
            <li>Unlike an image</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-layout row wrap>
<<<<<<< HEAD
        <v-col v-for="image in loadedImages"
          :key="image.toString()"
          cols="12" sm="4" >
            <Card 
              :id="image.id"
=======
        <v-col v-for="image in images"
          :key="image.toString()"
          cols="12" sm="4" >
            <Card 
>>>>>>> c35ecd05c23caac4f61797f76acde09d1bcad1c0
              :img-src="image.img_src"
              :camera-name="image.camera.name"
              :earth-date="image.earth_date"
              :landing-date="image.rover.landing_date"
              :launch-date="image.rover.launch_date"
              :full-name="image.camera.full_name"
<<<<<<< HEAD
              :initial-state="image.liked"
=======
>>>>>>> c35ecd05c23caac4f61797f76acde09d1bcad1c0
            />
        </v-col>
      </v-layout>
    </v-row>
  </div>
</template>
<script>
import Card from '../components/Card.vue'

export default {
  components: {
    Card
  },
  async asyncData({ $axios }) { // we do our first 100 images from this fetch
    const baseUrl = process.env.NASA_BASE_URL
    const apiKey = process.env.NASA_API_KEY
 
    let images = await $axios.$get(baseUrl + '?page=1&sol=1000&api_key=' + apiKey)
    images = images.photos
    return { images }
  },
  data() {
    return {
      api_key: process.env.NASA_API_KEY,
      sol: 100,
      rover_type: "none",
      page: 1 // default start at page 1
    }
<<<<<<< HEAD
  },  
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
 
    loadedImages() {
      const images = this.images
      // console.log('this is thate store state ' + JSON.stringify(this.$store.state.liked))
      // this.$store.state.liked.forEach((e) => {
      //   if (images.filter(function(el) { return el.id === e.id; }).length > 0) {
      //     const idx = 
      //     images[idx].liked = true  
      //   }
      // })

      // images.forEach((e) => {
      //   // eslint-disable-next-line no-prototype-builtins
      //   if(!e.hasOwnProperty('liked')) {
      //     e.liked = false
      //   }
      // })
      // console.log(images)
      return images
    }
  },
  methods: {
    handleScroll () {
      // Your scroll handling here
      console.log(window.scrollY)
      console.log('inner height ' + window.scrollHeight )
      console.log('client height ' + window.scrollTop)
      
    }
  },    
=======
  }
>>>>>>> c35ecd05c23caac4f61797f76acde09d1bcad1c0
}
</script>
<style>
.boxTitle {
  font-size: 2.1rem;
  font-weight: 700;
  background-color: #121620 !important;
}

.boxDescription {
  background-color: #121620 !important;
}

.yellowCl {
  color: #fec001;
}

.title-white {
  color: white;
}
 
.likeIcon {
  margin-top: 10px;
  height: 36px;
  width: 36px;
}

.likeIconText {
  font-size: 1.85rem;
  padding-left: 5px;
  font-weight: 700;
  padding-bottom: 10px;
}
</style>