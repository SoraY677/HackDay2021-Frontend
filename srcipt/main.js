import "../style/main.css"

import {
	Recognition
} from "./Recognition"
import {
	Live2DMgr as Model
} from './Live2DMgr'
import {
	shLoading,
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
		setTimeout(() => {
			shLoading(commentListDOM)
		}, 800);
		setTimeout(async () => {

			const result = await fetchAdviserComment(recogText)
			shLoading(commentListDOM.lastElementChild, result)
			model.startLipSync(result)
			voiceRecog.startRecog()
			model.startRandomMotion()
		}, 4000);

	}
)

voiceRecog.startRecog(commentListDOM)