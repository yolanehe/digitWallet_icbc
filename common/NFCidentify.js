import {
	Vue,
	Component
} from 'vue-property-decorator';
import service from '@/common/service.js';

// 格式化得到AID值
const ab2hex = function(buffer) {
	var hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),

		function(bit) {
			return ('00' + bit.toString(16)).slice(-2);
		}
	);
	return hexArr.join('');
};

let HCECode = {
	0: 'OK',
	13000: '当前设备不支持NFC',
	13001: '当前设备支持NFC，但系统NFC开关未开启',
	13002: '当前设备支持NFC，但不支持HCE',
	13003: 'AID列表参数格式错误',
	13004: '未设置微信为默认NFC支付应用',
	13005: '返回的指令不合法',
	13006: '注册AID失败'
}

let aid = '';

class NFCIdentify {
	static async NFCReadCard() {
		try {
			await this._startHCE()
			console.log('this._startHCE')
			this.adapter = wx.getNFCAdapter()
			await this._startDiscovery()
			const discovered = await this._onDiscovered()
			await this._shutDown()
			
			return aid
		} catch (e) {
			await this._shutDown()
			
			console.log(e)

			const content = HCECode[e.errCode]
			uni.showToast({
				title: content || e.errMsg,
				icon: 'none',
				duration: 2000
			})
		}
	}
	
	static _startHCE() {
		return new Promise((resolve, reject) => {
			wx.startHCE({
				aid_list: ['F00000000A0101'],
				success: e => {
					console.log('_startHCE')
					resolve(e)
				},
				fail: err => {
					console.log('startHCE:', err)
					uni.showToast({
						title: HCECode[err.errCode],
						icon: 'none',
						mask: true,
						duration: 5000
					})
				}
			})
		})
	}

	static _startDiscovery() {
		return new Promise((resolve, reject) => {
			this.adapter.startDiscovery({
				success: e => {
					console.log('_startDiscovery')
					resolve(e)
				},
				fail: err => {
					uni.showToast({
						title: HCECode[err.errCode],
						icon: 'none',
						mask: true,
						duration: 5000
					})
				}
			})
		})
	}

	static _onDiscovered() {
		return new Promise((resolve, reject) => {
			this.adapter.onDiscovered(
				(this.onDiscoveredCallback = res => {
					aid = ab2hex(res.id);
					
					console.log('_onDiscovered')

					resolve(res)
				})
			)
		})
	}

	static _shutDown() {
		this.adapter.offDiscovered(this.onDiscoveredCallback)
		this.adapter.stopDiscovery()
		uni.hideLoading()
	}
}

export default NFCIdentify;
