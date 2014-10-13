//TODO
//	画像を使いたい時、画像のパスをmainのpreloadに入れる

var invader = function (){

	//------ 変数などの定義はここから-----------
	
	// ゲームのオブジェクトを取得する	
	var game = enchant.Game.instance;

	// このシーンを管理するシーンの変数
	var scene = new Scene();

	// TODO
	// 	シーンの設定

	//BGM
	var bgm = game.assets['sound/stage1.mp3'];
	bgm.play();

	game.score = 0;
	// 敵の総数を入れるカウンタ変数
	var count = 0;
	// 敵を格納する配列
	var enemy = new Array();
	// 敵のレーザービームを格納する配列(最大でも8つまで)
	var enemyLaser = new Array();
	var maxLaser = 8;
	var beamSpeed = 16;
	var laserSpeed = 10;
	var characterSpeed = 10;
	// 敵全体を移動させるための座標を用意する
	var enemyDX = 4;
	var enemyDY = 0;
	// 消した敵の総数を入れる変数
	var total = 0;


	//background
	var background = new Sprite(1280, 720);
	background.image =  game.assets['images/stage1.png'];
	background.x = 0;
	background.y = 0;
	scene.addChild(background);

	// var scoreLabel = new Label("SCORE : 0");
	// scoreLabel.font = "16px Tahoma";
	// scoreLabel.color = "white";
	// scoreLabel.x = 10;	// X座標
	// scoreLabel.y = 5;	// Y座標
	// scene.addChild(scoreLabel);

	var fighter = new Sprite(64, 64);
	fighter.image = game.assets["images/character.png"];
	fighter.x = game.width/2;	// X座標
	fighter.y = game.height - 64;	// Y座標
	fighter._style.zIndex = 1;
	scene.addChild(fighter);
	// ビームの設定
	var beam = new Sprite(4, 16);
	beam.flag = false;	// ビームが発射されているかどうかのフラグ
	beam.x = fighter.x + fighter.width/2;	// 自機の中央に設置
	beam.y = fighter.y - 11;	// 自機より少し上のY座標に設置
	beam.image = game.assets["images/beam.png"];
	beam._style.zIndex = 2;
	scene.addChild(beam);
	
	// 敵を描く
	drawEnemy();
	// 敵のレーザービームを初期化する
	initEnemyLaser();
	// 爆風の設定
	var blast = new Sprite(32, 32);
	blast.image = game.assets["images/blast.png"];
	blast.y = -9999;	// Y座標
	blast._style.zIndex = 10;	// 爆風は一番手前に重なるようにする
	scene.addChild(blast);





	// FRAMEごとに処理することはここにいれる
	scene.addEventListener(Event.ENTER_FRAME, function(){
		//TODO
		//---ここからコード
		startBeam();		// ビームの発射を確認
		moveBeam();		// ビームを移動させる
		moveFighter();	// 自機を移動させる（キーボード対応）
		moveEnemy();		// 敵を移動させる
		startEnemyLaser();	//敵のレーザービームを発射する
		moveEnemyLaser();		// 敵のレーザービームを移動させる
		moveBlast();		// 爆発の処理を行う
		hitCheck();	// ビームと敵の接触判定
		hitCheckLaser();	// レーザービームと自機の接触判定
		loopMusic();

	})

	// B (pause ボタンを離したとき)
	scene.addEventListener(Event.B_BUTTON_UP, function(){
		toPause();
	})


	//他のfunctionはここから書く
	// =============== 各種処理 ==================
	// ------------ ■ビームを移動させる -----------------
	function moveBeam(){
		if (beam.flag){
			beam.y = beam.y - beamSpeed;	// 8を減算するとビームは上に移動する
			// 画面外かどうか調べる
			if (beam.y < -32){ beam.flag = false; }
		}
	}
	// ------------ ■ビームを発射する -----------------
	function startBeam(){
		if (!beam.flag){
			// Aボタンが押されたらビームを発射
			if (game.input.a){
				beam.flag = true;	// trueにしてビームが発射されている事を示すようにする
				beam.x = fighter.x + fighter.width/2;	// 自機の中央から出す
				beam.y = fighter.y - 11;	// 自機より少し上のY座標から出す
			}
		}
	}
	// ------------ ■自機を移動させる -----------------
	function moveFighter(){
		// キーボード操作の場合
		if (game.input.left){
			fighter.x = fighter.x - characterSpeed;	// パドルを左に移動
			if (fighter.x < 0){ fighter.x = 0; }	// 左端かどうか調べる
		}
		if (game.input.right){
			fighter.x = fighter.x + characterSpeed;	 // パドルを右に移動
			if (fighter.x > (game.width-fighter.width)){ fighter.x = game.width - fighter.width; }	// 右端かどうか調べる
		}
		// ビームが発射されていない場合は自機と一緒に移動
		if (!beam.flag){
			beam.x = fighter.x + fighter.width/2;	// 自機の中央に設置
			beam.y = fighter.y - 11;	// 自機より少し上のY座標に設置
		}
	}
	// ------------ ■敵を移動させる -----------------
	function moveEnemy(){
		var reverseFlag = false;
		for(var i=0; i<count; i++){
			enemy[i].x = enemy[i].x + enemyDX;	// X座標の移動処理
			enemy[i].y= enemy[i].y + enemyDY;	// Y座標の移動処理
			enemy[i].tick = enemy[i].tick + 1;
			enemy[i].frame = enemy[i].tick >>> 4;	// ★敵をアニメーションさせる
			// 左右の端に到達したか調べる
			if ((enemy[i].y > 0) && ((enemy[i].x < 0) || (enemy[i].x > 1216))){ reverseFlag = true; }
			if (enemy[i].y > 650){
				scene.backgroundColor = "red";	// ゲームの背景色を赤色に設定
				// game.stop();
				// alert("A帝国はG帝国に征服されました。スコアは"+game.score+"点でした");
				game.pause();
				setTimeout(function(){game.replaceScene(gameOver());game.resume();}, 2000);
				return;	// 以後の処理は行わないようにする
			}
		}
		// 左右どちらかの端に到達した敵がいた場合の処理
		if (reverseFlag){
			enemyDX = -enemyDX;
			enemyDY = 12;
		}else{
			enemyDY = 0;
		}
	}
	// ------------ ■敵とビームの接触判定を行う -----------------
	function hitCheck(){
		if (!beam.flag){ return; }	// ビームが発射されていない場合は処理しない
		for(var i=0; i<count; i++){
			if (beam.intersect(enemy[i])){
				startBlast(enemy[i].x+enemy[i].width/2, enemy[i].y+enemy[i].height/2);	// ★爆風発生
				beam.flag = false;	// 接触した場合はビームを消す
				enemy[i].y = -9999;	// 見えない場所に移動
				game.score = game.score + 1;	// スコアを加算(1点)
				total = total - 1;	// 総敵数から1を引く
				if (total < 1){	// 全部倒したか調べる
					setTimeout("drawEnemy()", 2000);	// 2秒後に敵を再描画
				}
			}
		}
		// scoreLabel.text = "SCORE : "+game.score;
	}
	// ------------ ■自機と敵のレーザービームの接触判定を行う -----------------
	function hitCheckLaser(){
		// 自機の判定用に仮のオブジェクトを作成しXY座標と幅を設定する
		// var temp = {
		// 	x : fighter.x+4,
		// 	y : fighter.y+12,
		// 	width : 24,
		// 	height: 20
		// }
		for(var i=0; i<maxLaser; i++){
			if (enemyLaser[i].intersect(fighter)){	// 接触したらゲームオーバー
				bgm.stop();
				// scene.backgroundColor = "red";	// ゲームの背景色を赤色に設定
				game.pause();
				setTimeout(function(){game.replaceScene(gameOver());game.resume();}, 2000);
				// alert("自機が破壊されました。もう駄目です。スコアは"+game.score+"点でした");
				return;	// 以後の処理は行わないようにする
			}
		}
	}
	// ■爆発開始処理
	function startBlast(sx, sy){
		blast.flag = true;	// 爆風発生
		blast.x = sx;
		blast.y = sy;
		blast.frame = 0;	// 爆風のアニメーションを最初の画像に
	}
	// ■爆発処理
	function moveBlast(){
		if (!blast.flag){ return; }	// 爆風がない場合は何もしない
		blast.frame = blast.frame + 1;
		if (blast.frame == 8){	// 爆風の枚数は8枚なので、それ以上の場合は爆風処理をしない
			blast.flag = false;
			blast.y = -999;
		}
	}

	function drawEnemy(){
		count = 0;	// 敵の総数を示すカウンタを0にする
		// ビームの設定を縦横の数だけ繰り返し生成
		for(var y=0; y<5; y++){
			for(var x=0; x<7; x++){
				enemy[count] = new Sprite(64, 52);
				enemy[count].image = game.assets["images/monster1.png"];
				enemy[count].x = x * (64+20);	// X座標
				enemy[count].y = y * 64 + 50;	// Y座標
				enemy[count]._style.zIndex = 2;	// Z座標
				enemy[count].tick = 0;	// ★アニメーション用カウンタを初期化
				scene.addChild(enemy[count]);
				count = count + 1;	// 敵の総数を示すカウンタを増やす
			}
		}
		total = count;	// 消す敵の総数を変数に入れる
	}
	window.drawEnemy = drawEnemy;
	// ------------ 敵のレーザービームを初期化 -----------------
	function initEnemyLaser(){
		for(var i=0; i<maxLaser; i++){
			enemyLaser[i] = new Sprite(4, 16);
			enemyLaser[i].image = game.assets["images/laser.png"];
			enemyLaser[i].flag = false;	// レーザービームが存在するかどうかのフラグ
			enemyLaser[i].x = 0;	// X座標
			enemyLaser[i].y = -999;	// Y座標
			enemyLaser[i]._style.zIndex = 1;	// Z座標
			scene.addChild(enemyLaser[i]);
		}
	}
	// ------------ 敵のレーザービームを発射する -----------------
	function startEnemyLaser(){
		var pointer = Math.floor(Math.random() * 100);	// レーザービームを発射する敵の配列位置を求める
		if (!enemy[pointer] || enemy[pointer].y < 0 ){ return; }	// 敵が存在しない場合は発射しない
		for(var i=0; i<maxLaser; i++){
			if (!enemyLaser[i].flag){	// 空いているレーザービームの配列要素があるか
				enemyLaser[i].flag = true;	// 発射するレーザービームの存在をONにする
				enemyLaser[i].x = enemy[pointer].x + 14;	// X座標を設定	
				enemyLaser[i].y = enemy[pointer].y + 16;	// Y座標を設定
				return;	// 以後の処理はしない
			}
		}
	}
	// ------------ 敵のレーザービームを移動する -----------------
	function moveEnemyLaser(){
		for(var i=0; i<maxLaser; i++){
			if (!enemyLaser[i].flag){ continue; }	// レーザービームがない場合は繰り返しの先頭に
			enemyLaser[i].y= enemyLaser[i].y + laserSpeed;	// Y座標の移動処理
			if (enemyLaser[i].y > game.height){	// 画面外か？
				enemyLaser[i].flag = false;	// 発射するレーザービームの存在をOFFにする
				enemyLaser[i].y = -999;	// 発射するレーザービームのY座標を設定
			}
		}
	}

	function loopMusic(){
		// Loop BGM
		if (bgm.currentTime >= bgm.duration ){
		    bgm.play();
		}
	}
	return scene;
}