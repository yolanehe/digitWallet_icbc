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
	
	static getAccounts = (data) => {
		let url = 'digitalWallet/getCardsInfo'
	
		return this.get(url, data)
	}
	
	static getCardInfo = (cardId, data) => {
		let url = 'card/getCardInfo?cardId=' + cardId 
		console.log(url)
		
		return this.post(url, data)
	}
}

export default Service
