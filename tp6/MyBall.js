/**
 * MyBall
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyBall(scene) {
	CGFobject.call(this,scene);

  this.ball= new MyLamp(scene, 20,20);
	};

MyBall.prototype = Object.create(CGFobject.prototype);
MyBall.prototype.constructor=MyBall;

MyBall.prototype.display = function()
{
    this.scene.pushMatrix();
    this.scene.translate(7,0,7);
		this.ball.display();
    this.scene.popMatrix();

		this.scene.pushMatrix();
    this.scene.translate(7,0,7);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.ball.display();
    this.scene.popMatrix();
}
