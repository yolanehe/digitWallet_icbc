<template>
	<view>
		<transfer-top left_content="wallet" right_content="account" />
	</view>
</template>

<script>
	import transferTop from '@/components/transferTop/transferTop.vue'
	
	export default {
		components: {
			'transfer-top': transferTop,
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

</style>
