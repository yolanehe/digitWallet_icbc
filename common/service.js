import BaseService from './baseService.js'

class Service extends BaseService {
	static getWallet = (data) => {
		let url = 'digitalWallet/getUserInfo'

		return this.get(url, data)
	}

	static getCardIdentification = (cardId, data) => {
		let url = 'card/openCard?cardId=' + cardId
		console.log(url)

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
		let url = 'card/reCharge'
		
		let data = {
			'id': cardId,
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

	static getCardInfo = (cardId, data) => {
		let url = 'card/getCardInfo?cardId=' + cardId

		return this.post(url, data)
	}

	static getCardInfoAndType = (cardId, type, data) => {
		let typeCode = 1
		if (type == '充值') {
			typeCode = 0
		}
		
		let url = 'card/getCardInfo?type=' + typeCode + '&cardId=' + cardId
		// console.log(url)
		return this.post(url, data)
	}
}

export default Service
