<template>
  <v-app id="appBg">
    <v-app-bar
      id="navBg"
      :clipped-left="clipped"
      fixed
      app 
    >
      <v-toolbar-title class="yellowCl" v-text="title" />
      <v-toolbar-title v-text="subtitle" />  
      <!-- <div class="searchBarWrapper">
        <v-text-field
          id="searchbar"
          v-model="search"
          label="Search"
          prepend-icon="mdi-magnify"
          solo
        ></v-text-field>
      </div> -->
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <br/>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; Shopify Frontend Challenge {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SPACE',
      subtitle: 'STAGRAM',
      search: ''
    }
  }
}
</script>

<style>
 html::-webkit-scrollbar {
    width: 15px;
}

html::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}

html::-webkit-scrollbar-thumb {
  background: rgb(126, 126, 126); 
  border-radius: 10px;
}

html::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
 
#appBg {
  background-color: #121620;
}

#navBg {
    background-color: #121620;
    height: 75px !important;
    padding-top: 10px;
}

.yellowCl {
  color: #fec001;
}

.yellowBg {
  background-color: #fec001;
}

.mdi-magnify {
  fill: grey;
}
 

.searchBarWrapper {
  margin-top: 1.5rem;
  margin-left: 2rem;
  width: 40%;
}

#searchbar {
  border-radius: 25px;
}

.v-input__slot {
  background-color: rgb(104, 104, 104);
}
</style>