var ending = function(){
	
	//------ 変数などの定義はここから-----------
	
	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// このシーンを管理するシーンの変数
	var scene = new Scene();

	var bgm = game.assets['sound/ending.mp3'];
	bgm.play();
	// TODO
	// 	シーンの設定

	var fighter = new Sprite(64, 64);
	fighter.image = game.assets["images/character.png"];
	fighter.x = game.width/2 - fighter.width/2;	// X座標
	fighter.y = game.height/2 - fighter.height/2;	// Y座標
	scene.addChild(fighter);

	var yoshimoto = new Sprite(128, 128);
	yoshimoto.image = game.assets["images/yoshimoto.png"];
	yoshimoto.x = game.width/2 - yoshimoto.width/2;	// X座標
	yoshimoto.y = game.height/2 - yoshimoto.height/2;	// Y座標
	yoshimoto.visible = false;
	scene.addChild(yoshimoto);


	fighter.tl.delay(60).hide().delay(10).show()
	.delay(50).hide().delay(10).show()
	.delay(35).hide().delay(10).show()
	.delay(15).hide().delay(10).show()
	.delay(7).hide().delay(7).show()
	.delay(5).hide().delay(5).show()
	.delay(3).hide().delay(3).show()
	.hide().delay(3).show().delay(3)
	.hide().delay(3).show().delay(3)
	.hide().delay(3).show().delay(3)
	.hide().delay(3).show().delay(3)
	.hide().delay(3).show().delay(3)
	.hide().delay(3).show().delay(3).hide().then(function(){
		yoshimoto.visible = true;
		yoshimoto.tl.delay(60).fadeOut(60, enchant.Easing.LINEAR).then(function(){
			game.replaceScene(startScreen());
		})
	});

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