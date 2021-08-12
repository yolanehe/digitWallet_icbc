import Config from '@/common/config.js'
const baseUrl = 'http://10.2.1.157:8888/'
class BaseService {
	static post(url, data = {}) {
		return this.request({
			method: 'post',
			url: url,
			token: Config.getToken(), 
		}, data);
	}

	static get(url, data = {}) {
		return this.request({
			method: 'get',
			url: url,
			token: Config.getToken(),
		}, data);
	}

	static request = (opts, data = {}) => {         
		return new Promise((resolve, reject) => {
			uni.request({
				method: opts.method,
				url: baseUrl + opts.url,
				dataType: 'json',
				data: data,
				header: {
					token: opts.token,
				},
				success: (res) => {
					setTimeout(function() {
						uni.hideLoading();
					}, 200);
					resolve(res.data);
				},
				fail: (err) => {
					uni.showToast({
						title: '请求出错',
						duration: 2000,
						icon:error
					})
					reject(err)
				}
			})
		});
	}
}

export default BaseService
