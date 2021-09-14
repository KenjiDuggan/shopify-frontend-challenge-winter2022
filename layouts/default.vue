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
        <v-text-field
          id="searchbar"
          v-model="search"
          label="Solo"
          prepend-icon="mdi-magnify"
          placeholder="Placeholder"
          solo
        ></v-text-field>
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
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
      subtitle: 'STAGRAM'
    }
  }
}
</script>

<style>
#appBg {
  background-color: #121620;
}

#navBg {
    background-color: #121620;
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

#searchbar {
  padding-top: 20px;
}
</style>