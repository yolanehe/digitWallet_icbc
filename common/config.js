const bankCode = {
	'102': 'icbc',
	'103': 'abc',
	'104': 'boc',
	'105': 'ccb'
};

class Config {
	static getToken() {
		return 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJS8nR2ctYNDXYNUtJRSq0oULIyNDOyMDQ3MzA31VEqLU4t8kwBqjIwMDIEYUtjAwMLIFCCyPkl5qYCZZ8u2QFEz_ctebJj9_NZLS8nbXza06pUCwBJjfAtYwAAAA.d55kXDGL5CQkXOQ-_g4QP0GHElHtH2N2kc64c065c5nI3I0uwCTBaY1pmrtJPU4_9nQykUJDV6kJ2HqZZEx0_Q';
	}

	static getMAXMoney() {
		return 99999999.99
	}

	static getBankCode() {
		return bankCode
	}
}

export default Config;
