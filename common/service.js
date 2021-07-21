import BaseService from './baseService.js'

class Service extends BaseService{
	static getWallet = (userId, data) => {
		let url = 'getUserInfo?id=' + userId
		
		return this.get(url, data)
	}
}

export default Service