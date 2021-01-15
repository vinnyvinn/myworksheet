import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        path_to:'/',
        worksheet:{},
        all_my_worksheets:[],
        loading:false,
        pagination: {
            descending: true,
            page: 1,
            rowsPerPage: 5,
            sortBy: 'id',
            totalItems: 0,
            rowsPerPageItems: [1, 2, 4, 8, 16]
        },
    },

    mutations:{
        updateWorksheet(state,worksheet){
         state.worksheet = worksheet;
        },
    },
    getters:{
      all_worksheets(state){
      return state.all_my_worksheets;
      },
    },
    actions:{
        updateWorksheet({commit},worksheet){
        commit('updateWorksheet',worksheet);
        },
        my_worksheet({commit},data){
        axios.get('worksheets')
            .then(res => {
             commit('my_worksheet',res.data);
            })
        },


    }
})
