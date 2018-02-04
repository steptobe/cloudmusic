import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isShowTabber: true, //是否显示底部栏
        pageTitle: '大策略', //页面标题
        musicData: {
            title: 'title',
            author: 'Hans Zimmer/Richard Harvey',
            url: 'https://p2.music.126.net/Ah9t98gNkEvh_D9_mLwOWw==/2946691245626258.mp3',
            pic: 'http://devtest.qiniudn.com/Preparation.jpg',
            lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
        },
        apB: {
            play: true,
            pause: true,
        }

    },
    actions: {
        getUserInfo(context, callback) { //获取用户信息后操作
            // let state = context.state;
            // let timeId = setInterval(() => {
            //     if (state.userInfo.user_id !== undefined) {
            //         clearInterval(timeId);
            //         if (typeof callback === 'function') {
            //             callback(state.userInfo, context.commit);
            //         }
            //     }
            // });
        },
        getSdkData(context, callback) { //获取sdk返回信息后操作
            // let state = context.state;
            // let timeId = setInterval(() => {
            //     if (state.sdkdata.appId !== undefined) {
            //         clearInterval(timeId);
            //         if (typeof callback === 'function') {
            //             callback(state.sdkdata, context.commit);
            //         }
            //     }
            // }, 100);
        }
    },
    mutations: {
        updateUserInfo(state, musicData) { //更改用户信息
            state.musicData = musicData;
        },
        setmusicData(state, { key, val }) {
            if (state.musicData[key] !== undefined) {
                state.musicData[key] = val;
            }
        },
        showTabber(state) { //显示底部栏
            state.isShowTabber = true;
        },
        hideTabber(state) { //隐藏底部栏
            state.isShowTabber = false;
        },
        setTitle(state, title) { //更改页面标题
            state.pageTitle = title;
        },
        setAp(state, apB) {
            state.apB = apB;
        }
    }
});