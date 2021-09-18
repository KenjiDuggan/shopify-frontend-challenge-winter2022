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
      <v-select
        v-model="selectedCamera"
        :items="cameras" 
        label="Select Mars Camera"  
        solo
        @change="changeCamera"
      ></v-select>
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
        <v-col v-for="image in loadedImages"
          :key="image.toString()"
          cols="12" sm="4" >
            <Card 
              :id="image.id"
              :img-src="image.img_src"
              :camera-name="image.camera.name"
              :earth-date="image.earth_date"
              :landing-date="image.rover.landing_date"
              :launch-date="image.rover.launch_date"
              :full-name="image.camera.full_name"
              :initial-state="image.liked"
            />
        </v-col>
      </v-layout>
    </v-row>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <div id="floatingCart" v-on="on">
            <div class="cartBadge">
              <img :src="shoppingCartIcon" class="shoppingCartIcon" />
              <span class='badge badge-warning' id='lblCartCount'>{{ storedLikes.length }}</span>
            </div>
          </div>
        </template>
        <v-card>
          <v-card-title
            class="headline lighten-2"
            primary-title
          >
            Current Likes:  {{ storedLikes.length }}
          </v-card-title>
          <v-card-text>
            <pre>
              {{ storedLikes }}
            </pre>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="secondary"
              @click="copySomething(storedLikes);"
            >
              Copy JSON
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="dialog = false"
            >
              Close Modal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>
<script>
import Card from '../components/Card.vue'
import shoppingCartIcon from '../static/images/shopping_cart_black_24dp.svg'

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
      baseUrl: process.env.NASA_BASE_URL,
      apiKey: process.env.NASA_API_KEY,
      sol: 100,
      rover_type: "none",
      page: 1, // default start at page 1
      scrolledToBottom: false,
      cameras: ['All', 'fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam', 'pancam', 'minites'],
      selectedCamera: '',
      shoppingCartIcon,
      likes: 0,
      dialog: false
    }
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
    },
    storedLikes() {
      return this.$store.state.liked
    }
  },
  mounted () {
    this.scroll()
  },
  methods: {
    async fetchNewPage() {
      this.page = this.page + 1
      let urlString = ''
      if(this.selectedCamera !== 'All') {
        urlString = this.baseUrl + '?page=' + this.page + '&sol=1000&api_key=' + this.apiKey + '&camera=' + this.selectedCamera
      } else {
        urlString = this.baseUrl + '?page=' + this.page + '&sol=1000&api_key=' + this.apiKey 
      }
       
      const responseData = await this.$axios.get(urlString)
      this.images = [...this.images, ...responseData.data.photos]
    },
    async changeCamera() {
      this.page = 1
      let urlString = ''
      if(this.selectedCamera !== 'All') {
        urlString = this.baseUrl + '?page=' + this.page + '&sol=1000&api_key=' + this.apiKey + '&camera=' + this.selectedCamera
      } else {
        urlString = this.baseUrl + '?page=' + this.page + '&sol=1000&api_key=' + this.apiKey 
      }
       
      const responseData = await this.$axios.get(urlString)
      this.images = [...responseData.data.photos]
    },
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) { // if we hit the bottom we can increment the page
          this.fetchNewPage()
        }
      }
    },
    async copySomething(text) {
      try {
        await this.$copyText(JSON.stringify(text));
      } catch (e) {
        console.error(e);
      }
    },
  },    
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

/**floating cart custom styling */
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
    font-size: 12px;
    background: #ffca59;
    border-radius: 50%;
    color: black;
    padding: 0 5px;
    vertical-align: top;
    margin-left: -20px; 
}

#floatingCart {
  cursor: pointer;
  position: fixed;
  right: 50px;
  bottom : 50px;
  transition: all .2s ease-in-out;
}

#floatingCart:hover { transform: scale(1.1); }

.shoppingCartIcon {
  width: 45px; height: 45px;
  margin-bottom: -10px;
}

.cartBadge {
  background-color: grey;
  padding: 10px;
  border-radius: 50%;
}
</style>