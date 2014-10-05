enchant();


var GAME_WIDTH = 320;
var GAME_HEIGHT = 480;
var GAME_FPS = 30;

var isPaused = false;

var toPause = null;

window.onload = function(){

	var game = new Game(GAME_WIDTH, GAME_HEIGHT);
	game.rootScene.backgroundColor = 'black';
	game.fps = GAME_FPS;

	game.preload('images/droid.png', 'images/beam.png', 'images/apple.png', 'images/laser.png', 'images/blast.png');
	// Zキーをaボタンとして割り当てる
	game.keybind(32, "a");	//SPACE -> shoot
	game.keybind(27, "b");	//ESC -> Pause


	game.onload = function(){

		//最初はstart screenのsceneを見せる

		// データの読み込みが完了したら処理
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


	toPause = function(){
		console.log("asdfa")
		if( isPaused ){
			game.resume();
			isPaused = false;
		}
		else{
			game.pause();
			isPaused = true;
		}
	}
}