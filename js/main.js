enchant();


var GAME_WIDTH = 1280;
var GAME_HEIGHT = 720;
var GAME_FPS = 30;

var isPaused = false;

var toPause = null;

window.onload = function(){

	var game = new Game(GAME_WIDTH, GAME_HEIGHT);
	game.rootScene.backgroundColor = 'black';
	game.fps = GAME_FPS;

	game.preload(
		'sound/stage1.mp3', 'sound/stage2.mp3', 'sound/stage3.mp3', 'sound/stage4.mp3', 
		'images/character.png','images/monster1.png','images/monster2.png', 'images/monster3.png', 'images/monster4.png',
		'images/intro.png', 'images/stage1.png', 'images/stage2.png', 'images/stage3.png', 'images/stage4.png', 'images/over.png', 
		'images/beam.png', 'images/laser.png', 'images/blast.png'
		);

	// Key setting
	game.keybind(32, "a");	//SPACE -> shoot
	game.keybind(27, "b");	//ESC -> Pause


	game.onload = function(){

		//最初はstart screenのsceneを見せる

		// データの読み込みが完了したら処理
		
		// テスト用直接飛ぶ
		// game.replaceScene( invader() );
		game.replaceScene( startScreen() );
		// game.replaceScene( introduction() );
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