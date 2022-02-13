<template>
	<div class="change-password">
		<el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" size="small"
			label-width="80px">
			<el-form-item label="旧密码" prop="oldPwd">
				<el-input v-model="pwdForm.oldPwd" type="password" placeholder="请输入旧密码">
				</el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPwd">
				<el-input v-model="pwdForm.newPwd" type="password" placeholder="请输入新密码">
				</el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="confirmPwd">
				<el-input v-model="pwdForm.confirmPwd" type="password" placeholder="请再次输入密码">
				</el-input>
			</el-form-item>
		</el-form>
		<div class="btns">
			<el-button size="small" type="info" @click="resetForm('pwdForm')">重置</el-button>
			<el-button size="small" type="success" @click="submitForm('pwdForm')">修改</el-button>
		</div>
	</div>
</template>

<script>
import _api from '@api'

export default {
	props: {
		id: {
			type: Number
		}
	},
	data() {
		const checkPassword = (rule, value, callback) => {
			const hValue = value.trim()
			const cValue = this.pwdForm.newPwd.trim()
			if (hValue !== cValue) {
				callback(new Error('新旧密码不一致'))
			} else {
				callback()
			}
		}
		return {
			pwdForm: {},
			pwdRules: {
				oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
				newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
				confirmPwd: [
					{ required: true, message: '请再次输入新密码', trigger: 'blur' },
					{ validator: checkPassword, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				const { success } = await _api.changePwd({
					id: this.id,
					password: this.pwdForm.confirmPwd
				})
				if (success) {
					this.$message.success('修改成功')
					this.$refs[formName].resetFields()
				} else {
					this.$message.error('修改失败')
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
</style>
