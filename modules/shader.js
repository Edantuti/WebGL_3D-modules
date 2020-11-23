var cubeRotation = 0.0;
let initBuffers = function(gl, position, color, indice){
   const positionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
   const positions = position;

   gl.bufferData(gl.ARRAY_BUFFER,
                 new Float32Array(positions),
								 gl.STATIC_DRAW);
								 

	 const faceColors = color;

	 var colors=[];

	 for(var j = 0; j < faceColors.length; ++j){
		 const c = faceColors[j];
		 colors = colors.concat(c, c, c, c);
	 }
	
	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	const indices= indice;
	
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
		 new Uint16Array(indices),
		  gl.STATIC_DRAW);
   return{
			 position: positionBuffer,
			 color: colorBuffer,
			 indices: indexBuffer,
   };
}

let drawScene = function(gl, programInfo, buffers, deltaTime){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth/ gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
		const projectionMatrix = mat4.create();
		const modelViewMatrix = mat4.create();

    mat4.perspective(projectionMatrix, 
                    fieldOfView,
                    aspect,
                    zNear,
                    zFar);

    mat4.translate(modelViewMatrix,
                    modelViewMatrix,
					[-0.0, 0.0, -6.0]);
										
		mat4.rotate(modelViewMatrix,
					modelViewMatrix,
					cubeRotation,
								[0,1,1]);
		mat4.rotate(modelViewMatrix,
					modelViewMatrix,
					cubeRotation * .7,
					[0, 1, 0]);

    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
		    const offset = 0;
		
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
		programInfo.attribLocations.vertexPosition);
		
		}
		
		{
			const numComponents = 4;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexColor,
				numComponents,
				type,
				normalize,
				stride,
				offset
			);
			gl.enableVertexAttribArray(
				programInfo.attribLocations.vertexColor
			);
		}

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );
    {
        const offset = 0;
				const vertexCount = 36;
				const type = gl.UNSIGNED_SHORT;
        gl.drawElements(gl.TRIANGLES, vertexCount,type, offset);
		}
		
		cubeRotation += deltaTime;
}

export{drawScene, initBuffers}