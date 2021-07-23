import BaseService from './baseService.js'

class Service extends BaseService{
	static getWallet = (token, data) => {
		let url = 'digitalWallet/getUserInfo'
		
		return this.get(url, token, data)
	}
	
	static getCardIdentification = (token, cardId, data) => {
		let url = 'card/openCard?cardId=' + cardId
		console.log(url)
		
		return this.post(url, token, data)
	}
}

export default Service