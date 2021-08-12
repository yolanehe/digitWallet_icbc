const bankCode = {   
	'102': {
		name: '中国工商银行',
		short: 'icbc'
	},
	'103': {
		name: '中国农业银行',
		short: 'abc'
	},
	'104': {
		name: '中国银行',
		short: 'boc'
	},
	'105': {
		name: '中国建设银行',
		short: 'ccb'
	}
};

const logo_map = {
	'wallet': {
		'image': 'wallet_logo',
		'name': '数字人民币钱包'
	},
	'account': {
		'image': 'account_logo',
		'name': '银行卡'
	},
	'card': {
		'image': 'card_logo',
		'name': '贴一贴卡式软钱包'
	}
}


class Config {     //静态配置
	static getToken() {
		return 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJS8nR2ctYNDXYNUtJRKi1OLfJMAQoaGBgZgrClsYGBBRBA5fwSc1OBsk-X7ACi5_uWPNmx-_mslqe9C593tivVAgBng70AUgAAAA.OrbxcLIknpQRxU5JXgGGdj1ElyK6BpqP1vGCEZVdMAfv40d-S1ezIZsITgKb7rKc8msKeTR9-2VC64sAk4gCSw';
	}

	static getMAXMoney() {
		return 99999999.99
	}

	static getBankCode() {
		return bankCode
	}
	
	static getErrMessage() {
		return {
			'-102': '服务器请求异常',
			'-201': '交易金额不能为空',
			'-202': '交易账户不能为空',
			'-203': '交易密码不能为空',
			'-204': '请输入正确的银行账号',
			'-205': '请先将卡开立',
			'-206': '此卡已开立,请勿重复开卡',
			'-207': '支付密码错误',
			'-208': '充值金额异常',
			'-209': '提现金额异常',
			'-210': '银行卡账户余额不足',
			'-211': '未登录',
			'-212': '卡式软钱包余额为0',
			'-213': '今日充值次数已达上限',
			'-214': '充值金额达到上限',
			'-215': '数字钱包余额不足',
			'-216': '卡式软钱包余额达到上限',
			
			'500': '识别卡超时',
		}
	}
	
	static getLogoMap() {
		return logo_map
	}
}

export default Config;
