var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	this.Luz1 = true;
	this.Luz2 = true;
	this.Luz3 = true;
	this.Luz4 = true;

	this.Relogio = true;

	CGFscene.prototype.init.call(this, application);

	this.initCameras();
	this.enableTextures(true);//ativacao da utilizacao de texturas
	this.initLights();

	this.gl.clearColor(0.46, 0.78, 0.94, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	//MyInterface
	this.option1=true; this.option2=false; this.speed=3;

	// Scene elements

	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 20, 20);
	this.boardA = new Plane(this, 0, 1.1, 0, 1,  BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, 0, 1, 0, 1, BOARD_B_DIVISIONS);
	this.clock = new MyClock(this, 12, 1);
	this.targets = [new  MyTarget(this, 5, 0, 5), new  MyTarget(this, 10, 0, 10)];
	this.submarine = new MySubmarine(this);
	this.torpedo = new MyTorpedo(this);

	this.submarineAppearanceList = ['Yellow', 'Orange', 'Pink'];
	this.currSubmarineAppearance = 0;

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.2,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);
	this.materialB.setShininess(120);

	//extra - mesas
	this.materialC = new CGFappearance(this);
	this.materialC.setAmbient(0.3,0.3,0.3,1);
	this.materialC.setDiffuse(0.62,0.32,0.1,1);
	this.materialC.setSpecular(0,0.1,0.1,1);
	this.materialC.setShininess(120);

	//extra - paredes
	this.materialD = new CGFappearance(this);
	this.materialD.setAmbient(0.3,0.3,0.3,1);
	this.materialD.setDiffuse(0.99,0.12,0.26,1);
	this.materialD.setSpecular(0,0.2,0.2,1);
	this.materialD.setShininess(120);

	//extra - paredes
	this.materialG = new CGFappearance(this);
	this.materialG.setAmbient(0.3,0.3,0.3,1);
	this.materialG.setDiffuse(0.96,0.94,0.28,1);
	this.materialG.setSpecular(0,0.2,0.2,1);
	this.materialG.setShininess(120);

	//extra - chão
	this.materialE = new CGFappearance(this);
	this.materialE.setAmbient(0.3,0.3,0.3,1);
	this.materialE.setDiffuse(0.21,0.72,0.93,1);
	this.materialE.setSpecular(0,0.2,0.2,1);
	this.materialE.setShininess(120);

	//extra - pernas
	this.materialF = new CGFappearance(this);
	this.materialF.setAmbient(0.3,0.3,0.3,1);
	this.materialF.setDiffuse(0.1,0.1,0.1,1);
	this.materialF.setSpecular(0.45,0.45,0.86,1);
	this.materialF.setShininess(120);

	//apply texture to top of the table
	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.tableAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.tableAppearance.setShininess(10);
	this.tableAppearance.loadTexture("../resources/images/table.png");

	//apply texture to floor
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.floorAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	//apply texture to wall
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.windowAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.windowAppearance.setShininess(10);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	//apply slides
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.slidesAppearance.setShininess(5);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


	//apply board
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setSpecular(0.4, 0.4, 0.4, 1);
	this.boardAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.boardAppearance.setShininess(50);
	this.boardAppearance.loadTexture("../resources/images/board.png");


	//apply texture to column
	this.marmoreAppearance = new CGFappearance(this);
	this.marmoreAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.marmoreAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.marmoreAppearance.setShininess(10);
	this.marmoreAppearance.loadTexture("../resources/images/marmore.png");

	//apply texture to plane
	this.seabedAppearance = new CGFappearance(this);
	this.seabedAppearance.loadTexture("../resources/images/seabed2.jpg");

	this.setUpdatePeriod(1000/60);

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1);

	// Positions for four lights
	this.lights[0].setPosition(16, 5, 16, 1);
	this.lights[1].setPosition(10, 10, 6.0, 1.0);
	this.lights[2].setPosition(5, 5, 5, 8.0);
	this.lights[3].setPosition(10, 5.0, 5.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1, 1, 0, 1); //amarelo
	this.lights[1].enable();

	//lights[2]

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1, 1, 1, 1);
	this.lights[2].enable();
	this.lights[2].setConstantAttenuation(0.0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0.0);

	//lights[3]

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1, 1, 0, 1);
	this.lights[3].enable();
	this.lights[3].setConstantAttenuation(0.0);
	this.lights[3].setLinearAttenuation(0.0);
	this.lights[3].setQuadraticAttenuation(0.2);
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// Floor
	this.seabedAppearance.apply();
	//this.floorAppearance.apply();
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);

	//this.materialE.apply();
	this.floor.display();
	this.popMatrix();
	//this.materialDefault.apply();

	// Left Wall
	this.windowAppearance.apply();
	this.pushMatrix();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
	//this.materialD.apply();
	//this.leftWall.display();
	this.popMatrix();
	//this.materialDefault.apply();

	// Plane Wall
	this.pushMatrix();
	this.translate(7.5, 4, 0);
	this.scale(15, 8, 0.2);
	this.materialG.apply();
	//this.wall.display();
	this.popMatrix();
	this.materialDefault.apply();

	// First Table
	this.pushMatrix();
	this.translate(5, 0, 8);
	//this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
	this.translate(12, 0, 8);
	//this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	//this.materialA.apply();
	this.slidesAppearance.apply();
	//this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	//this.materialB.apply();
	this.boardAppearance.apply();
	//this.boardB.display();
	this.popMatrix();


	//PRISMA
	this.pushMatrix();
	this.translate(2,0,2);
	this.rotate(90 * degToRad, -1, 0, 0); //colocar na vertical o prisma
	//this.prism.display();
	this.popMatrix();

	//COLUNA 1
	this.pushMatrix();
	this.translate(8,5,0);
	this.scale(1,5,1);
	this.rotate(90 * degToRad, -1, 0, 0); //colocar na vertical o cilindro
	//this.marmoreAppearance.apply();
	this.materialDefault.apply();
	this.cylinder.display();
	this.popMatrix();

	//COLUNA 2
	this.pushMatrix();
	this.marmoreAppearance.apply();
	this.scale(1,5,1);
	this.translate(12,0,12);
	this.rotate(90 * degToRad, -1, 0, 0); //colocar na vertical o cilindro
	//this.cylinder.display();
	this.popMatrix();

	//SEMI-ESFERA
	this.pushMatrix();
	this.translate(15,16,15);
	this.rotate(90 * degToRad, -1, 0, 0);
	//this.lamp.display();
	this.popMatrix();

	//CLOCK
	this.pushMatrix();
	this.translate(8.2,11,0);
	this.scale(0.7,0.7,0.7);
	this.clock.display();
	this.popMatrix();

	//SUBMARINE
	this.pushMatrix();
	this.materialDefault.apply();
	this.submarine.display();
	this.popMatrix();

	//TARGET
	for(var i=0; i < this.targets.length;i++)
	{
		this.targets[i].display();
	}
};

