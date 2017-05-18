/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var slices = this.slices;
 	var stacks = this.stacks;
	
	this.vertices = [];
	this.normals = [];
	this.indices = [];
	
	var indice = 0;
	
	for(var stack = 0; stack < stacks; stack++){
		var ang = 2*Math.PI/slices;
		
		for(var slice  = 0; slice < slices; slice++)
		{	
			//vertices de cada face
			this.vertices.push(Math.cos(slice*ang), Math.sin(slice*ang), stack/stacks); 
			this.vertices.push(Math.cos(slice*ang), Math.sin(slice*ang), stack/stacks+1);
			this.vertices.push(Math.cos((slice+1)*ang), Math.sin((slice+1)*ang), stack/stacks);
			this.vertices.push(Math.cos((slice+1)*ang), Math.sin((slice+1)*ang), stack/stacks+1);
			
			//as normais de cada face
			this.normals.push(Math.cos((slice+(1/2))*ang), Math.sin((slice+(1/2))*ang), 0);
			this.normals.push(Math.cos((slice+(1/2))*ang), Math.sin((slice+(1/2))*ang), 0);
			this.normals.push(Math.cos((slice+(1/2))*ang), Math.sin((slice+(1/2))*ang), 0);
			this.normals.push(Math.cos((slice+(1/2))*ang), Math.sin((slice+(1/2))*ang), 0);
			
			//indices de cada face
			this.indices.push(indice, indice+2, indice+3);
			this.indices.push(indice+1, indice, indice+3);
			//avança
			indice = indice + 4;
		}
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
