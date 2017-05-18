/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTorpedo(scene,index) {
	CGFobject.call(this,scene);

	this.index = index;

  this.shape = new MyCylinder(this.scene, 40, 20);
	this.head = new MyLamp(this.scene, 40, 20);
	this.trapeze = new MyTrapeze(this.scene);
	this.ended = true;
	this.angXZ = 0;
	this.angY=0;

	this.startPosition = [0,0,0];
	this.direction = [0,0,0];
	this.position = [0,0,0];
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;

MyTorpedo.prototype.display = function()
{
	if(this.ended){
		return;
	}
	this.scene.materialDefault.apply();
	this.scene.pushMatrix();
	this.scene.rotate(this.angXZ, 0, 1, 0);
  this.scene.translate(this.position[0],this.position[1],this.position[2]);
	//this.scene.translate(-this.position[0],-this.position[1],-this.position[2]);
	//this.scene.rotate(this.angY, 1, 0, 0);

    //Body
 	this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,0.35);
 	this.scene.scale(0.7,1,4);
 	this.shape.display();
 	this.scene.popMatrix();

	//Head
 	this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,0.35);
 	this.scene.scale(0.7,1,1);
 	this.scene.translate(0,0,4);
 	this.head.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,0.35);
 	this.scene.scale(0.7,1,1);
 	this.scene.rotate(Math.PI, 1, 0, 0);
 	this.head.display();
 	this.scene.popMatrix();

 	//Trapeze backward
 	this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,0.35);
 	this.scene.translate(0,0,-0.5);
 	this.scene.scale(0.3,0.6,0.3);
 	this.trapeze.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,0.35);
 	this.scene.translate(0,0,-0.5);
 	this.scene.rotate(-Math.PI/2,1,0,0);
 	this.scene.rotate(-Math.PI/2,0,1,0);
 	this.scene.rotate(Math.PI/2,1,0,0);
 	this.scene.scale(0.3,0.5,0.3);
 	this.trapeze.display();
 	this.scene.popMatrix();

	this.scene.popMatrix();
}

MyTorpedo.prototype.setInitialPosition = function (x,y,z) {
	this.startPosition =[x,y,z];
	this.position = this.startPosition;
};

MyTorpedo.prototype.setTorpedoDirection = function(x,y,z){
	this.direction = [x,y,z];
};

MyTorpedo.prototype.update = function(){
	if(this.ended){
		return;
	}

	this.angY = Math.atan(this.direction[1]/Math.sqrt(Math.pow(this.direction[0],2)+Math.pow(this.direction[2],2)));
	this.angXZ = Math.acos(this.direction[2]/Math.sqrt(Math.pow(this.direction[0],2)+Math.pow(this.direction[2],2)));

	if(this.direction[0] < 0){
		this.angXZ = -this.angXZ;
	}

}
