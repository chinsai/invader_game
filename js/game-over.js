//TODO
//	画像を使いたい時、画像のパスをmainのpreloadに入れる

var gameOver = function (){

	//------ 変数などの定義はここから-----------
	
	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// このシーンを管理するシーンの変数
	var scene = new Scene();
	scene.backgroundColor = 'red';
	
	// タイトルの設定
	var title = new Label('Game OVer')
	title.font = '400 28px "Helvetica Neue"';
	title.x = GAME_WIDTH/2 - title.width/2;		//中央にする
	title.y = GAME_HEIGHT/2 - 100;				//中央より上
	title.color = 'white';
	title.textAlign = 'center';
	title.scaleY = 2;
	scene.addChild(title);
	

	// TRY AGAINボタンの設定
	var againButton = new Label('Try Again');
	againButton.font = '400 28px "Helvetica Neue"';
	againButton.x = GAME_WIDTH/2 - againButton.width/2;
	againButton.y = GAME_HEIGHT/2 + 100;
	againButton.color = 'white';
	againButton.textAlign = 'center';
	againButton.addEventListener(Event.TOUCH_START, function(e) {
		// ゲーム処理開始
		game.replaceScene( startScreen() );
	})
	scene.addChild(againButton);



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