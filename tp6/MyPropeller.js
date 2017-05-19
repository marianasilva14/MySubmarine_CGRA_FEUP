/**
 * MyPropeller
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPropeller(scene) {
	CGFobject.call(this,scene);

	this.choosenOption = 0;

    this.shape = new MyCylinder(this.scene, 40, 20);
	this.head = new MyLamp(this.scene, 40, 20);
	this.parallelepiped = new MyUnitCubeQuad(this.scene);
	this.ang = 0;

	this.materialDefault = new CGFappearance(this.scene);

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

	this.propellerAppearanceArray = [];
	this.propellerAppearanceArray.push(this.materialDefault, this.yellowAppearance,this.orangeAppearance, this.pinkAppearance);
};

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor=MyPropeller;

MyPropeller.prototype.display = function()
{
	this.propellerAppearanceArray[this.choosenOption].apply();

	//Propellers Left
 	this.scene.pushMatrix();
 	this.scene.scale(0.4, 0.4, 0.4);
 	this.scene.translate(2.5, -1.5, 0);
 	this.shape.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
 	this.scene.translate(3.9*0.25, -0.8*0.75, 0.7*0.25);
 	this.scene.rotate(this.ang, 0, 0, 1);
 	this.scene.scale(0.25,0.75,0.25);
	this.parallelepiped.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
	this.scene.scale(0.15,0.15,0.15);
  	this.scene.translate(6.5, -3.8, 1.5);
	this.head.display();
 	this.scene.popMatrix();

 	//Propellers Right
 	this.scene.pushMatrix();
 	this.scene.scale(0.4, 0.4, 0.4);
 	this.scene.translate(-2.5, -1.5, 0);
 	this.shape.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-3.9*0.25, -0.8*0.75, 0.7*0.25);
 	this.scene.rotate(-this.ang, 0, 0, 1);
	this.scene.scale(0.25,0.75,0.25);
 	this.parallelepiped.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
	this.scene.scale(0.15,0.15,0.15);
  	this.scene.translate(-6.5, -3.8, 1.5);
	this.head.display();
 	this.scene.popMatrix();


}

this.MyPropeller.prototype.setAngle = function(angle){

	this.ang += angle;
}
