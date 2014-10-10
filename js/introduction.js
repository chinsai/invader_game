//TODO
//	画像を使いたい時、画像のパスをmainのpreloadに入れる

var introduction = function (){

	//------ 変数などの定義はここから-----------
	
	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// このシーンを管理するシーンの変数
	var scene = new Scene();

	// TODO
	// 	シーンの設定

	//background
	var background = new Sprite(1280, 720);
	background.image =  game.assets['images/intro.png'];
	background.x = 0;
	background.y = 0;
	background.opacity = 0;
	scene.addChild(background);


	// タイトルの設定
	var title = new Label('KMDで勉学に励んでいたヨシは、<br><br>ある日大魔王エスタークリンゴによって<br><br>りんごに変身させられてしまった。<br><br>元の姿を取り戻すべく、ヨシは旅に出るのであった。')
	title.font = '400 24px "Helvetica Neue"';
	title.width = 640;
	title.color = 'white';
	title.textAlign = 'center';
	// title.scaleY = 2;
	title.x = GAME_WIDTH/2 - title.width/2;		
	title.y = GAME_HEIGHT + 100;		//下から
	scene.addChild(title);


	//Opening Animation

	//背景fade in
	background.tl.fadeIn(30, enchant.Easing.LINEAR);
	//文字が下から上がる
	title.tl.moveTo(GAME_WIDTH/2 - title.width/2, -500, 360, enchant.Easing.LINEAR);
	//背景fade outそしてsceneを変える
	background.tl.delay(320).fadeOut(30, enchant.Easing.LINEAR).then(function(){
		nextStage();
	});

	




	// FRAMEごとに処理することはここにいれる
	scene.addEventListener(Event.ENTER_FRAME, function(){
		//TODO
		//---ここからコード
	})

	// B (pause ボタンを離したとき)
	scene.addEventListener(Event.A_BUTTON_UP, function(){
		//fadeout then go to stage1
		title.tl.clear().fadeOut(30, enchant.Easing.LINEAR);
		//背景fade outそしてsceneを変える
		background.tl.clear().fadeOut(30, enchant.Easing.LINEAR).then( function(){
			nextStage();
		});
		
	})

	//他のfunctionはここから書く

	var nextStage = function(){
		game.replaceScene( stage1() );
	}

	return scene;
}