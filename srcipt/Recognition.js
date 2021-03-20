import {
	insertCommentDOM
} from './Common'

export class Recognition {
	constructor(targetDOM) {
		const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
		this.recognition = new SpeechRecognition();
		this.recognition.continuous = true;

		this.isRecogStarted = false

		// 文章を読み取った際にDOMに反映していく処理
		this.comment_i = 0;
		this.recognition.onresult = (event) => {
			insertUserCommentDOM(targetDOM, event.results[this.comment_i][0].transcript, 0)
			this.comment_i++;
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
	}
}