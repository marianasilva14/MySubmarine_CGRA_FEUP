/**
 * MyPeriscope
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPeriscope(scene) {
	CGFobject.call(this,scene);
	this.shape = new MyCylinder(this.scene, 40, 20);
	this.circle = new MyCircle(this.scene, 40, 20);
	this.height = 0;

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
	this.pinkAppearance.loadTexture("../resources/images/pink.jpg");
	
	this.periscopeAppearanceArray = [];
	this.pinkAppearance.setAmbient(0.3,0.3,0.3,1);
	this.pinkAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.pinkAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.pinkAppearance.setShininess(5);
	this.periscopeAppearanceArray.push(this.yellowAppearance,this.orangeAppearance, this.pinkAppearance);

};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor=MyPeriscope;

MyPeriscope.prototype.display = function()
{
	this.periscopeAppearanceArray[this.choosenOption].apply();

	this.scene.translate(0, this.height, 0);
	
 	//Periscope
 	this.scene.pushMatrix();
 	this.scene.scale(0.2,2,0.2);
 	this.scene.translate(0,1.4,13);
 	this.scene.rotate(Math.PI/2, 1, 0, 0);
 	this.shape.display();
 	this.scene.popMatrix();

 	//Circle periscope
 	this.scene.pushMatrix();
	this.scene.translate(0,2.8,2.6);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);
 	this.scene.scale(0.2,0.2,0.2);
 	this.scene.translate(0,0,-20);
 	this.circle.display();
 	this.scene.popMatrix();

	//Eye periscope
 	this.scene.pushMatrix();
 	this.scene.scale(0.2,0.2,0.5);
 	this.scene.translate(0,13,4.85);
 	this.shape.display();
 	this.scene.popMatrix();

	//Circle eye periscope
 	this.scene.pushMatrix();
	this.scene.translate(0,2.60,2.92);
 	this.scene.scale(0.2,0.2,0.2);
 	this.scene.translate(0,0,-20);
 	this.circle.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
	this.scene.translate(0,2.60,2.4);
 	this.scene.scale(0.2,0.2,0.2);
 	this.scene.translate(0,0,-20);
 	this.circle.display();
 	this.scene.popMatrix();
}

MyPeriscope.prototype.moveUp = function(dx){

	this.height = Math.min(0.55, this.height + dx);
	console.log(this.height);
}

MyPeriscope.prototype.moveDown = function(dx){
	
	this.height = Math.max(-0.77, this.height - dx);
	console.log(this.height);
}
