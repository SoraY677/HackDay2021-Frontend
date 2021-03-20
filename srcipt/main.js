import {
	Manager
} from '../resources/Live2D/OriginalLib/Manager.js'

const canvas = document.getElementById('model_canvas')
const modelSetting = {
	'modelRootDir': '../resources/Live2D//Model/Hiyori/',
	'modelJson': 'Hiyori.model3.json',
	'modelMoc': 'Hiyori.moc3'
}

const enter = new Manager(canvas, modelSetting)

enter.switchLipSync()