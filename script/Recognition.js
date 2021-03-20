import {
	insertCommentDOM
} from './Common'

export class Recognition {
	constructor(targetDOM, callback) {
		const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
		this.recognition = new SpeechRecognition();
		this.recognition.lang = "ja-JP"; //言語指定：日本語
		this.recognition.continuous = true;

		this.recogTextList = []
		this.isRecogStarted = false

		this.comment_i = 0
		// 文章を読み取った際にDOMに反映していく処理
		this.recognition.onresult = (event) => {
			const text = event.results[0][0].transcript
			this.recogTextList.push(text.replace(/\s+/g, ''))
			insertCommentDOM(targetDOM, text, 0)
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