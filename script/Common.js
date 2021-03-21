let isRecording = false
export function insertCommentDOM(targetDOM, text = '') {
	if (!isRecording) {
		targetDOM.insertAdjacentHTML('beforeend',
			`
		<li class="comment left">
		<div class='rec-now'></div>
		<p>rec</p>
		</li>
		`)
		isRecording = true
	} else {
		targetDOM.innerHTML = `<p>${text}</p>`
		isRecording = false
	}

	const position = targetDOM.scrollHeight
	targetDOM.scrollTo(0, position);
}

let isLoadingShow = false
export function shLoading(targetDOM, text = '') {
	// 消えてる => 見せる
	if (!isLoadingShow) {
		targetDOM.insertAdjacentHTML(
			'beforeend', `
			<li class="comment right">
			<div class='loader'></div>
			</li>
			
		`)
		isLoadingShow = true
	}
	//見えてる => 消す
	else {
		targetDOM.innerHTML = `<p>${text}</p>`
		isLoadingShow = false
	}
	const position = targetDOM.scrollHeight
	targetDOM.scrollTo(0, position);
}

export function fetchAdviserComment(text) {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					// 通信成功時に
					resolve(JSON.parse(req.response)['msg'])
				}
			}
		}
		req.open('GET', `https://g6ykvq7is4.execute-api.ap-northeast-1.amazonaws.com/?text=${text}`)
		req.send()
	})

}