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


}