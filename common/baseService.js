const baseUrl = 'http://10.2.1.157:8888/'

class BaseService {
	static post(url, token, data = {}) {
		return this.request({
			method: 'post',
			url: url,
			token: token
		}, data);
	}
	
	static get(url, token, data = {}) {
		return this.request({
			method: 'get',
			url: url,
			token: token
		}, data);
	}
	
	static request = (opts, data = {}) => {
		return new Promise((resolve, reject) => {
			console.log('request')
			// console.log(opts)
			// console.log(opts.token)
			
			uni.request({
				method: opts.method,
				url: baseUrl + opts.url,
				dataType: 'json',
				data: data,
				header: {
					token: opts.token
				},
			}).then((response) => {
				setTimeout(function() {
					uni.hideLoading();
				}, 200);
				console.log('response:', response)
				let [error, res] = response;
				resolve(res.data.data);
				
			}).catch(error => {
				console.log('err:' + err)
				uni.showToast({
					title: '请求出错',
					duration: 2000
				})
				let [err, res] = error;
				reject(err)
			})
		});
	}
}

export default BaseService