LightingScene.prototype.update = function(currTime){
	if (this.Luz1)
		this.lights[0].enable();
	if (this.Luz2)
		this.lights[1].enable();
	if (this.Luz3)
		this.lights[2].enable();
	if (this.Luz4)
		this.lights[3].enable();

	if (!this.Luz1)
		this.lights[0].disable();
	if (!this.Luz2)
		this.lights[1].disable();
	if (!this.Luz3)
		this.lights[2].disable();
	if (!this.Luz4)
		this.lights[3].disable();

	if (this.currSubmarineAppearance == 'Yellow')
	{
 		this.submarine.choosenOption = 0;
 		this.submarine.propeller.choosenOption = 0;
 		this.submarine.periscope.choosenOption = 0;
	}
	if (this.currSubmarineAppearance == 'Orange')
	{
		this.submarine.choosenOption = 1;
		this.submarine.propeller.choosenOption = 1;
 		this.submarine.periscope.choosenOption = 1;
	}
	if (this.currSubmarineAppearance == 'Pink')
	{
 		this.submarine.choosenOption = 2;
		this.submarine.propeller.choosenOption = 2;
 		this.submarine.periscope.choosenOption = 2;
	}

	if(this.Relogio)
		this.clock.update(currTime);

	this.submarine.update();

};
