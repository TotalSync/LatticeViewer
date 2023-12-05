
const Bravias = {
    Cubic: 0,
    Tetragonal: 1,
    Orthorhombic: 2,
    Hexagonal: 3,
    Rhombohedral: 4,
    Monoclinic: 5,
    Triclinic: 6,
}


class Config{
    constructor(){
        this.canvas = null;
        this.win_height = 300;
        this.win_width = 400;
        this.debug = false;
        this.matrix_stack = [];
        this.bravais = Bravias.Cubic;
        this.angles = [90.0, 90.0, 90.0];
        this.lattice = new lattice();
    }
}

// Collect all the info needed to use the shader program.
// Look up which attribute our shader program is using
// for aVertexPosition and look up uniform locations.
const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(cfg.shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(cfg.shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(cfg.shaderProgram, "uModelViewMatrix"),
    },
  };
  

class vertex
{
    constructor(pos)
    {   
        this.pos = pos;
    }     
}

class pos
{
    constructor(x = 0, y=0, z=0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class lattice
{
    constructor(a=1, b=1, c=1)
    {
        this.a = a;
        this.b = b;
        this.c = c;
    }

}


var cfg = new Config();

function loadInitialSettings()
{
    cfg.matrix_stack[0] = proj_mat(90,cfg.win_width/cfg.win_width, 0, 100);
    cfg.vert = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    cfg.frag = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    cfg.shaderProgram = gl.createProgram();
    gl.attachShader(cfg.shaderProgram, cfg.vert);
    gl.attachShader(cfg.shaderProgram, cfg.frag);
    gl.linkProgram(cfg.shaderProgram);

    if (!gl.getProgramParameter(cfg.shaderProgram, gl.LINK_STATUS)) {
        alert(
          `Unable to initialize the shader program: ${gl.getProgramInfoLog(
            shaderProgram,
          )}`,
        );
      }

}

function main(cfg)
{
    cfg.canvas = document.getElementById("world");
    const gl = cfg.canvas.getContext('webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (cfg.canvas.getContext)
    {
        if(gl)
        {
            // Here's where we call the routine that builds all the
            // objects we'll be drawing.
            const buffers = initBuffers(gl);

            // Draw the scene
            drawScene(gl, programInfo, buffers);
        } 
        updateWorld();
    }
}

function updateWorld()
{
    let ctx = cfg.canvas.getContext('webgl');

    window.requestAnimationFrame(updateWorld);
}

function render(cfg, ctx)
{
    cfg.matrix_stack.forEach(mat => {
        
    });
}

function resizeCanvas()
{
   cfg.canvas = document.getElementById("world");
   let offset = document.getElementById("controls");
   //let offset = 1;
   // Set the dimensions of the window. 30, and 20 are window scalars since window does not fit in box.
   cfg.win_width = cfg.canvas.width = window.innerWidth - 30;
   cfg.win_height = cfg.canvas.height = window.innerHeight - 20 - offset.clientHeight;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
  
    gl.shaderSource(shader, source);
  
    // Compile the shader program
  
    gl.compileShader(shader);
  
    // See if it compiled successfully
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
      );
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

// Vertex shader program
const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;



import { initBuffers } from "./init_buffers.js";
import { drawScene } from "./draw_scene.js";

window.onload = function ()
{
   window.addEventListener("resize", resizeCanvas, false);
   //window.requestAnimationFrame(UpdateWorld);
   loadInitialSettings();
   resizeCanvas();
   main(cfg);
};
