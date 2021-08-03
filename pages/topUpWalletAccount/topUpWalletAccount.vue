<template>
	<view>
		<transfer-top left_content="wallet" display_detail right_content="account" />
		<transfer-input input_text="存入金额" display_detail=true :amount="wallet.amount" />
	</view>
</template>

<script>
	import transferTop from '@/components/transferTop/transferTop.vue'
	import transferInput from '@/components/transferInput/transferInput.vue'
	
	export default {
		components: {
			'transfer-top': transferTop,
			'transfer-input': transferInput,
		},
		data() {
			return {
				wallet: {},
			}
		},
		onShow() {
			/*this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			})*/
			this.wallet = {
				'dwId': '0021002193008888',
				'nickName': 'ICBC的数字钱包',
				'amount': 29994.00
			}
		},
		methods: {
			totalWalletMoney() {
				uni.$emit('total_wallletMoney', this.wallet.amount)
			}
		}
	}
</script>

<style>
	@import url("@/common/uni.css");
</style>
