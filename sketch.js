
var ground;
var wall_y = 4815;
var gameState = "start";
var r;


function preload(){
    player_running = loadAnimation("png/Run__000.png","png/Run__001.png","png/Run__002.png","png/Run__003.png","png/Run__004.png","png/Run__005.png","png/Run__006.png","png/Run__007.png","png/Run__008.png","png/Run__009.png");
    start_ScreenImg = loadImage("LOGO(RISE UP).jpg");
    start_ButtonImg = loadImage("START BUTTON.png");
    restartImg = loadImage("restart.png");
}
function setup(){
    var canvas = createCanvas(displayWidth - 10, displayHeight - 10);

    start_Button = createSprite(725,5100);
    start_Button.addImage(start_ButtonImg);

    start_Screen = createSprite(720,4775);
    start_Screen.addImage(start_ScreenImg);
    start_Screen.scale = 0.63;
    
    restart = createSprite(690,5440);
    restart.addImage(restartImg);

    wall_left_grp = createGroup();
    wall_right_grp = createGroup();

    platform_grp = createGroup();

    player = createSprite(700,4960,20,20);
    player.addAnimation("running",player_running);
    player.scale = 0.12;

    wall1_left = createSprite(407.5,4955,15,60);
    wall1_right = createSprite(992.5,4955,15,60);

    wall2_left = createSprite(407.5,4885,15,60);
    wall2_right = createSprite(992.5,4885,15,60);

    

}

function draw(){
    background(0);
    camera.position.y = player.y;
    textSize(30);
    fill(random(0,255),random(0,255),random(0,255));
    
    console.log(player.velocityX);

    start_Button.visible = false;
    start_Screen.visible = false;

    wall1_left.visible = true;
    wall1_right.visible = true;

    wall2_left.visible = true;
    wall2_right.visible = true;

    restart.visible = false;

    if(gameState === "start"){
        start_Screen.visible = true;
        start_Button.visible = true;

        wall1_left.visible = false;
        wall1_right.visible = false;

        wall2_left.visible = false;
        wall2_right.visible = false;

        text("RISE UP",115,4800);
        text("RISE UP",1200,4800);

        if(mousePressedOver(start_Button)){
            gameState = "go";
            r = Math.round(random(0,1));
            //console.log(r);
        }
    }
    else if(gameState === "go"){
        if(r === 0){
            player.velocityX = 15;
        }
        else if(r === 1){
            player.velocityX = -15;
        }

        if(player.velocity != 0){
            gameState = "play";
        }

    }
    else if(gameState === "play"){
        if(player.isTouching(wall1_left) || player.isTouching(wall1_right) || player.isTouching(wall2_left) || player.isTouching(wall2_right)){
            player.velocityX *= -1;
        }
        
        if(player.y >= 5000){
            gameState = "over";
        }
    }

    else if(gameState === "over"){
        player.velocityX = 0;
        player.velocityY = 0;

        restart.visible = true;

        text("YOU LOST",610,5300);
        text("RON STILL NEEDS YOU, YOU NEED TO HELP HIM",400,5330);

        player.x = 655;
        player.y = 5650;
        player.scale = 0.3;

        if(mousePressedOver(restart)){
            gameState = "start";
            player.scale = 0.12;
            
            player.x = 700;
            player.y = 4964;

        }

    }
    
    for(var y = 4990; y >= 0; y -= 70){
        plat = createSprite(700,y,600,10);
        plat.depth = start_Screen.depth;
        start_Screen.depth += 1;
        platform_grp.add(plat);
    }
    rand_left = Math.round(random(0,4));
    rand_right = Math.round(random(0,4));
    wall_y -= 70;
    if(rand_left === 1 || rand_left === 3 || rand_left === 4){
        closedW_left = createSprite(407.5,wall_y,15,60);
        wall_left_grp.add(closedW_left);
    }
    if(rand_right === 1 || rand_right === 3 || rand_right === 4){
        closedW_right = createSprite(992.5,wall_y,15,60);
        wall_right_grp.add(closedW_right);
    }

    //if(wall_left_grp.isTouching(player) || wall_right_grp.isTouching(player)){
        //player.velocityX = player.velocityX * -1;
    //}

    player.collide(platform_grp);

    /*if(mousePressedOver(wall1_left)){
        wall1_left.shapeColor = "red";
    }*/
    /*if(keyCode === 32){
        player.y -= 50;
    }*/

    player.velocityY += 1.2;
    
    drawSprites();
};
//function mousePressedOver(wall1_left){
    //wall1_left.shapeColor = "red";
    //player.velocityX = -5;
//}
