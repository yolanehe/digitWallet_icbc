<template>
    <view class="zong" >
        <view class="title1">
			<text class="text-style1">贴一贴卡片钱包</text>
			<text class="text-style2">{{cardid}}</text>
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
        	<view class="view">
        		<view class="itemlist1" v-for="(item,index) in productList" :key="index">
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
        					<text  :class="item.transTypeName === '充值' ?'text3':'text33'">{{item.resultAmount}}</text>
        				</view>	
        			</view>	
        		</view>
        	</view>
        </scroll-view>
		<view class="anniu">
		    <button class="button-style1" style="width: 50%; margin-top: 60rpx; margin-bottom: 0rpx;" @tap="charge">充值</button>
		    <button class="button-style2" style="width: 50%; margin-top: 60rpx; margin-bottom: 0rpx;" @tap="withdrawal">提现</button>
		</view>
	</view>
</template>
<script>
    //import uniList from "@/components/uni-list/uni-list.vue"
    //import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import Config from '@/common/config.js'
    export default {
  //       components: {
		// 	uniList,
		//     uniListItem
		// },
        data() {
            return {
                // listarr:[
                // 	{id:1,name:"张三",time:"+1"},
                // 	{id:2,name:"李四",time:"-1"},
                // 	{id:3,name:"王武",time:"+1"},
                // 	{id:4,name:"王其",time:"-1"},
                // 	{id:5,name:"韩语",time:"-1"}
                // ],
				token: Config.getToken(),
				year:"2021",
				month:"07",
				array:['全部','充值','提现'],
				index:0,
				money:'',
				cardid:'',
				productList:[],
            }
        },
        onLoad() {
            // this.getList();
			this.$request.getCardInfo('0021002192001892',{}).then(res => {
				this.money = parseFloat(res.cardInfo.card.amount).toFixed(2)
				this.cardid = res.cardInfo.card.cid,
				res.cardInfo.transFlows = res.cardInfo.transFlows.map(item => {
					if (item.transTypeName == '充值') {
						item.symbol = '+'
					} else {
						item.symbol = '-'
					}
					return item
				})
				console.log('data',res.cardInfo.transFlows)
				this.productList = res.cardInfo.transFlows
            })		
		},
        methods: {
		
			Change: function(e) {		//改变的事件名
			//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
			this.index = e.target.value			//将数组改变索引赋给定义的index变量
			this.jg=this.array[this.index]		//将array【改变索引】的值赋给定义的jg变量
			}
        },
		computed: {
		    activation() {              
		        return (icontent) => { // 使用JavaScript闭包，进行传值操作
		            //console.log(icontent)	            
		            if (icontent.transTypeName=='充值'){
		                return {'color':'red'}
		            } 
		            else if (icontent.transTypeName=='提现'){
		                return {'color':'green'}
		            } 
		                
		        }
		    }
		}
    }   
</script>
<style>
	@import url("@/common/uni.css");
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
		height: 500rpx;
		width: 100%;
		margin: 0px auto;
	}
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
	.text1{
		font-size: 35upx;
		color: #000000;
	}
	.text2{
		font-size: 25upx;
		color: #606266;
	}
	.text3{
		font-size: 40upx;
		color: red;
	}
	.text33{
		font-size: 40upx;
		color: green;
	}
	//卡片背景
	.title1 {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 40rpx;
		width: 80%;
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
		left: 0;
		right: 0;
		bottom: 0;
		// width: 100%;
		// border: 1upx solid red;
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
		width: 95%;
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
		width: 95%;
		//border: 1rpx solid red;
		font-size: 35upx;
	}
	/* .text-style6{
		position: absolute;
		bottom: 10rpx;
	} */
</style>