<template>
    <div class="card">
        <img :src="imgSrc" alt="" class="card__image">
        <div class="card__text-wrapper">
        <h2 class="card__title">{{ cameraName }}</h2>
        <div class="card__post-date">Earth Date of Capture: {{ earthDate }}</div>
            <div :key="isLiked" class="card__details-wrapper">
                <div class="card__post-date">Landing: {{ landingDate }}</div>
                <div class="card__post-date">Launch: {{ launchDate }}</div>
                <p class="card__excerpt">Full Name: {{ fullName }}</p>
                <p class="card__excerpt">ID: {{ id }}</p>
                <button class="card__read-more" @click="toggleLike()">
                    <img v-if="!isLiked" :src="likeIcon" class="likeIcon" />
                    <img v-else :src="dislikeIcon" class="likeIcon" />
                </button>
            </div>  
        </div>
    </div>
</template>

<script>
import likeIcon from '../static/images/thumb_up_black_24dp.svg'
import dislikeIcon from '../static/images/thumb_down_black_24dp.svg'
 
export default {
    name: 'Card',
    props: {
        id: {
            type: Number,
            default: () => 0
        },
        initialState: {
            type: Boolean,
            default: () => false
        },
        imgSrc: {
            type: String,
            default: () => ''
        },
        cameraName: {
            type: String,
            default: () => ''
        },
        earthDate: {
            type: String,
            default: () => ''
        },
        landingDate: {
            type: String,
            default: () => ''
        },
        launchDate: {
            type: String,
            default: () => ''
        },
        fullName: {
            type: String,
            default: () => ''
        }
    },
    data() {
        return {
            likeIcon,
            dislikeIcon,
            isLiked: this.initialState
        }
    },
    methods: {
        toggleLike() {
            this.isLiked = !this.isLiked

            const image = {
                id: this.id,
                imgSrc: this.imgSrc,
                cameraName: this.cameraName,
                earthDate: this.earthDate,
                landingDate: this.landingDate,
                launchDate: this.launchDate,
                fullName: this.fullName
            }

            if(this.isLiked) {
              this.$store.commit('like', image) // then has to be added
            } else {
              this.$store.commit('dislike', image) // then has to be removed
            }
        }
    }
}
</script>
<style>
.card {
  border: 0px solid aqua;
  margin: 0.5rem;
  position: relative;
  height: 20rem;
  overflow: hidden;
  border-radius: 0.5rem;
  flex: 1;
  min-width: 290px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
}
 
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0) linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 80%);;
  z-index: 0;
}

.card__card-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.card__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 3s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  z-index: -1;
}

.card__text-wrapper {
  position: absolute;
  bottom: 0rem;
  padding: 1rem;
  color: white;
  width: 100%;
  transition: background-color 1.5s ease;
}

.card__title {
  transition: color 1s ease;
  margin-bottom: .5rem;
}

.card__post-date {
  font-size: .7rem;
  margin-bottom: .5rem;
  color: #CCC;
}

.card__details-wrapper {
  max-height: 0;
  opacity: 0;
  transition: max-height 1.5s ease, opacity 1s ease;
}

.card__excerpt {
  font-weight: 300;
}

.card__read-more {
  background: black;
  color: #bbb;
  display: block;
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
  border: 1px solid #444;
  font-size: 0.8rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  text-decoration: none;
  width: 7rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 99;
}

.card__read-more i {
  position: relative;
  left: 0.2rem;
  color: #888;
  transition: left 0.5s ease, color 0.6s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card__read-more:hover i {
  left: 0.5rem;
  color: yellow;
}

.card:hover .card__details-wrapper {
  max-height: 20rem;
  opacity: 1;
}

.card:hover .card__text-wrapper {
  background-color: rgba(0, 0, 0, 0.6);
}

.card:hover .card____title {
  color: yellow;
}

.card:hover .card__image {
      transform: scale(1.2);
      z-index: -1;
}

</style>