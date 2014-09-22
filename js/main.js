enchant();


var GAME_WIDTH = 320;
var GAME_HEIGHT = 480;

var GAME_FPS = 30;

window.onload = function(){

	var game = new Game(GAME_WIDTH, GAME_HEIGHT);
	game.rootScene.backgroundColor = 'black';
	game.fps = GAME_FPS;

	game.preload('images/droid.png', 'images/beam.png', 'images/apple.png', 'images/laser.png', 'images/blast.png');

	// データの読み込みが完了したら処理
	game.onload = function(){

		//最初はstart screenのsceneを見せる
		game.replaceScene( startScreen() );

		// テスト用直接飛ぶ
		// game.replaceScene( stage1() );
		// game.replaceScene( stage2() );
		// game.replaceScene( stage3() );
		// game.replaceScene( stage4() );
		// game.replaceScene( gaveOver() );

	}

	// ゲーム処理開始
	game.start();

}