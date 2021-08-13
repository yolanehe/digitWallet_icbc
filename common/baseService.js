import Config from '@/common/config.js'
// const baseUrl = 'http://10.2.1.157:8888/'
const baseUrl = 'http://10.2.1.157:10001/'
// const baseUrl = 'https://10.2.1.157:9999/'

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
					reject(err)
					
					let item = {
						'title': '网络请求异常',
						'url': '/pages/login/login',
						'err_code': 502,
						'button_text': '点击返回首页重新请求',
						'transtype': 5
					}
					
					uni.redirectTo({
						url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
					})
				}
			})
		});
	}
}

export default BaseService
