/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	this.gui = new dat.GUI();

	//this.gui.add(this.scene, 'doSomething');

	var group =this.gui.addFolder("Luzes");

	group.open();

	group.add(this.scene, 'Luz1');
	group.add(this.scene, 'Luz2');
	group.add(this.scene, 'Luz3');
	group.add(this.scene, 'Luz4');

	this.gui.add(this.scene, 'Relogio');

	this.gui.add(this.scene, 'speed', -5, 5);

	this.gui.add(this.scene, 'currSubmarineAppearance', this.scene.submarineAppearanceList);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

		switch (event.keyCode){
		case 65: case 97:{
			console.log("Key 'A' pressed");
			this.scene.submarine.rotateLeft(this.scene.speed);
			break;
		}
		case 68: case 100:{
			console.log("Key 'D' pressed");
			this.scene.submarine.rotateRight(this.scene.speed);
			break;
		}
		case 87: case 119:{
			console.log("Key 'W' pressed");
			this.scene.submarine.moveForward(0.025);
			break;
		}
		case 83: case 115:{
			console.log("Key 'S' pressed");
			this.scene.submarine.moveBackward(0.025);
			break;
		}
		case 80: case 112:{
			console.log("Key 'P' pressed");
			this.scene.submarine.periscope.moveUp(0.025);
			break;
		}
		case 76: case 108:{
			console.log("Key 'L' pressed");
			this.scene.submarine.periscope.moveDown(0.025);
			break;
		}
		case 81: case 113:{
			console.log("Key 'Q' pressed");
			this.scene.submarine.goUp(0.025);
			break;
		}
		case 69: case 101:{
			console.log("Key 'E' pressed");
			this.scene.submarine.goDown(0.025);
			break;
		}

		case 70: case 102:{
			console.log("Key 'F' pressed");
      this.scene.submarine.fireTorpedo();
			break;
		}
	};

};

MyInterface.prototype.processKeyUp = function(event) {
	CGFinterface.prototype.processKeyUp.call(this,event);

	switch (event.keyCode){
		case 65: case 97:{
			console.log("Key 'A' pressed");
			this.scene.submarine.trapezeAngVer = 0;
			break;
		}
		case 68: case 100:{
			console.log("Key 'D' pressed");
			this.scene.submarine.trapezeAngVer = 0;
			break;
		}
	};

};
