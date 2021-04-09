
export const aMixin = {
    data () {
        return {
            query: {
                page: 1,
                size: 10,
                keyword: null
            },
            total: 10
        }
    },
    methods: {
        handleSizeChange () { },
        handleCurrentChange () { }
    }
}
