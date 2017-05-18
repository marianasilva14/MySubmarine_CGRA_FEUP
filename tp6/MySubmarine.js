/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
 	CGFobject.call(this,scene);

	this.submarineX = 0;
	this.submarineY = 3;
	this.submarineZ = 0;
	this.speed = 0;
	this.speedVer = 0;
	this.ang = 0;
	this.propellerAng = 0;
	this.trapezeAngVer = 0;
	this.trapezeAngHor = 0;
  this.torpedoIndex = 0;

	this.shape = new MyCylinder(this.scene, 40, 20);
	this.head = new MyLamp(this.scene, 40, 20);
	this.trapeze = new MyTrapeze(this.scene);
	this.circle = new MyCircle(this.scene, 40, 20);
	this.periscope = new MyPeriscope(this.scene);
	this.propeller = new MyPropeller(this.scene);

  this.torpedos = [];
  for(var i=0; i < this.scene.targets.length;i++){
    this.torpedos.push(new MyTorpedo(this.scene,i));
}
this.choosenOption = 0;

	this.materialDefault = new CGFappearance(this);

	this.yellowAppearance = new CGFappearance(this.scene);
	this.yellowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.yellowAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.yellowAppearance.setSpecular(0.8,0.8,0.8,1);
	this.yellowAppearance.setShininess(5);
	this.yellowAppearance.loadTexture("../resources/images/yellow.jpg");

	this.orangeAppearance = new CGFappearance(this.scene);
	this.orangeAppearance.setAmbient(0.3,0.3,0.3,1);
	this.orangeAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.orangeAppearance.setSpecular(0.8,0.8,0.8,1);
	this.orangeAppearance.setShininess(5);
	this.orangeAppearance.loadTexture("../resources/images/orange.jpg");

	this.pinkAppearance = new CGFappearance(this.scene);
	this.pinkAppearance.setAmbient(0.3,0.3,0.3,1);
	this.pinkAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.pinkAppearance.setSpecular(0.8,0.8,0.8,1);
	this.pinkAppearance.setShininess(5);
	this.pinkAppearance.loadTexture("../resources/images/pink.jpg");

	this.submarineAppearanceArray = [];
	this.submarineAppearanceArray.push(this.yellowAppearance,this.orangeAppearance, this.pinkAppearance);
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.display = function(){

 	this.submarineAppearanceArray[this.choosenOption].apply();
  this.scene.pushMatrix();
 	this.scene.translate(this.submarineX,this.submarineY,this.submarineZ);
	this.scene.rotate(this.ang * degToRad, 0, 1, 0);


 	//Body
 	this.scene.pushMatrix();
 	this.scene.scale(0.7,1,4);
 	this.shape.display();
 	this.scene.popMatrix();

	//Head
 	this.scene.pushMatrix();
 	this.scene.scale(0.7,1,1);
 	this.scene.translate(0,0,4);
 	this.head.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.scale(0.7,1,1);
 	this.scene.rotate(Math.PI, 1, 0, 0);
 	this.head.display();
 	this.scene.popMatrix();

	//Periscope
	this.scene.pushMatrix();
	this.periscope.display();
	this.scene.popMatrix();

	//Propeller
	this.scene.pushMatrix();
	this.propeller.display();
	this.scene.popMatrix();

 	//Upper tower
 	this.scene.pushMatrix();
 	this.scene.scale(0.5,1,0.88);
 	this.scene.translate(-0.3,1.5,2.5);
 	this.scene.rotate(Math.PI/2, 1, 0, 0);
 	this.shape.display();
 	this.scene.popMatrix();

 	//Circle Tower
 	this.scene.pushMatrix();
	this.scene.translate(-0.15,1.49,2.198);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);
 	this.scene.scale(0.5,0.88,1);
 	this.scene.translate(0,0,-20);
 	this.circle.display();
 	this.scene.popMatrix();

 	//Trapeze tower
 	this.scene.pushMatrix();
 	this.scene.translate(-0.15,1.3,2.3);
 	this.scene.rotate(Math.PI/2,1,0,0);
 	this.scene.rotate(Math.PI/2,0,1,0);
 	this.scene.rotate(Math.PI/2,1,0,0);
 	this.scene.scale(0.2,0.3,0.3);
 	this.trapeze.display();
 	this.scene.popMatrix();

 	//Trapeze backward
 	this.scene.pushMatrix();
 	this.scene.rotate(this.trapezeAngVer, 0, 1, 0);
 	this.scene.translate(0,0,-1*0.3);
 	this.scene.scale(0.3,0.62,0.3);
 	this.trapeze.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
 	this.scene.translate(0,0,-0.5);
 	this.scene.rotate(this.trapezeAngHor, 1, 0, 0);
 	this.scene.rotate(-Math.PI/2,1,0,0);
 	this.scene.rotate(-Math.PI/2,0,1,0);
 	this.scene.rotate(Math.PI/2,1,0,0);
 	this.scene.scale(0.3,0.5,0.3);
 	this.trapeze.display();
 	this.scene.popMatrix();

  this.scene.popMatrix();

  for (var i = 0; i < this.torpedos.length; i++) {
    this.torpedos[i].display();
  }


 };

MySubmarine.prototype.rotateLeft = function(dy)
{
	this.ang += dy;
	this.trapezeAngVer = -45 * degToRad;
};

MySubmarine.prototype.rotateRight = function(dy)
{
	this.ang -= dy;
	this.trapezeAngVer = 45 * degToRad;

};

MySubmarine.prototype.moveForward = function(dx)
{
	this.speed += dx;
	this.propellerAng += 2*Math.PI/60;
};

MySubmarine.prototype.moveBackward = function(dx)
{
	this.speed -= dx;
	this.propellerAng -= 2*Math.PI/60;

};

MySubmarine.prototype.update = function(){
	this.submarineX += Math.sin(this.ang * degToRad) * this.speed;
	this.submarineZ += Math.cos(this.ang * degToRad) * this.speed;
	this.submarineY += this.speedVer;
	this.propeller.setAngle(this.propellerAng);
  this.torpedos[this.torpedoIndex].setInitialPosition(this.submarineX,this.submarineY-1.25,this.submarineZ+0.5);
  this.torpedos[this.torpedoIndex].setTorpedoDirection(Math.sin(this.ang* degToRad),0,Math.cos(this.ang*degToRad));

  for (var i = 0; i < this.torpedos.length; i++) {
    this.torpedos[i].update();
  }
};

MySubmarine.prototype.goUp = function(dx)
{
	this.speedVer += dx;
	this.trapezeAngHor = -45 * degToRad;

	if(this.speedVer == 0)
		this.trapezeAngHor = 0;
};

MySubmarine.prototype.goDown = function(dx)
{
	this.speedVer -= dx;
	this.trapezeAngHor = 45 * degToRad;

	if(this.speedVer == 0)
		this.trapezeAngHor = 0;
};

MySubmarine.prototype.fireTorpedo = function(){
  this.torpedos[this.torpedoIndex].setInitialPosition(this.submarineX,this.submarineY,this.submarineZ);
  this.torpedos[this.torpedoIndex].ended = false;
}
