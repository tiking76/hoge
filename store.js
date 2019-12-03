import axios from 'axios'

const state = {
    apiData: null
};

const getters = {
    getApiData ( state ) {
        return state.apiData
    }
};

const mutations = {
    updateApiData ( state, payload) {
        state.apiData = payload.data
    }
};

const actions = {
    async updateApiDataAction ( context, URL ) {
        console.log('now upDate');
        const payload = {
            data: ''
        };
        const URL = 'https://eombeipzq3.execute-api.ap-northeast-1.amazonaws.com/dev20171226/getSalesv3?token=b0dd4061c18a7cc5cfdecbd8f2a692c3&dateFilterPage=0&date=20190619&dateFilter=month&storeId=23&_=1560872637834'
        await axios.get(URL)
            .then( (response) => {
                payload.data = response.data
            });
        context.commit('updateApiData',payload)
        console.log(response.data.storeId)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};