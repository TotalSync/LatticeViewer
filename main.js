

class Config{
    constructor(){
        this.canvas = null;
        this.win_height = 300;
        this.win_width = 400;
        this.debug = false;
        this.matrix_stack = [];
    }
}

class vertex
{
    constructor(pos)
    {   
        this.pos = pos;
    }
    constructor(x,y,z)
    {
        this.pos = new pos(x,y,z);
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
class mat3
{
    constructor()
    {
        this.e =   [1,0,0,
                    0,1,0,
                    0,0,1];
    }
    constructor(mat){ this.e = mat; }
}

class mat4
{
    constructor()
    {
        this.e =   [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];
    }
    constructor(mat){ this.e = mat; }
}

var cfg = new Config();

function main(cfg)
{
    cfg.canvas = document.getElementById("world");
    
}

function update_world()
{
    let ctx = cfg.canvas.getContext('2d');
}




// Matrix Math Functions

// Returns a projection matrix based on the given fov
function proj_mat(fov, aspect, near, far)
{
    var top, bot, left, right;
    top = near * Math.tan(toRadians(fov)/2);
    bot = -top;
    right = top * aspect;
    left = -right;

    var proj = [2*near/(right-left), 0,0, -near*(right+left)/(right-left),
                0,2*near/(top-bot),0,-near*(top+bot)/(top-bot),
                0,0,-(far+near)/(far-near),2*far*near/(near-far),
                0,0,-1,0];
    return mat4(proj);
}