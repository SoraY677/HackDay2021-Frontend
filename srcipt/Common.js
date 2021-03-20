export function insertCommentDOM(targetDOM, text) {
	targetDOM.insertAdjacentHTML('beforeend',
		`
		<li class="comment right">
		<p id="comment_text_1">${text}</p>
		</li>
		`
	);
}