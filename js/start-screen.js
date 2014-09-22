var startScreen = function (){

	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// シーンの設定
	var scene = new Scene();
	scene.backgroundColor = 'blue';

	// タイトルの設定
	var title = new Label('The Lord of the Ringo')
	title.font = '400 28px "Helvetica Neue"';
	title.x = GAME_WIDTH/2 - title.width/2;		//中央にする
	title.y = GAME_HEIGHT/2 - 100;				//中央より上
	title.color = 'white';
	title.textAlign = 'center';
	title.scaleY = 2;
	scene.addChild(title);

	// STARTボタンの設定
	var startButton = new Label('START');
	startButton.font = '400 28px "Helvetica Neue"';
	startButton.x = GAME_WIDTH/2 - startButton.width/2;
	startButton.y = GAME_HEIGHT/2 + 100;
	startButton.color = 'white';
	startButton.textAlign = 'center';
	startButton.addEventListener(Event.TOUCH_START, function(e) {
		// ゲーム処理開始
		game.replaceScene( invader() );
	})
	scene.addChild(startButton);

	//apple icon
	var icon = new Sprite(32, 32);
	icon.image = game.assets['images/apple.png'];
	icon.x = GAME_WIDTH/2 - icon.width/2;
	icon.y = GAME_HEIGHT/2 - icon.height/2;
	scene.addChild(icon);



	//FRAMEごとに処理することはここにいれる
	scene.addEventListener(Event.ENTER_FRAME, function(){
		//TODO
	})

	// 画面にタッチしたことに対しての処理
	scene.addEventListener(Event.TOUCH_START, function(e) {
		//TODO
	})



	return scene;
}