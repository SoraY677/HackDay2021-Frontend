import {
	insertCommentDOM
} from './Common'

export class Recognition {
	constructor(targetDOM, callback) {
		const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
		this.recognition = new SpeechRecognition();
		this.recognition.continuous = true;

		this.recogTextList = []
		this.isRecogStarted = false

		this.comment_i = 0
		// 文章を読み取った際にDOMに反映していく処理
		this.recognition.onresult = (event) => {
			this.recogTextList.push(String(event.results[0][0].transcript).replace('　', '').replace(' ', ''))
			insertCommentDOM(targetDOM, this.recogTextList[this.comment_i], 0)
			// コールバック関数
			callback()
			this.comment_i++
		}
	}

	startRecog() {
		if (this.isRecogStarted) this.recognition.stop()
		this.recognition.start()
		this.isRecogStarted = true
	}

	stopRecog() {
		this.recognition.stop()
		this.isRecogStarted = false
		return this.recogTextList[this.comment_i]
	}
}