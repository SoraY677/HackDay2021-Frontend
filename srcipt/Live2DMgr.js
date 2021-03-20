import {
	Manager
} from '../resources/Live2D/OriginalLib/Manager.js'


export class Live2DMgr {
	constructor(canvas, modelSetting) {
		this.manager = new Manager(canvas, modelSetting)
	}

	startLipSync(text) {
		const length = text.length
		this.manager.startLipSync(length)
	}
}