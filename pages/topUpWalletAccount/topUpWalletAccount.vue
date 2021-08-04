<template>
	<view>
		<transfer-top left_content="wallet" display_detail right_content="account" />
		<transfer-input input_text="存入金额" display_detail=true :amount="wallet.amount" />
		<picker-block :accounts="accounts" @selected_index="accountIndexChanged($event)"/>
	</view>
</template>

<script>
	import transferTop from '@/components/transferTop/transferTop.vue'
	import transferInput from '@/components/transferInput/transferInput.vue'
	import pickerBlock from '@/components/pickerBlock/pickerBlock.vue'
	
	export default {
		components: {
			'transfer-top': transferTop,
			'transfer-input': transferInput,
			'picker-block': pickerBlock,
		},
		data() {
			return {
				wallet: {},
				account_index: 0,
				accounts: [{
					'bankCode': '102',
					'accId': '2002002020100021324',
				}, {
					'bankCode': '104',
					'accId': '2002002020100021324',
				}, {
					'bankCode': '103',
					'accId': '2005124440100021324',
				}, {
					'bankCode': '103',
					'accId': '3882002020100021324',
				}],
				// accounts: [],
				selected_account: {},
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
			/*this.$request.getAccounts().then(res => {
				console.log(res)
				this.accounts = res.data.cardList
				this.selected_account = this.accounts[0]
				console.log('selected_account:', this.selected_account)
			})*/
			this.selected_account = this.accounts[0]
		},
		methods: {
			totalWalletMoney() {
				uni.$emit('total_wallletMoney', this.wallet.amount)
			},
			accountIndexChanged(event){
				this.account_index = event
				console.log('accountIndexSelectedChanged:', event)
			},
		}
	}
</script>

<style>
	@import url("@/common/uni.css");
</style>
