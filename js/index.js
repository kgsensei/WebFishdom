$(window).bind("load",()=>{
	$('#copyPasteLogo').delay(200).fadeIn(250)
	$('#copyPasteLogo').delay(775).fadeOut(250)
	$("#introScreen").delay(1500).fadeOut(750)
})

// Enemy format:
// 	[
// 		55      -> Health of Self
//		"*.png" -> Texture Name
//      "*2"    -> What to do to Player Health
//					For example '+5' would add 5.
//					'*2' would multiply score by 2.
// 	]
enemyTypes = [
	[
		5,
		"enemy1.png",
		"+ 5"
	],
	[
		1,
		"enemy1.png",
		"+ 1"
	],
	[
		8,
		"enemy1.png",
		"+ 8"
	],
	[
		10,
		"enemy1.png",
		"+ 10"
	],
	[
		3,
		"enemy1.png",
		"+ 3"
	],
	[
		4,
		"enemy1.png",
		"+ 4"
	],
	[
		6,
		"enemy1.png",
		"+ 6"
	],
	[
		9,
		"enemy1.png",
		"+ 9"
	],
	[
		5,
		"enemy1.png",
		"+ 5"
	],
	[
		1,
		"enemy1.png",
		"+ 1"
	],
	[
		8,
		"enemy1.png",
		"+ 8"
	],
	[
		10,
		"enemy1.png",
		"+ 10"
	],
	[
		3,
		"enemy1.png",
		"+ 3"
	],
	[
		4,
		"enemy1.png",
		"+ 4"
	],
	[
		6,
		"enemy1.png",
		"+ 6"
	],
	[
		9,
		"enemy1.png",
		"+ 9"
	],
	[
		0,
		"x2.png",
		"*2"
	]
]

enemyLevel1 = ["enemy1.png"] // Levels 10-99
enemyLevel2 = ["enemy2.png"] // Levels 100-999
enemyLevel3 = ["enemy3.png"] // Levels 1000-1499
enemyLevel4 = ["enemy4.png"] // Levels 1500-1999
enemyLevel5 = ["enemy5.png"] // Levels 2000-2499
enemyLevel6 = ["enemy6.png"] // Levels 2500-2999
enemyLevel7 = ["enemy7.png"] // Levels 3000-3499
enemyLevel8 = ["enemy8.png"] // Levels 3500-3999
enemyLevel9 = ["enemy9.png"] // Levels 4000-4499
enemyLevel0 = ["enemy0.png"] // Levels 4500-4999
enemyLevelA = ["enemyA.png"] // Levels 5000+

enemyLevelCurrent = "enemyLevel1"

playerScore = 5
playerOriginalTop = $("#player").offset().top
playerOriginalLeft = $("#player").offset().left
enemyDamage = 0

for(row = 0; row < 5; row++) {
	$('#gameContainer').append(`<div class="enemyContainer" id="row${row}"></div>`)
	for(let j = 0; j < 5; j++) {
		let enemy = kg.randomItem(enemyTypes)
		let displayHealth = ""
		if(enemy[0] != 0){displayHealth = enemy[0]}
		$(`#row${row}`).append(`
			<div class="fish" ondragover="onDragOver(event)" ondrop="fishAttack(event, this)" enemyOperation="${enemy[2]}">
				<div class="enemyFishHealth">${displayHealth}</div>
				<img src="./resources/${enemy[1]}" class="fishImg" draggable="false" style="animation: fishFloat 3500ms ease-in-out ${100 * j * row}ms infinite;" title="">
			</div>
		`)
	}
}

function newRow() {
	row = row + 1
	$('#gameContainer').append(`<div class="enemyContainer" id="row${row}"></div>`)
	for(let j = 0; j < 5; j++) {
		let enemy = kg.randomItem(eval(enemyLevelCurrent))
		enemyDamage = kg.randomInt(playerScore * 2.3, playerScore * 5.1)
		let displayHealth = ""
		if(enemyDamage != 0){displayHealth = enemyDamage}
		$(`#row${row}`).append(`
			<div class="fish" ondragover="onDragOver(event)" ondrop="fishAttack(event, this)" enemyOperation="+${kg.round(enemyDamage / 2)}">
				<div class="enemyFishHealth">${displayHealth}</div>
				<img src="./resources/${enemy}" class="fishImg" draggable="false" style="animation: fishFloat 3500ms ease-in-out ${100 * j}ms infinite;" title="">
			</div>
		`)
	}
}

async function fishAttack(event, enemy) {
	var enemyHealth = $(enemy).text().replace(/\s/g, "")
	var playerHealth = playerScore

	var enemyTop = $(enemy).offset().top + $(enemy).height() / 2
	var enemyLeft = $(enemy).offset().left + $(enemy).width() / 2
	
	var playerTop = $("#player").position().top + $("#player").height() / 2
	var playerLeft = $("#player").position().left + $("#player").width() / 2

	var angle = Math.atan2((enemyTop - playerTop), (enemyLeft - playerLeft)) * (180 / Math.PI)
	
	$("#fishPlayerImg").css({"transform": `rotate(${angle}deg)`})
	$("#player").animate({"left": enemyLeft, "top": enemyTop}, 500)

	if(playerHealth > enemyHealth) {
		await kg.sleep(250)
		playerScore = eval(playerScore + $(enemy).attr("enemyOperation"))
		$("#playerFishHealth").html(playerScore)
		$("#player").animate({"left": playerOriginalLeft, "top": playerOriginalTop}, 500)
		$(enemy.parentElement).fadeOutAndRemove(500)
		newRow()
		await kg.sleep(500)
		$("#fishPlayerImg").css({"transform": `rotate(0deg)`})
		// Handel Levels 10-99
		if(playerScore <= 99 ){
			enemyLevelCurrent = "enemyLevel1"
		}
		// Handel Levels 100-999
		else if(999 >= playerScore && playerScore >= 100){
			enemyLevelCurrent = "enemyLevel2"
		}
		// Handel Levels 1000-1499
		else if(1499 >= playerScore && playerScore >= 1000){
			enemyLevelCurrent = "enemyLevel3"
		}
		// Handel Levels 1500-1999
		else if(1999 >= playerScore && playerScore >= 1500){
			enemyLevelCurrent = "enemyLevel4"
		}
		// Handel Levels 2000-2499
		else if(2499 >= playerScore && playerScore >= 2000){
			enemyLevelCurrent = "enemyLevel5"
		}
		// Handel Levels 2500-2999
		else if(2999 >= playerScore && playerScore >= 2500){
			enemyLevelCurrent = "enemyLevel6"
		}
		// Handel Levels 3000-3499
		else if(3499 >= playerScore && playerScore >= 3000){
			enemyLevelCurrent = "enemyLevel7"
		}
		// Handel Levels 3500-3999
		else if(3999 >= playerScore && playerScore >= 3500){
			enemyLevelCurrent = "enemyLevel8"
		}
		// Handel Levels 4000-4499
		else if(4499 >= playerScore && playerScore >= 4000){
			enemyLevelCurrent = "enemyLevel9"
		}
		// Handel Levels 4500-4999
		else if(4999 >= playerScore && playerScore >= 4500){
			enemyLevelCurrent = "enemyLevel0"
		}
		// Hanel Levels 5000+
		else{
			enemyLevelCurrent = "enemyLevelA"
		}
	} else {
		await kg.sleep(175)
		$("#youDied").fadeIn()
	}
}

function onDragOver(event){
	event.preventDefault()
}
