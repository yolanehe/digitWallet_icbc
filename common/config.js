const bankCode = {    //全局常量
	'102': 'icbc',
	'103': 'abc',
	'104': 'boc',
	'105': 'ccb'
};

class Config {     //静态配置
	static getToken() {
		return 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJS8nR2ctYNDXYNUtJRSq0oULIyNDOyMDQ3MzA31VEqLU4t8kwBqjIwMDIEYUtjAwMLIFCCyPkl5qYCZZ8u2QFEz_ctebJj9_NZLS8nbXza06pUCwBJjfAtYwAAAA.d55kXDGL5CQkXOQ-_g4QP0GHElHtH2N2kc64c065c5nI3I0uwCTBaY1pmrtJPU4_9nQykUJDV6kJ2HqZZEx0_Q';
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
			'-210': '银行卡账户余额不足'
		}
	}
}

export default Config;
