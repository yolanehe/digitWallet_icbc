<template>
    <view class="zong" >
        <view class="title1">
			<text class="text-style1">贴一贴卡片钱包</text>
			<text class="text-style2">{{ parseInt(cardid, 16) }}</text>
			<view class="stylemoney">
				<image class="image-style1" src="@/static/rmb_logo_white.png" mode="aspectFit"></image>
				<text class="text-style3">{{ money }}</text>
			</view>
		</view>
		<view class="title2">
			<text class="text-style4">交易记录</text>
			<picker @change="Change" :range="array">
				<label class="text-style5">{{array[index]}}</label>
				<image class="image-style2" src="@/static/down_v2.png" mode="aspectFit"></image>
			</picker>
		</view>
		<view class="title3">  
			<text class="text-style6">{{year}}年{{month}}月</text>
		</view>
        <scroll-view class="content" scroll-y="true">
        	<detail_list :productList="productList"></detail_list>	
        </scroll-view>
		<view class="anniu">
		    <button class="button-style1" style="width: 47%; margin-top: 60rpx; margin-bottom: 2rpx;" @tap="recharge">充值</button>
		    <button class="button-style2" style="width: 47%; margin-top: 60rpx; margin-bottom: 2rpx;" @tap="withdraw">提现</button>
		</view>
	</view>
</template>
<script>
    import detail_list from '@/components/detail-list/detail-list.vue'
	import Config from '@/common/config.js'
    
	export default {
        components: {
			'detail_list': detail_list,
		},
        data() {
            return {
				token: Config.getToken(),
				year:"2021",
				month:"08",
				array:['全部','充值','提现'],
				index:0,
				money:'',
				cardid:'',
				productList:[],
				
				option: {}
            }
        },
		onLoad(option) {
			this.option = option
		},
		onShow() {
			this.cardid = this.option.cid
			this.$request.getCardInfo(this.cardid).then(res => {
				console.log("onLoad")
				this.money = parseFloat(res.data.cardInfo.card.amount).toFixed(2)
				this.productList = res.data.cardInfo.transFlows
			});
			
			console.log('current pages:', getCurrentPages())
			
			uni.setNavigationBarTitle({
				title: '贴一贴卡片钱包'
			})
		},
        methods: {
			Change: function(e) {		//改变的事件名
				
				this.index = String(e.target.value)			//将数组改变索引赋给定义的index变量
				console.log("Change")
				this.$request.getCardInfo(this.cardid, this.index, {}).then(res => {
						console.log('data',res.data.cardInfo.transFlows)
						this.money = parseFloat(res.data.cardInfo.card.amount).toFixed(2)
						this.cardid = res.data.cardInfo.card.cid
						this.productList = res.data.cardInfo.transFlows
					})
			},
			recharge() {
				uni.navigateTo({
					url: "/pages/recharge/walletCard?cid=" + this.cardid
				})
			},
			withdraw() {
				uni.navigateTo({
					url: "/pages/withdraw/walletCard?cid=" + this.cardid,
				})
			}
        }
    }   
</script>
<style>
	//滚动条
	.zong{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.content {
		margin: 0 auto;
		display: flex;
		//overflow-y: scroll;           //设置滚动条
		flex-direction: row; //column:让元素沿垂直主轴从上到下垂直排列,row: 沿水平主轴让元素从左向右排列,row-reverse:沿水平主轴让元素从右向左排列
		align-items: center;
		/*align-items: center;        //flex-start:靠上对齐, center:居中对齐, flex-end:靠下对齐 */
		//justify-content: flex-start;  //center:整体居中排列,flex-start:靠左,flex-end:靠右, space-between,space-around
		height: 760rpx;
		width: 100%;
		margin: 0px auto;
	}
	
	.text1{
		font-size: 35upx;
		color: #000000;
	}
	.text2{
		font-size: 25upx;
		color: #606266;
	}
	//卡片背景
	.title1 {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 40rpx;
		width: 90%;
	    height: 270rpx; 
		border-radius:30rpx;        //圆角
		position: relative;
	    background: #083c66;
		box-shadow:2px 2px 5px #000;//阴影
		//border: 1upx solid red;
	}
	//按键
	.anniu {
		display: flex;                //布局方式
		flex-direction:row; 
		position: absolute;
		bottom:30rpx;
		width: 90%;
	}
	.button-style1{
		border: 2upx solid #B40404;
		background-color: white;
		color: #B40404;
		font-size: 34upx;
		
		width: 50%;
		margin-bottom: 20rpx;
	 }
	 .button-style2{
		 background-color: #B40404;
		 color: white;
		 font-size: 34upx;
		 
		 width: 50%;
		 margin-bottom: 20rpx;
		 display: flex;
		 justify-content: center;
	 }
	//卡片内容
	.text-style1 {
		color: white;
		display: block;
		font-size: 35upx;
		//position:absolute;
		margin: 30rpx 0 0 20rpx;
		//border: 1rpx solid red;
	}
	.text-style2 {
		color: white;
		font-size: 25upx;
		//position: absolute;
		margin-top: 10rpx;
		margin-left: 20rpx;
		//border: 1rpx solid red; 
	}
	.stylemoney{
		position: absolute;
		bottom: 15rpx;
		right: 20rpx;
	}
	.text-style3 {
		color: white;
		font-size: 50upx;
	}
	.image-style1{

		height:40rpx;
		width: 50rpx;
	}
	//查询选项
	.title2{
		margin: 0 auto;
		height: 100rpx;
		position: relative;
		align-items: flex-end;    //在方框中靠下显示
		width: 90%;
		position: relative;
		flex-direction: row;
		//border: 1rpx solid red;
	}
	.text-style4{	
	
		font-size: 35upx;
		position: absolute;
		left:0rpx;
		bottom: 0rpx;
	}
	.text-style5{
		font-size: 35upx;
		position: absolute;
		right:40rpx;
		bottom: 0rpx;
	} 
	.image-style2{
	    position: absolute;
	    height:20rpx;
	    width: 20rpx;
	    bottom: 10rpx;
	    right: 10rpx;	
	}
	.title3{
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		height: 100rpx;
		width: 90%;
		//border: 1rpx solid red;
		font-size: 35upx;
	}
</style>