import BaseService from './baseService.js'

class Service extends BaseService {
	static getWallet = (data) => {
		let url = 'digitalWallet/getUserInfo'

		return this.get(url, data)
	}

	static getCardIdentification = (cardId, data) => {
		let url = 'card/establishCard?cardId=' + cardId

		return this.post(url, data)
	}

	static getAccounts = (data) => {
		let url = 'digitalWallet/getCardsInfo'

		return this.get(url, data)
	}

	static walletRecharge = (accId, pwd, amount) => {
		let url = 'digitalWallet/reCharge'
		
		let data = {
			'transObjId': accId,
			'payPassword': pwd,
			'amount': amount
		}

		return this.post(url, data)
	}
	
	static walletWithdraw = (accId, pwd, amount) => {
		let url = 'digitalWallet/withDraw'
		
		let data = {
			'transObjId': accId,
			'payPassword': pwd,
			'amount': amount
		}
		
		return this.post(url, data)
	}
	
	static cardRecharge = (cardId, walletId, pwd, amount) =>  {
		let url = 'card/reCharge?id=' + cardId
		
		let data = {
			'transObjId': walletId,
			'payPassword': pwd,
			'amount': amount
		}
		
		return this.post(url, data)
	}
	
	static cardWithdraw = (cardId, walletId) =>  {
		let url = 'card/withDraw?cid=' + cardId + '&wid=' + walletId
		
		// let data = {
		// 	'cid': cardId,
		// 	'wid': walletId
		// }
		
		let data = {}
		
		return this.post(url, data)
	}

	static getCardInfo = (cardId, typeCode='', data) => {
		console.log("typeCode", typeCode)
		if (typeCode == '0'){
			typeCode = ''
		}else{
			typeCode = typeCode - 1
		}
		let url = 'card/getCardInfo?type=' + typeCode + '&cardId=' + cardId
		return this.post(url, data)
	}
	
	static getWalletTrans = (typeCode) => {
		let url = 'digitalWallet/getTransFlow'
		
		if (typeCode != -1) {
			typeCode = typeCode - 1
			url += '?type=' + typeCode
		}
		
		return this.get(url, {})
	}
	
	static getRandom = () => {
		let url = 'digitalWallet/getRechargeKey'
		return this.get(url, {})
	}
}

export default Service
