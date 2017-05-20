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

	this.gl.clearColor(0.44,0.48, 1.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	//MyInterface
	this.option1=true; this.option2=false; this.speed=3;

	// Scene elements

	this.floor = new Plane(this, 0, 12, 0, 12, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 20, 20);
	this.clock = new MyClock(this, 12, 1);
	this.targets = [new  MyTarget(this, 5, 0, 5), new  MyTarget(this, 10, 0, 10)];
	this.submarine = new MySubmarine(this);
	this.ball = new MyBall(this);

	this.submarineAppearanceList = ['None','Yellow', 'Orange', 'Pink'];
	this.currSubmarineAppearance = 0;

	// Materials
	this.materialDefault = new CGFappearance(this);

	//apply texture to plane
	this.seabedAppearance = new CGFappearance(this);
	this.seabedAppearance.loadTexture("../resources/images/seabed.jpg");

	//apply texture to target
	this.boxAppearance = new CGFappearance(this);
	this.boxAppearance.loadTexture("../resources/images/wood.jpg");

	//apply texture to ball
	this.ballAppearance = new CGFappearance(this);
	this.ballAppearance.loadTexture("../resources/images/fire.jpg");

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
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(100, 100, 0.2);
	this.floor.display();
	this.popMatrix();


	//COLUNA 1
	this.pushMatrix();
	this.translate(8,5,0);
	this.scale(1,5,1);
	this.rotate(90 * degToRad, -1, 0, 0); //colocar na vertical o cilindro
	this.materialDefault.apply();
	this.cylinder.display();
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

	//BALL
	this.pushMatrix();
	this.materialDefault.apply();
	//this.scale(0.7, 0.7, 0.7);
	this.ball.display();
	this.popMatrix();
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

		if (this.currSubmarineAppearance == 'None')
		{
	 		this.submarine.choosenOption = 0;
	 		this.submarine.propeller.choosenOption = 0;
	 		this.submarine.periscope.choosenOption = 0;
		}

	if (this.currSubmarineAppearance == 'Yellow')
	{
 		this.submarine.choosenOption = 1;
 		this.submarine.propeller.choosenOption = 1;
 		this.submarine.periscope.choosenOption = 1;
	}
	if (this.currSubmarineAppearance == 'Orange')
	{
		this.submarine.choosenOption = 2;
		this.submarine.propeller.choosenOption = 2;
 		this.submarine.periscope.choosenOption = 2;
	}
	if (this.currSubmarineAppearance == 'Pink')
	{
 		this.submarine.choosenOption = 3;
		this.submarine.propeller.choosenOption = 3;
 		this.submarine.periscope.choosenOption = 3;
	}

	if(this.Relogio)
		this.clock.update(currTime);

	this.submarine.update();

};
