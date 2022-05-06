// component/search/search.js
Component({

    /**
     * 组件的方法列表
     */
    methods: {
        searchBoxHandler() {
            this.triggerEvent('gotoSearch')
        }
    }
})
