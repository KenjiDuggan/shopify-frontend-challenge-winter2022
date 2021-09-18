export const state = () => ({
    liked: [],
    type: 'all'
})
  
export const mutations = {
    like (state, photo) {
        state.liked.push(photo)
        const resultArr = state.liked.filter((data,index)=>{
            return state.liked.indexOf(data) === index;
          })
        state.liked = resultArr
    },
    dislike (state, photo) {
        state.liked = state.liked.filter(item => item.id !== photo.id)
    },
    select_type(state, type) {
        state.type = type
    }
}
 