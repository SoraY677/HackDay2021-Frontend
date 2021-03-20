import "../style/main.css"

// import {
// 	Recognition
// } from "./Recognition"
// import {
// 	Live2DMgr as Model
// } from './Live2DMgr'
// import {
// 	shLoading,
// 	insertCommentDOM,
// 	fetchAdviserComment
// } from './Common'

// // 定数
// const commentListDOM = document.getElementById('comment_list')

// // 初期化系
// // - モデル
// const model = new Model(
// 	document.getElementById('model_canvas'), {
// 		'modelRootDir': '../resources/Live2D//Model/Hiyori/',
// 		'modelJson': 'Hiyori.model3.json',
// 		'modelMoc': 'Hiyori.moc3'
// 	}
// )
// // - 音声録音セッティング
// const voiceRecog = new Recognition(
// 	commentListDOM,
// 	() => {
// 		const recogText = voiceRecog.stopRecog()
// 		setTimeout(() => {
// 			shLoading(commentListDOM)
// 		}, 800);
// 		setTimeout(async () => {

// 			const result = await fetchAdviserComment(recogText)
// 			shLoading(commentListDOM.lastElementChild, result)
// 			model.startLipSync(result)
// 			voiceRecog.startRecog()
// 			model.startRandomMotion()
// 		}, 4000);

// 	}
// )

// Imports the Google Cloud client library
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

async function quickstart() {
	// The path to the remote LINEAR16 file
	const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

	// The audio file's encoding, sample rate in hertz, and BCP-47 language code
	const audio = {
		uri: gcsUri,
	};
	const config = {
		encoding: 'LINEAR16',
		sampleRateHertz: 16000,
		languageCode: 'en-US',
	};
	const request = {
		audio: audio,
		config: config,
	};

	// Detects speech in the audio file
	const [response] = await client.recognize(request);
	const transcription = response.results
		.map(result => result.alternatives[0].transcript)
		.join('\n');
	console.log(`Transcription: ${transcription}`);
}
quickstart();