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

  this.destroy=false;
  this.array=[0,0,0];
  this.ended=false;
  this.ball= new MyBall(this.scene);
 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;


 MyTarget.prototype.display = function(){

   if(!this.ended){
      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
      //this.scene.materialDefault.apply();
      this.scene.boxAppearance.apply();
      this.target.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.array[0],this.array[1],this.array[2]);
      //this.scene.materialDefault.apply();
      this.scene.ballAppearance.apply();
      this.ball.display();
      this.scene.popMatrix();
    }
 };

 MyTarget.prototype.update = function(){

   if(!this.destroy || this.ended){
      return;
    }

    for(var i=0; i < this.array.length;i++){
      if(this.array[i] > 2){
      this.ended=true;
      return;
    }
    this.array[i] +=0.1;
    }
 };

 MyTarget.prototype.explode = function(){

this.destroy=true;
 };
