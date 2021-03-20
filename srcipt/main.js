import "../style/main.css"

import {
	Recognition
} from "./Recognition"

import {
	Live2DMgr as Model
} from './Live2DMgr'



// 初期化系
// - 音声録音セッティング
const voiceRecog = new Recognition(document.getElementById('comment_list'))

voiceRecog.startRecog()

const model = new Model(
	document.getElementById('model_canvas'), {
		'modelRootDir': '../resources/Live2D//Model/Hiyori/',
		'modelJson': 'Hiyori.model3.json',
		'modelMoc': 'Hiyori.moc3'
	}
)