import "../style/main.css"

import {
	Recognition
} from "./Recognition"
import {
	Live2DMgr as Model
} from './Live2DMgr'
import {
	shLoading,
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

function recogCallBack() {
	const recogText = voiceRecog.stopRecog()
	setTimeout(function () {
		shLoading(commentListDOM)
	}, 800);
	setTimeout(function () {
		fetchAdviserComment(recogText).then(res => {
			shLoading(commentListDOM.lastElementChild, res)
			model.startLipSync(res)
			voiceRecog.startRecog()
			model.startRandomMotion()
		})
	}, 4000);
}
// - 音声録音セッティング
const voiceRecog = new Recognition(
	commentListDOM,
	recogCallBack
)

document.getElementById('start_btn').onclick = () => {
	document.getElementById('title').classList.add('invisible')
	voiceRecog.startRecog()
}