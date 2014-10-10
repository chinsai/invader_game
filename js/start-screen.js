var startScreen = function (){

	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// シーンの設定
	var scene = new Scene();
	scene.backgroundColor = 'black';

	// タイトルの設定
	var title = new Label('The Lord of the Ringo')
	title.font = '400 80px "Helvetica Neue"';
	title.width = 800;
	title.color = 'white';
	title.textAlign = 'center';
	// title.scaleY = 2;
	title.x = GAME_WIDTH/2 - title.width/2;		//中央にする
	title.y = 0 + title.height/2;				//中央より上
	scene.addChild(title);
	title.tl.moveTo(GAME_WIDTH/2 - title.width/2, GAME_HEIGHT/2 - 200, 90, enchant.Easing.LINEAR);

	// STARTボタンの設定
	var startButton = new Label('press SPACE to start');
	startButton.font = '400 18px "Helvetica Neue"';
	startButton.x = GAME_WIDTH/2 - startButton.width/2;
	startButton.y = GAME_HEIGHT/2 + 100;
	startButton.color = 'white';
	startButton.textAlign = 'center';
	scene.addChild(startButton);
	startButton.opacity = 0;
	startButton.tl.fadeIn(30, enchant.Easing.LINEAR).fadeOut(30, enchant.Easing.LINEAR).loop();


	// //apple icon
	// var icon = new Sprite(32, 32);
	// icon.image = game.assets['images/apple.png'];
	// icon.x = GAME_WIDTH/2 - icon.width/2;
	// icon.y = GAME_HEIGHT/2 - icon.height/2;
	// scene.addChild(icon);

	// SPACE を離したときにゲーム始まる
	scene.addEventListener(Event.A_BUTTON_UP, function(){	
		title.tl.clear().fadeOut(30, enchant.Easing.LINEAR);
		
		startButton.tl.clear().fadeOut(30, enchant.Easing.LINEAR).then(function(){
			game.replaceScene( introduction() );
		});
	})


	//FRAMEごとに処理することはここにいれる
	scene.addEventListener(Event.ENTER_FRAME, function(){
		//TODO
	})

	return scene;
}