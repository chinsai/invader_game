//TODO
//	画像を使いたい時、画像のパスをmainのpreloadに入れる

var stage3 = function (){

	//------ 変数などの定義はここから-----------
	
	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// このシーンを管理するシーンの変数
	var scene = new Scene();

	// TODO
	// 	シーンの設定



	// FRAMEごとに処理することはここにいれる
	scene.addEventListener(Event.ENTER_FRAME, function(){
		//TODO
		//---ここからコード
	})

	// 画面にタッチしたことに対する処理
	scene.addEventListener(Event.TOUCH_START, function(e) {
		
		//テスト用
		game.replaceScene( startScreen() );
		//---ここからコード

	})

	//他のfunctionはここから書く

	return scene;
}