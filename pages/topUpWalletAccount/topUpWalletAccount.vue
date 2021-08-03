<template>
	<view>
		<transfer-top left_content="wallet" right_content="account" />
		<transfer-input input_text="存入金额" />
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("@/common/uni.css");
</style>
