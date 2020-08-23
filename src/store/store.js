import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        lingot: [],
        nuggets: undefined,
        max: 0 // Total number of nuggets used
    },

    // getters: {
    //     LINGOT: state => {
    //         return state.lingot
    //     },

    //     NUGGETS: state => {
    //         return state.nuggets
    //     }
    // },

    mutations: {
        addToLingot(state, newNugget) {
            state.lingot.push({
                component: newNugget,
                index: state.max++
            })
        },

        removeFromLingot(state, index) {
            state.lingot.splice(index, 1)
        },

        updateLingot(state, newLingot) {
            state.lingot = newLingot
        },

        initNuggetList(state, nuggetList) {
            state.nuggets = nuggetList
        }
    },

    actions: {
        addToLingot(context, newNugget) {
            context.commit('addToLingot', newNugget)
        },

        removeFromLingot(context, index) {
            context.commit('removeFromLingot', index)
        },

        updateLingot(context, newLingot) {
            context.commit('updateLingot', newLingot)
        },

        initNuggetList(context, nuggetList) {
            context.commit('initNuggetList', nuggetList)
        }
    }
})