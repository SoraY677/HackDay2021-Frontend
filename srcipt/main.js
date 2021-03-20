import "../style/main.css"

import {
	Recognition
} from "./Recognition"

import {
	Live2DMgr as Model
} from './Live2DMgr'
import {
	fetchAdviserComment
} from './Common'

// 定数
const commentListDOM = document.getElementById('comment_list')


const model = new Model(
	document.getElementById('model_canvas'), {
		'modelRootDir': '../resources/Live2D//Model/Hiyori/',
		'modelJson': 'Hiyori.model3.json',
		'modelMoc': 'Hiyori.moc3'
	}
)

// 初期化系
// - 音声録音セッティング
const voiceRecog = new Recognition(
	commentListDOM,
	() => {
		voiceRecog.stopRecog()
		setTimeout(() => {
			fetchAdviserComment(commentListDOM)
			model.startLipSync('hogehoge')
			voiceRecog.startRecog()
			model.startRandomMotion()
		}, 4000);

	})

voiceRecog.startRecog(commentListDOM)