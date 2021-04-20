
export const aMixin = {
    data () {
        return {
            query: {
                page: 1,
                size: 10,
                keyword: null
            },
            total: 10,
            hasFilter: false
        }
    },
    methods: {
        // 最大页
        handleSizeChange (callback, value) {
            this.query.size = value
            this.query.page = 1
            callback()
        },
        // 当前页
        handleCurrentChange (callback, value) {
            this.query.page = value
            callback()
        },
        // 清除搜索框
        handleClose (callback) {
            this.query.keyword = null
            callback()
        },
        // enter搜索
        handleEnter (callback, value) {
            this.query.keyword = value
            callback()
        },
        // 通过id删除
        deleteById (delCallback, fetchCallback, id, info) {
            this.$confirm('此操作将永久删除' + info + ', 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                center: true
            })
                .then(async () => {
                    const { success } = await delCallback(id)
                    if (success) {
                        this.$message.success('删除成功')
                        fetchCallback()
                    } else {
                        this.$message.error('删除失败')
                    }
                })
                .catch(() => {
                    this.$message.warning('已取消删除')
                })
        },
        // 处理成功标志
        handleSuccess (success, info, callback) {
            if (success) {
                this.$message.success(`${info}成功`)
                callback && callback()
            } else {
                this.$message.error(`${info}失败`)
            }
        },
        // 关闭对话框，清空表单
        clearDialog (formName) {
            this.$refs[formName].resetFields()
            this[formName] = {}
        },
        search () {
            this.hasFilter = true
        },
        initSearch () {
            this.hasFilter = false
        }
    }
}

export const hMixin = {
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
        // 处理成功标志
        handleSuccess (success, info, callback) {
            if (success) {
                this.$message.success(`${info}成功`)
                callback && callback()
            } else {
                this.$message.error(`${info}失败`)
            }
        },
        back () {
            this.$router.go(-1)
        },
        // 最大页
        handleSizeChange (callback, value) {
            this.query.size = value
            this.query.page = 1
            callback()
        },
        // 当前页
        handleCurrentChange (callback, value) {
            this.query.page = value
            callback()
        }
    }
}
