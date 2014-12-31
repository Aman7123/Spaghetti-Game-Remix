/* Programmed by GeekWithAChick, and Aaron_Renner 
   Aaron_Renner: https://twitter.com/Aaron_Renner
   GeekWithAChick: http://dev.bukkit.org/profiles/GeekWithAChick/ */
$(function(){
    /* Variables */
    var settings = {
        'msPerTick': 20
    };
	var Gamestate = {
        READY:1,
        PLAYING:2,
        PAUSE:3,
        DEAD:4,
        properties:{
            1:{id:1, name:'Ready'},
            2:{id:2, name:'Playing'},
            3:{id:3, name:'Pause'},
            4:{id:4, name:'Dead'}
        }
    };
    var theGlobe;
	var SettingsButton;
    var listMonsters = [];
    var listFireballs = [];
	var fireballTarget = [];
    var mouse = {x: 0, y: 0};
	var gameFreeze = 1;
    var container = $('#container');
	var playagain = $('#playagain');
	var saveurl = $('#saveurl');
	var pause = $('#pause');
	var play = $('#play');
    var cooldownMonster = 20;
    var gamestate = Gamestate.READY;
    var highscore = 0;
    var score = 0;
	var FinalScore = 0;
	
	$('#spel .dead').hide();
	$('#spel .info').hide();
	$('#spel .paused').hide();
	$('#spel .getready').hide();
	
	var cookie = $.cookie('highscore');
    if(cookie)highscore=cookie;
    updateScore();
	
    /* Eventlisteners */
    document.addEventListener('mousemove', function(e){
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY
    }, false);

    /* Functions */
    function newGlobe(){
        var globe = new Object();
        globe.src = './content/images/globe.png';
        globe.X = 0;
        globe.Y = 0;
        globe.x = function(){return parseInt($('#globe').css('left'));};
        globe.y = function(){return parseInt($('#globe').css('top'));};
        globe.width = function(){return $('#globe').width();};
        globe.height = function(){return $('#globe').height();};
        globe.DOM = function(){return $('#globe');};
        globe.update = function(){
            $('#globe').css({'top': this.Y, 'left': this.X});
        };
        return globe;
    }
	
    function newMonster(){
        var monster = new Object();
        monster.src = './content/images/icon_noodle.gif';
        monster.id = Utils.guid();
        monster.X = 0;
        monster.Y = 0;
        monster.x = function(){return parseInt($('#' + monster.id).css('left'));};
        monster.y = function(){return parseInt($('#' + monster.id).css('top'));};
        monster.width = function(){return $('#' + monster.id).width();};
        monster.height = function(){return $('#' + monster.id).height();};
        monster.DOM = function(){return $('#' + monster.id);};
        monster.update = function(){
            $('#' + monster.id).css({'top': this.Y, 'left': this.X});
        };
        return monster;
    }
	
	function newPoint(X, Y) {
		var point = new Object();
		point.src = './content/images/point.jpg';
		point.id = Utils.guid();
		point.X = X;
		point.Y = Y;
        point.x = function(){return parseInt($('#' + point.id).css('left'));};
        point.y = function(){return parseInt($('#' + point.id).css('top'));};
        point.DOM = function(){return $('#' + monster.id);};
        point.update = function(){
            $('#' + point.id).css({'top': point.Y, 'left': point.X});
        };
		return point;
	}
	
    function newFireball(){
        var fireball = new Object();
        fireball.src = './content/images/fireball.gif';
        fireball.id = Utils.guid();
        fireball.X = 0;
        fireball.Y = 0;
        fireball.changeX = 0;
        fireball.changeY = 0;
        fireball.target = '';
        fireball.x = function(){return parseInt($('#' + fireball.id).css('left'));};
        fireball.y = function(){return parseInt($('#' + fireball.id).css('top'));};
        fireball.width = function(){return $('#' + fireball.id).width();};
        fireball.height = function(){return $('#' + fireball.id).height();};
        fireball.DOM = function(){return $('#' + fireball.id);};
        fireball.update = function(){
            $('#' + fireball.id).css({'top': this.Y , 'left': this.X});
        };
        return fireball;
    }

    function getHTMLforGlobe(globe){
        return $('<img>').attr({'id': 'globe', 'src': globe.src, 'unselectable': 'on'});
    }
	
    function getHTMLforMonster(monster){
        return $('<img>').attr({'id': monster.id, 'class': 'monster', 'src': monster.src, 'unselectable': 'on'});
    }

    function getHTMLforFireball(fireball){
        return $('<img>').attr({'id': fireball.id, 'class': 'fireball', 'src': fireball.src, 'unselectable': 'on'});
    }
	
    function getHTMLforPoint(point){
        return $('<img>').attr({'id': point.id, 'class': 'point', 'src': point.src, 'unselectable': 'on'});
    }

    function addGlobe(){
        var globe = newGlobe();
        container.append(getHTMLforGlobe(globe));
        theGlobe = globe;
        theGlobe.X = container.width()/2 - (theGlobe.height()/2);
        theGlobe.Y = container.height()/2 - (theGlobe.height()/2);
        theGlobe.update();
    }    
	
	function checkCollide(){
		for (var i in listMonsters){
			var difX = (theGlobe.x()+theGlobe.width()/2) - (listMonsters[i].x()+listMonsters[i].width()/2);
			var difY = (theGlobe.y()+theGlobe.height()/2) - (listMonsters[i].y()+listMonsters[i].height()/2);
			if(posi(difX) < 1 || posi(difY) < 1) {
				console.log('Collision');
				document.title = 'Game Over';
				clearField();
				gamestate = Gamestate.DEAD;
				FinalScore = score;
				score -= score;
				$('#spel .FinalScore').text(FinalScore);
				$('#spel .dead').slideDown();
				if(!(settings.msPerTick == 20)) {
					var err = "TPS equalled a number that wasn't 20, please submit a bug at <a href='https://github.com/Aman7123/Spaghetti_Invaders/issues/new?title=Error%20on%20line%20161&labels=bug&assignee=Aman7123' target='_blank' style='color: orange'>Github</a> or just hit F5 on your keyboard to refresh the page";
					var line = "161";
					throwError(err, line);
					break;
				};
				$('#spel .score').text(score);
				if(FinalScore == highscore) {
					console.log('Saved a new highscore of: ' + highscore);
					alert('NIce job.\nYou got a new high score of '+highscore);
				};
			}
		}
	}
	
	function clearField() {
		$('.monster').remove();
		$('.globe').remove();
		$('.fireball').remove();
		console.log('Cleared Field');
	}
	
	/*Handling Errors*/
	function throwError(err, line) {
		gameFreeze = 0;
		$('#spel .GameInfo').hide();
		$('#spel .dead').hide();
		$('#spel .getready').hide();
		$('#spel .ready').hide();
		pause.hide();
		play.hide();
		$('#spel .info').slideDown("fast");
		$('#spel .info_heading').html("An error occurred on line " + line);
		$('#spel .info_text').html(err);
	}
	
    function addMonster(){
        var monster = newMonster();
        container.append(getHTMLforMonster(monster));
        switch (Math.floor(Math.random() * 4) + 1){
            default:
                monster.X = Math.floor(Math.random() * container.width()) + 1;
                monster.Y = 0;
                break;
            case 2:
                monster.X = Math.floor(Math.random() * container.width()) + 1;
                monster.Y = container.height();
                break;
            case 3:
                monster.X = 0;
                monster.Y = Math.floor(Math.random() * container.height()) + 1;
                break;
            case 4:
                monster.X = container.width();
                monster.Y = Math.floor(Math.random() * container.height()) + 1;
                break;
        }
        monster.update();
        listMonsters.push(monster);
        monster.DOM().click(function(){
            addFireball(this.id);
            $(this).addClass('clicked');
        });
    }
	
    function addFireball(id){
        var fireball = newFireball();
        container.append(getHTMLforFireball(fireball));
        fireball.X = container.width()/2 - fireball.width()/2;
        fireball.Y = container.height()/2 - fireball.width()/2;
        fireball.target = id;
        fireball.update();
        listFireballs.push(fireball);
    }
	
    function getIndexOfMonster(id){
        for(var i in listMonsters){
            if(listMonsters[i].id == id){
                return i;
            }
        }
        return false;
    }

	function getIndexOfPoint(id) {
		for(var i in fireballTarget) {
			if(fireballTarget[i].id == id) {
				return i;
			}
		}
		return false;
	}

    function centerGlobe(){
        theGlobe.X = container.width()/2 - (theGlobe.width()/2);
        theGlobe.Y = container.height()/2 - (theGlobe.height()/2);
        theGlobe.update();
    }

    function moveMonsters(){
        for(var i in listMonsters){
            var monster = listMonsters[i];
            var change = getCoordsOfPath(monster, theGlobe, 0.5);
            if(change) {
                monster.X += change.x;
                monster.Y += change.y;
                monster.update();
            }
        }
    }
	
    function movefireballs(){
        for(var i in listFireballs){
            var fireball = listFireballs[i];
            var index = getIndexOfMonster(fireball.target);
            if(index){
                var monster = listMonsters[index];
                var change = getCoordsOfPath(fireball, monster, 1);
                if(change) {
                    fireball.X += change.x;
                    fireball.Y += change.y;
                    fireball.changeX = change.x;
                    fireball.changeY = change.y;
                    fireball.update();
                    listFireballs[i] = fireball;
                }
                else{
                    fireball.DOM().remove();
                    monster.DOM().remove();
					updateScore(1);
                    listFireballs.splice(i, 1);
                    listMonsters.splice(index, 1);
                }
            }
            else{
                fireball.X += fireball.changeX;
                fireball.Y += fireball.changeY;
                fireball.update();
                listFireballs[i] = fireball;
            }
            if((fireball.X+100 < 0 || fireball.X > container.width()+10) || (fireball.Y+100 < 0 || fireball.Y > container.height()+10)){
                fireball.DOM().remove();
                listFireballs.splice(i, 1);
                console.log('OUT');
            }
        }
    }

    function updateScore(s){
        if(s)score += s;
        if(score > highscore){
            highscore = score;
            $.cookie('highscore', highscore+'',{expires: 14});
        }
        $('#spel .score').text(score);
        $('#spel .high').text(highscore);
    }
	
    function posi(a){
        if (a < 0) return -a;
        return a;
    }

    function getCoordsOfPath(objectToMove, objectDestination, speed){
        var difX = (objectDestination.x()+objectDestination.width()/2) - (objectToMove.x()+objectToMove.width()/2);
        var difY = (objectDestination.y()+objectDestination.height()/2) - (objectToMove.y()+objectToMove.height()/2);

        if(posi(difX) < 1 || posi(difY) < 1)return false;

        var changeX = (difX<0 ? -speed:speed);
        var changeY = (difX<0 ? -(difY/difX)*speed:(difY/difX)*speed);


        if (posi(changeX) < posi(changeY)){
            changeX = (difX<0 ? -(posi(difX)/posi(difY))*speed:(posi(difX)/posi(difY))*speed);
            changeY = (difY<0 ? -speed:speed);
        }


        return {x: changeX, y: changeY};

    }

    /* Body */
    addGlobe();
    moveMonsters();

    /* Timer */
    setInterval(timer, settings.msPerTick);
    function timer(){
		if (gameFreeze == 0) {
			
		}
		else if (gamestate == Gamestate.PLAYING) {
			centerGlobe();
			movefireballs();
			moveMonsters();
			checkCollide();
			if(cooldownMonster < 1){
				addMonster();
				cooldownMonster = 100;
			}
			cooldownMonster--;
		}
	}
	
	/* Start Function */
	container.on('click', function(){
        if (gamestate == Gamestate.READY) {
			gameStart();
		}
		/*else if (gamestate == Gamestate.PLAYING) {
			var point = newPoint(mouse.x, mouse.y);
			container.append(getHTMLforPoint(point));
			fireballTarget.push(point);
			console.log(point.id);
            addFireball(point.id);
			point.update();
		}*/
	});
	
    function gameStart(){
		listMonsters = [];
		listFireballs = [];
        gamestate = Gamestate.PLAYING;
        $('#spel .ready').slideUp();
		$('#spel .dead').slideUp();
		settings.msPerTick -= settings.msPerTick;
		var t = 20;
		settings.msPerTick = t;
		setInterval(timer, settings.msPerTick);
		if(settings.msPerTick == 20) {
			console.log('HELP');
		}
    }
	
	playagain.on('click', function(){
		if (gamestate == Gamestate.DEAD) {
            gameStart();
        }		
	});
	
	saveurl.on('click', function(){
		prompt("If you dont have cookies enabled you can just save this URL to return to this page and continue from where you left off!", document.URL + "?highscore=" + highscore);		
	});
		    
	pause.on('click', function(){
		gameFreeze -= gameFreeze;
		if (gamestate == Gamestate.PLAYING) {
			$('#spel .paused').slideDown("fast");
		}
		else if (gamestate == Gamestate.READY) {
			$('#spel .ready').toggle("fast");
			$('#spel .paused').slideDown("fast");
		}
	});
	
	play.on('click', function(){
		if (gameFreeze == 0 && gamestate==Gamestate.PLAYING) {
			$('#spel .paused').hide();
			$('#spel .getready').toggle();
				$('#spel .timer').text("3");
			setTimeout(function(){
				$('#spel .timer').text("2");
			},1000);
			setTimeout(function(){
				$('#spel .timer').text("1");
			},2000);
			setTimeout(function(){
				var z = 1;
				gameFreeze += z;
				document.title = 'Spaghetti Invaders';
				$('#spel .getready').toggle();
			},3000);
		}
		else if (gameFreeze == 0 && gamestate==Gamestate.READY) {
			var z = 1;
			gameFreeze += z;
			document.title = 'Spaghetti Invaders';
			$('#spel .paused').toggle("fast");
			$('#spel .ready').slideDown("fast");
		}
	});
	
	function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		  break;
		}
	  }
	}
	
	/* Javacript query string decoder */
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	if(getParameterByName('info') == 'show') {
		$('#spel .ready').slideUp();
		$('#spel .info').slideDown();
	}
	if(getParameterByName('hidegui') == 'true') {
		$('#spel').hide();
	}
	var cheatscore = parseInt(getParameterByName('highscore'));
	if(cheatscore == cheatscore) {
		$('#spel .high').text(cheatscore);
	}
});