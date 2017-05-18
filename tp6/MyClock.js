/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.lastCurrTime = -1;

    //apply texture to clock
	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

 	//apply texture to cylinder
	this.metalClockAppearance = new CGFappearance(this.scene);
	this.metalClockAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.metalClockAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.metalClockAppearance.setShininess(10);
	this.metalClockAppearance.loadTexture("../resources/images/metal.png");

	this.cylinder = new MyCylinder(this.scene, slices, stacks);

	this.circle = new MyCircle(this.scene, slices, stacks);
	this.circle.initBuffers();
	
	//hour hand
	this.hours = new MyClockHand(this.scene);
	this.hours.initBuffers();
	//minute hand
	this.minutes = new MyClockHand(this.scene);
	this.minutes.initBuffers();
	//second hand
	this.seconds = new MyClockHand(this.scene);
	this.seconds.initBuffers();

	this.hours.setAngle(90);
	this.minutes.setAngle(180);
	this.seconds.setAngle(270);

 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
 	//transform degrees to radian
	var degToRad = Math.PI / 180.0;
	
	//cylinder of clock
  	this.scene.pushMatrix();
  	this.metalClockAppearance.apply();
  	this.cylinder.display();
  	this.scene.popMatrix();

	//clock
	this.scene.pushMatrix();
 	this.clockAppearance.apply();
 	this.circle.display();
	this.scene.popMatrix();

	//hour, minute and second hand
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1);
	this.scene.rotate(this.hours.angle*degToRad, 0 , 0, 1);
	this.scene.scale(1,0.35,1);
 	this.hours.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1);
	this.scene.rotate(this.minutes.angle*degToRad, 0 , 0, 1);
	this.scene.scale(1,0.55,1);
 	this.minutes.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1);
	this.scene.rotate(this.seconds.angle*degToRad, 0 , 0, 1);
 	this.seconds.display();
	this.scene.popMatrix();
 	
 };

MyClock.prototype.update = function(currTime) {
	var delta = 0;
	if(this.lastCurrTime == -1){
		this.lastCurrTime = currTime;
		inc = 0.6;
	}
	else{
		delta = currTime - this.lastCurrTime;
		this.lastCurrTime = currTime;
		inc = delta * (360 / (60*1000));
	}

	incSeg = inc;
	incMin = inc/60;
	incHour = inc/3600;

	this.seconds.setAngle(this.seconds.angle - incSeg);
	this.minutes.setAngle(this.minutes.angle - incMin);
	this.hours.setAngle(this.hours.angle - incHour);
};
