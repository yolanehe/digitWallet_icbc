<template>
	<view>
		<view class="view" v-for="(item,index) in productList" :key="index">
			<view class="itemlist1">
				<view class="view1">
					<text class="text1">{{item.days}}</text>
					<text class="text2">{{item.week}}</text>
				</view>
				<view class="view2">
					<view class="view21">
						<text class="text1">{{item.transTypeName}}</text>
						<text class="text2">{{item.transObjName}}</text>
					</view>
					<view class="view22">
						<text :class="(item.transTypeName === '充值' || item.transTypeName === '转入') ? 'text3': 'text33'">{{item.resultAmount}}</text>
					</view>	
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'detail_list',
		//从父组件传入的参数
		props: {
			productList:{
				type:Array, //参数的类型
				default() {
				  return [];
				},
			},
		}
		// methods:{
			
		// 	childMethod(){
		// 		//子组件的方法
		// 	}
		// }
	};
</script>

<style>
	.view{
		margin: 0 auto;
		width: 90%;
		//border: 1upx solid red;
	}
	.itemlist1{
		display: flex;
		flex-direction: row;
		
		height:100rpx;
		width: 100%;
		//border: 1upx solid blue;
	}
	.view1{ 
		display: flex;
		flex-direction: column;
		width: 20%;
		//border: 1upx solid blue;
	}
	.view2{
		display: flex;
		flex-direction: row;
		margin:0;
		justify-content: space-between;
		width: 80%;
		border-top: 1rpx solid #e1e1e1;
		//border: 1upx solid blue;
	}
	.view21{
		display: flex;
		flex-direction: column;
	}
	.text3{
		font-size: 40upx;
		color: #b30000;
	}
	.text33{
		font-size: 40upx;
		color: green;
	}
	.text1{
		font-size: 35upx;
		color: #000000;
	}
	.text2{
		font-size: 25upx;
		color: #606266;
	}
	
</style>
