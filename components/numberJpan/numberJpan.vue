<template>
	<view class="numberJpan" :style="wc" v-show="flag" >
		<view class="myshuru" :style="obj" @tap.stop="flag=true">
			<view class="gb" @tap="close()" :style="gsbstyle">×</view>
			<view class="shuruTitle">
				<view class="transfer_money_note">
					<text class="transType_text">{{ transferType }}</text>
					<!-- <image class="rmb_icon" src="@/static/rmb_logo_black.png" /> -->
					<text :class="transferType === '充值' || transferType === '转入' ? 'recharge_text' : 'withdraw_text' ">¥{{ parseFloat(transfer_money).toFixed(2) }}</text>
				</view>
				<text class="input_note">{{ note }}</text>
			</view>
			<view class="center-x">
				<view class="srk" :style="'width:'+100/(length||6)+'%'" v-for=" i in length||6" :id="(i-1)==xz?'numberJpanActive':''" :key="i" >
					<!-- #ifdef MP-WEIXIN -->
					{{showNum?arr[i]==null?'':arr[i]:arr[i]!=null?"●" : ""}}
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					{{showNum?arr[i-1]==null?'':arr[i-1]:arr[i-1]!=null?"●" : ""}}
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="jpan" :style="tsfY">
			<view class="nav"  @tap="close()">
				<uni-icons type="arrowdown"></uni-icons>
			</view>
			<view class="main">
				<!-- #ifdef MP-WEIXIN -->
				<view v-for="i in 9" @tap="numshuzi(i+1)">{{i+1}}</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view v-for="i in 9" @tap="numshuzi(i)">{{i}}</view>
				<!-- #endif -->
				<view> </view>
				<view @tap="numshuzi(0)">0</view>
				<view @tap="del()">
					<uni-icons type="arrowthinleft"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import Config from '@/common/config.js'
	
	export default {
		name:'number-jpan',
		components:{
			uniIcons
		},
		data() {
			return {
				wc: {
					'background-color':"rgba(0, 0, 0, .0)"
				},
				obj: {
					"opacity":0,
					"top":'50%'
				},
				flag: false,
				clear1: "",
				clear2: "",
				arr: [],
				xz: 0,
				gsbstyle: {
					"opacity":0
				},
				tsfY: {
					'transform':'translateY(100%)'
				},
			};
		},
		props:['length','showNum', 'note', 'transferType', 'transfer_money'],
		methods:{
			del(){
				if(this.xz>0){
					this.arr.pop();
					this.xz--;
				}
				uni.vibrateShort();
			},
			numshuzi(num){
				let arr1=this.arr
				arr1[this.xz]=num
				this.arr=arr1
				//uni.vibrateShort();
				this.xz++
				if(this.xz==this.length){
					let str=""
					for(let item of this.arr){
						str+=item
					}
					this.$emit('closeChange',str)
					this.close()
				}
				
			},
			open(){
				this.flag=true;
				this.arr=[];
				this.xz=0;
				this.clear1=setTimeout(()=>{
					this.wc='background-color:rgba(0, 0, 0, .5)';
					
					this.obj='opacity:1;top:40%';
					
					this.gsbstyle="opacity:1";
						
					this.tsfY='transform:translateY(0%)';
				},100)
			},
			close(){
				this.wc={
					'background-color':"rgba(0, 0, 0, .0)"
				}
				this.obj={
					"opacity":0,
					"top":'50%'
				}
				this.gsbstyle={
					"opacity":0
				}
				this.clear2=setTimeout(()=>{
					this.flag=false
				},1000)
				this.tsfY={
					'transform':'translateY(100%)'
				}
			},
			xuanze(i){
				this.xz=i
				uni.vibrateShort();
			},
			getAccountIcon(src) {
				// console.log('@/static/' + src + '.png')
				return require('@/static/' + src + '.png')
			},
		}
	}
</script>

<style lang="scss">
	#numberJpanActive{
		background-color: #2c9dfe;
		color: #FFFFFF;
	}
	.jpan{
		width: 100vw;
		height: 30vh;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		transform: translateY(100%);
		transition: all .5s;
		.nav{
			text-align: center;
			line-height: 50upx;
			box-sizing: border-box;
			border-bottom: 1px solid #EEEEEE;
		}
		.main{
			width: 100%;
			height: calc(30vh - 50upx);
			view{
				box-sizing: border-box;
				float: left;
				width: 33.33%;
				height: 25%;
				font-size: 40upx;
				text-align: center;
				line-height:7.5vh;
				border: 1px solid #f4f4f4;
			}
			view:active{
				background-color: #EEEEEE;
			}
		}
	}
	.numberJpan{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0);
		transition: all .5s;
		z-index: 999;
		.myshuru{
			transition: all .5s;
			position: absolute;
			width: 70vw;
			height: 350upx;
			top: 50%;
			opacity: 0;
			transform: translate(-50%,-50%);
			background-color: #FFFFFF;
			left: 50%;
			color: #000000;
			border-radius: 20upx;
			overflow: hidden;
			.shuruTitle{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 55rpx;
			}
			.center-x{
				width: 90%;
				height: 80upx;
				border: 1px solid #EEEEEE;
				border-radius: 20upx;
				position: absolute;
				overflow: hidden;
				left: 50%;
				transform: translateX(-50%);
				bottom: 50upx;
				.srk{
					height: 100%;
					line-height: 80upx;
					text-align: center;
					float: left;
					box-sizing: border-box;
					border-left: 1px solid #EEEEEE;
					transition: all .4s;
				}
				.srk:nth-child(1){
					border-left:0px;
					border-radius: 20upx 0 0 20upx;
				}
			}
			
		}
	}
	.transfer_money_note {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-bottom: 15rpx;
	}
	.rmb_icon {
		width: 40rpx;
		height: 40rpx;
		margin-left: 8rpx ;
		margin-right: 4rpx;
	}
	.input_note {
		font-weight: 900;
		text-align: center;
		font-size: 27upx;
	}
	.transType_text {
		font-size: 34rpx;
		font-weight: 900;
		
		margin-right: 14rpx;
	}
	.recharge_text {
		font-weight: bold;
		font-size: 40rpx;
		color: #b30000;
	}
	.withdraw_text {
		font-weight: bold;
		font-size: 40rpx;
		color: #0e932e;
	}
	.gb{
		position: absolute;
		font-size: 50upx;
		top: 0;
		color: #AAAAAA;
		left: 30upx;
		transition: all .5s;
	}
</style>
