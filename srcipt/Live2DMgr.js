import {
	Manager
} from '../resources/Live2D/OriginalLib/Manager.js'


export class Live2DMgr {
	constructor(canvas, modelSetting) {
		this.manager = new Manager(canvas, modelSetting)
	}

	startLipSync() {
		this.manager.switchLipSync()
	}
}