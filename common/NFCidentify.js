import { Vue,Component } from 'vue-property-decorator';
import service from '@/common/service.js';

// 字节转字符串
const byteToString = function(arr) {
	if (typeof arr == 'string') {
		return arr;
	}

	var str = '',
		_arr = arr;

	for (var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);

		if (v && one.length == 8) {
			var byteLength = v[0].length;

			var store = _arr[i].toString(2).slice(7 - byteLength);

			for (var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}

			str += String.fromCharCode(parseInt(store, 2));

			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
};

// 字符串转字节
const string2ArrayBuffer = function(str) {
	// 首先将字符串转为16进制
	let val = '';
	for (let i = 0; i < str.length; i++) {
		if (val === '') {
			val = str.charCodeAt(i).toString(16);
		} else {
			val += ',' + str.charCodeAt(i).toString(16);
		}
	}
	// 将16进制转化为ArrayBuffer
	return new Uint8Array(
		val.match(/[\da-f]{2}/gi).map(function(h) {
			return parseInt(h, 16);
		})
	).buffer;
};

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
	CODE_0: 'OK',
	CODE_13000: '当前设备不支持NFC',
	CODE_13001: '当前设备支持NFC，但系统NFC开关未开启',
	CODE_13002: '当前设备支持NFC，但不支持HCE',
	CODE_13003: 'AID列表参数格式错误',
	CODE_13004: '未设置微信为默认NFC支付应用',
	CODE_13005: '返回的指令不合法',
	CODE_13006: '注册AID失败'
}

// let tab = {};
let aid = '';
let NFCAdapter = null; // NFC instance object
let NFCTab = null; // NFC label object

class NFCIdentify {
	isWrite = false;
	NfcA = null;
	Ndef = null;

	// init NFC device
	static initDevice(type) {
		NFCAdapter = wx.getNFCAdapter();
		console.log(NFCAdapter);
		
		this.NfcA = NFCAdapter.getNfcA();
		this.NFCListener(type);
	}

	// call listener
	static NFCListener(type) {
		// onDiscover
		NFCAdapter.onDiscovered(callback => {
			let aid = ab2hex(callback.id);
			console.log('aid:', aid);
			
			if (type == 0) {
				service.getCardInfo(aid).then(res => {
					console.log('getCardInfo: ', res)
					console.log('type:', type)
					
					if (res.code == '0') {
						console.log('getCardInfo res.code=0')
						uni.redirectTo({
							url: "/pages/carddetail/carddetail?item=" + encodeURIComponent(JSON.stringify(res.data)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						})
					}
					else {
						let item = {
							'title': '识别卡失败',
							'button_text': '重新识别',
							'url': '/pages/identifyCard/identifyCard?type=' + this.type,
							'err_code': res.code
						}
						
						uni.redirectTo({
							url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			}
			else {
				service.getCardIdentification(aid).then(res => {
					console.log('getCardIdentification: ', res)
					console.log('type:', type)
					
					if (res.code == '0') {
						console.log('getCardIdentification res.code=0')
						let item = {
							'title': '开立卡成功',
							'button_text': '识别软卡',
							'url': '/pages/identifyCard/identifyCard?type=0',
							'transtype': 4
						}
						
						uni.redirectTo({
							url: "/pages/success/success?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
					else {
						let item = {
							'title': '开立卡失败',
							'button_text': '换卡开立',
							'url': '/pages/identifyCard/identifyCard?type=1',
							'err_code': res.code
						}
						
						uni.redirectTo({
							url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			}
			
			if (callback.techs.length == 0) {
				uni.showToast({
					title: '无效设备',
					duration: 2000
				})
			}
		});
		
		NFCAdapter.startDiscovery({
			success: res => {
				console.log('startDiscovery: ', res);
			},
			fail: err => {
				console.log('startDiscovery: ', err);
			},
			complete: res => {
				console.log('startDiscovery: ', res);
			}
		});
	}
	
	static closeNFC() {
		NFCAdapter.stopDiscovery();
	}
}

export default NFCIdentify;
