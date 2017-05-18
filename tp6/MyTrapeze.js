/**
 * MyTrapeze
 * @constructor
 */
 function MyTrapeze(scene, minS = 0, maxS = 1, minT = 0, maxT = 1) {
 	CGFobject.call(this,scene);

 	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;

 	this.initBuffers();
 };

 MyTrapeze.prototype = Object.create(CGFobject.prototype);
 MyTrapeze.prototype.constructor = MyTrapeze;

 MyTrapeze.prototype.initBuffers = function() {
 	this.vertices = [
 	-0.5, 2, 1,//0
 	-0.5, 3, 0, //1
	-0.5, -3, 0, //2
 	-0.5, -2, 1, //3
 	0.5, 2, 1, //4
  	0.5, 3, 0, //5
  	0.5, -2, 1, //6
 	0.5, -3, 0 //7

 	-0.5, 2, 1,//0
 	-0.5, 3, 0, //1
	-0.5, -3, 0, //2
 	-0.5, -2, 1, //3
 	0.5, 2, 1, //4
  	0.5, 3, 0, //5
  	0.5, -2, 1, //6
 	0.5, -3, 0 //7

 	-0.5, 2, 1,//0
 	-0.5, 3, 0, //1
	-0.5, -3, 0, //2
 	-0.5, -2, 1, //3
 	0.5, 2, 1, //4
  	0.5, 3, 0, //5
  	0.5, -2, 1, //6
 	0.5, -3, 0 //7
 	];

 	this.indices = [
    3, 2, 7,
    7, 6, 3,
    5, 1, 0,
    0, 4, 5,
    6, 5, 4,
    6, 7, 5,
    1, 2, 3,
    3, 0, 1,
    3, 6, 4,
    4, 0, 3,
    5, 7, 2,
    2, 1, 5
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.normals = [
  	0, 0, 1, //0
    0, 0, -1, //1
    0, 0, -1, //2
    0, 0, 1, //3
    0, 0, 1, //4
    0, 0, -1, //5
 	0, 0, 1, //6
 	0, 0, -1, //7

 	-1, 0, 0, //0
    -1, 0, 0, //1
    -1, 0, 0, //2
    -1, 0, 0, //3
    1, 0, 0, //4
    1, 0, 0, //5
    1, 0, 0, //6
    1, 0, 0, //7

 	0, 1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //0
 	0, 1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //1
 	0, -1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //2
 	0, -1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //3
 	0, 1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //4
 	0, 1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //5
 	0, -1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //6
 	0, -1/(Math.sqrt(2)), 1/(Math.sqrt(2)), //7
 	];

 	this.texCoords = [
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.minS, this.minT,
    this.maxS, this.minT,
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.minS, this.minT,
    this.maxS, this.minT
    ];

 	this.initGLBuffers();
 };
