export const state = () => ({
    liked: [],
    type: 'all'
})
  
export const mutations = {
    like (state, photo) {
        console.log("like of this image " + photo)
        state.liked.push(photo)
    },
    dislike (state, photo) {
        console.log("dislike of this image " + photo)
        state.liked = state.liked.filter(item => item.id !== photo.id)
    },
    select_type(state, type) {
        state.type = type
    }
}
 