/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, x,y,z) {
 	CGFobject.call(this,scene);

 	this.target = new MyUnitCubeQuad(this.scene);
 	this.x=x;
 	this.y=y;
 	this.z=z;


 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display = function(){

      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
      //this.scene.materialDefault.apply();
      this.scene.boxAppearance.apply();
      this.target.display();
      this.scene.popMatrix();
 }
