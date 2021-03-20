export function insertCommentDOM(targetDOM, text, targetNum) {
	// ユーザ
	if (targetNum == 0) {
		targetDOM.insertAdjacentHTML('beforeend',
			`
		<li class="comment left">
		<p>${text}</p>
		</li>
		`)
	}
	// コンピュータ
	else if (targetNum == 1) {
		targetDOM.insertAdjacentHTML('beforeend',
			`
		<li class="comment right">
		<p>${text}</p>
		</li>
		`)
	}
	//コメント対象者の番号指定がおかしい 
	else {
		throw ('コメントをした対象がおかしいので確認')
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
		req.open('GET', `http://ec2-3-112-68-32.ap-northeast-1.compute.amazonaws.com/?text=${text}`)
		req.send()
	})

}