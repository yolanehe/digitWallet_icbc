const bankCode = {   
	'102': {
		'name': '中国工商银行',
		'short': 'icbc'
	},
	'103': {
		'name': '中国农业银行',
		'short': 'abc'
	},
	'104': {
		'name': '中国银行',
		'short': 'boc'
	},
	'105': {
		'name': '中国建设银行',
		'short': 'ccb'
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
			'-201': '交易金额不能为空',
			'-202': '交易账户不能为空',
			'-203': '交易密码不能为空',
			'-204': '请输入正确的银行账号',
			'-207': '支付密码错误',
			'-208': '充值金额异常',
			'-210': '银行卡账户余额不足',
			'-211': '卡式钱包余额为0'
		}
	}
	
	static getLogoMap() {
		return logo_map
	}
}

export default Config;
