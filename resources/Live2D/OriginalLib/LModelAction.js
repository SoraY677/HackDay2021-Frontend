import {
	Live2DCubismFramework as live2dcubismframework
} from '../Framework/live2dcubismframework';
import {
	Live2DCubismFramework as csmvector
} from '../Framework/type/csmvector';
import {
	Live2DCubismFramework as cubismusermodel
} from '../Framework/model/cubismusermodel';
import {
	Live2DCubismFramework as cubismeyeblink
} from '../Framework/effect/cubismeyeblink';
import {
	Live2DCubismFramework as cubismbreath
} from '../Framework/effect/cubismbreath';
import {
	Live2DCubismFramework as cubismdefaultparameterid
} from '../Framework/cubismdefaultparameterid';
import {
	Live2DCubismFramework as cubismmotionmanager
} from '../Framework/motion/cubismmotionmanager'

const CubismFramework = live2dcubismframework.CubismFramework;
const csmVector = csmvector.csmVector;
const CubismEyeBlink = cubismeyeblink.CubismEyeBlink;
const CubismBreath = cubismbreath.CubismBreath;
const BreathParameterData = cubismbreath.BreathParameterData;
const CubismMotionManager = cubismmotionmanager.CubismMotionManager
const CubismDefaultParameterId = cubismdefaultparameterid;
const CubismUserModel = cubismusermodel.CubismUserModel;


import {
	Common
} from "./Common"

const LipSyncStateNum = 3
const Increment = 0.2
export class LModelAction extends CubismUserModel {

	constructor() {
		super()
		this._eyeBlinkIds = new csmVector()
		this._lipSyncIds = new csmVector()
		this._motionList = []
		this._motionManager = new CubismMotionManager()
		this.value = 0;
		this.increment = Increment
		this.lipSyncInterval = 1;
		this.lipSyncFlag = false;
	}
	/**
	 * セットアップ系の統括
	 */
	async setting(model, dirpath) {
		//腕Bを消す前処理
		model._model.setPartOpacityById(CubismFramework.getIdManager().getId("PartArmB"), 0.0);
		this.setupEyeBlink(model) // 瞬き
		this.setupLipSync(model) // リップシンク
		this.setupBreath(model) //呼吸
		this.setupMotion(model)

	}

	setupEyeBlink(model) {
		const eyeBlinkIdCount = model._modelSetting.getEyeBlinkParameterCount();
		if (eyeBlinkIdCount > 0) {
			this._eyeBlink = CubismEyeBlink.create(model._modelSetting);
			for (let i = 0; i < eyeBlinkIdCount; ++i) {
				this._eyeBlinkIds.pushBack(model._modelSetting.getEyeBlinkParameterId(i));
			}
		}
	};

	setupLipSync(model) {
		const lipSyncIdCount = model._modelSetting.getLipSyncParameterCount();

		for (let i = 0; i < lipSyncIdCount; ++i) {
			this._lipSyncIds.pushBack(model._modelSetting.getLipSyncParameterId(i));
		}

	}

	setupBreath(model) {

		this._breath = CubismBreath.create();

		//呼吸時のパラメタ設定
		const breathParameters = new csmVector();
		breathParameters.pushBack(new BreathParameterData(model._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
		breathParameters.pushBack(new BreathParameterData(model._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
		breathParameters.pushBack(new BreathParameterData(model._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
		breathParameters.pushBack(new BreathParameterData(model._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
		breathParameters.pushBack(
			new BreathParameterData(
				CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBreath),
				0.0,
				0.5,
				3.2345,
				0.5
			)
		);

		//セット
		this._breath.setParameters(breathParameters);
	}

	setupMotion(model) {

		for (let i = 0; i < this._motionList.length; i++) {
			this._motionList[i].setFadeInTime(1.0);
			this._motionList[i].setFadeOutTime(1.0);
			this._motionList[i].setIsLoop(false);
			this._motionList[i].setEffectIds(this._eyeBlinkIds, this._lipSyncIds);
		}
	}

	fireMotionTrigger(index) {
		let autoDelete = false;
		let priority = 3;
		this._motionManager.stopAllMotions();

		this._motionManager.startMotionPriority(this._motionList[index], autoDelete, priority);
	}

	/**
	 * リップシンクをtrue/falseを切り替える
	 */
	startLipSync(count) {
		this.lipSyncFlag = !this.lipSyncFlag
		this.wordCount = count;
		this.count = 0;
		this.lipSyncInterval = 1;
	}

	/**
	 * モデルを更新
	 * @param {} model 
	 */
	update(model) {
		model._model.loadParameters();
		const deltaTimeSeconds = Common.getDeltaTime();
		// 瞬き
		if (this._eyeBlink != null) {
			// メインモーションの更新がないとき
			this._eyeBlink.updateParameters(model._model, deltaTimeSeconds);
		}
		// 呼吸など
		if (this._breath != null) {
			this._breath.updateParameters(model._model, deltaTimeSeconds);
		}

		if (this._lipsync) {
			if (this.lipSyncInterval % LipSyncStateNum == 0 && this.lipSyncFlag) {

				if (this.value < 0) {
					this.value = 0.0;
					this.increment *= -1.0
					this.count++
				} else if (this.value >= 1) {
					this.value = 1.0;
					this.increment *= -1.0
				}

				if (this.count == this.wordCount) this.lipSyncFlag = false


				for (let i = 0; i < model._modelSetting.getLipSyncParameterCount(); ++i) {
					model._model.setParameterValueById(model._modelSetting.getLipSyncParameterId(i), this.value, 0.8);
				}
				this.value += this.increment
			}
			this.lipSyncInterval += 1
		}

		if (this._pose != null) {
			this._pose.updateParameters(model, deltaTimeSeconds)
		}
		if (!this._motionManager.isFinished()) {
			this._motionManager.updateMotion(model, deltaTimeSeconds);
		}
		model._model.saveParameters();

	}
}