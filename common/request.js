const baseUrl = 'http://10.2.1.157:8888/digitalWallet/'

const request = (opts, data = {}) => {
	return new Promise((resolve, reject) => {
		console.log(opts)
		uni.request({
			method: opts.method,
			url: baseUrl + opts.url,
			dataType: 'json',
			data: data,
			header: {},
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			// console.log(response)
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			console.log(err)
			let [err, res] = error;
			reject(err)
		})
	});
}

export default request