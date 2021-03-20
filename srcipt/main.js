import "../style/main.css"

import {
	Recognition
} from "./Recognition"
import {
	Live2DMgr as Model
} from './Live2DMgr'
import {
	insertCommentDOM,
	fetchAdviserComment
} from './Common'

// 定数
const commentListDOM = document.getElementById('comment_list')

// 初期化系
// - モデル
const model = new Model(
	document.getElementById('model_canvas'), {
		'modelRootDir': '../resources/Live2D//Model/Hiyori/',
		'modelJson': 'Hiyori.model3.json',
		'modelMoc': 'Hiyori.moc3'
	}
)
// - 音声録音セッティング
const voiceRecog = new Recognition(
	commentListDOM,
	() => {
		const recogText = voiceRecog.stopRecog()
		setTimeout(async () => {
			const result = await fetchAdviserComment(recogText)
			insertCommentDOM(commentListDOM, result, 1)
			model.startLipSync('hogehoge')
			voiceRecog.startRecog()
			model.startRandomMotion()
		}, 4000);

	}
)

voiceRecog.startRecog(commentListDOM)