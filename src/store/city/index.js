const state = {
    // 初始名字，如果本地存储有就直接使用本地的(后面切换的时候会存本地)刷新不变
    nm : window.localStorage.getItem('nowNm') || '北京',  
    id : window.localStorage.getItem('nowId') || 1    // 初始 id
};

const actions = {

};
// 修改状态的方法
const mutations = {
    CITY_INFO(state , payload){
        state.nm = payload.nm;
        state.id = payload.id;
    }
};

export default {
    namespaced : true,
    state,
    actions,
    mutations
}