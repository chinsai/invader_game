//TODO
//	画像を使いたい時、画像のパスをmainのpreloadに入れる

var gameOver = function (){

	//------ 変数などの定義はここから-----------
	
	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// このシーンを管理するシーンの変数
	var scene = new Scene();


	//background
	var background = new Sprite(1280, 720);
	background.image =  game.assets['images/over.png'];
	background.x = 0;
	background.y = 0;
	scene.addChild(background);
	
	// タイトルの設定
	var title = new Label('Game Over')
	title.font = '400 60px "Helvetica Neue"';
	title.width = 800;
	title.x = GAME_WIDTH/2 - title.width/2;		//中央にする
	title.y = GAME_HEIGHT/2 - 100;				//中央より上
	title.color = 'white';
	title.textAlign = 'center';
	// title.scaleY = 2;
	scene.addChild(title);
	

	// TRY AGAINボタンの設定
	var againButton = new Label('Press SPACE to try again');
	againButton.font = '400 18px "Helvetica Neue"';
	againButton.x = GAME_WIDTH/2 - againButton.width/2;
	againButton.y = GAME_HEIGHT/2 + 100;
	againButton.color = 'white';
	againButton.textAlign = 'center';
	againButton.addEventListener(Event.TOUCH_START, function(e) {
		// ゲーム処理開始
		game.replaceScene( startScreen() );
	})
	scene.addChild(againButton);


	// SPACE を離したときにゲーム始まる
	scene.addEventListener(Event.A_BUTTON_UP, function(){
		game.replaceScene( startScreen() );
	})

	// FRAMEごとに処理することはここにいれる
	scene.addEventListener(Event.ENTER_FRAME, function(){
		//TODO
		//---ここからコード
	})

	//他のfunctionはここから書く

	return scene;
}