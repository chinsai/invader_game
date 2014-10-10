//TODO
//	画像を使いたい時、画像のパスをmainのpreloadに入れる

var stage2 = function (){

	//------ 変数などの定義はここから-----------
	
	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// このシーンを管理するシーンの変数
	var scene = new Scene();

	// TODO
	// 	シーンの設定
	//background
	var background = new Sprite(1280, 720);
	background.image =  game.assets['images/stage2.png'];
	background.x = 0;
	background.y = 0;
	scene.addChild(background);


	// FRAMEごとに処理することはここにいれる
	scene.addEventListener(Event.ENTER_FRAME, function(){
		//TODO
		//---ここからコード
	})

	// B (pause ボタンを離したとき)
	scene.addEventListener(Event.B_BUTTON_UP, function(){
		toPause();
	})

	//他のfunctionはここから書く

	return scene;
}