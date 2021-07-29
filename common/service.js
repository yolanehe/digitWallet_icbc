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

	static walletRecharge = (accId, pwd) => {
		let url = 'digitalWallet/reCharge'
		
		data = {
			'accId': accId,
			'pwd': pwd
		}

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
		console.log(url)
		return this.post(url, data)
	}
}

export default Service
