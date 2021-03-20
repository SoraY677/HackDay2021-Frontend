export function insertCommentDOM(targetDOM, text) {
	targetDOM.insertAdjacentHTML('beforeend',
		`
		<li class="comment left">
		<p>${text}</p>
		</li>
		`)

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

export async function fetchAdviserComment(text) {
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
		req.open('GET', `https://cors-anywhere.herokuapp.com/https://g6ykvq7is4.execute-api.ap-northeast-1.amazonaws.com/?text=${text}`)
		req.send()
	})

}