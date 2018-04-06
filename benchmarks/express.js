let express   =require('express')

function one(req, res, next) {
    req.one = true;
    next();
}

function two(req, res, next) {
    req.two = true;
    next();
}

express()
    .use(one, two)
    .post('/test/', (req, res) => {
        res.end(`hello world`);
    })
    .listen(3000,()=>{
        console.log("running express")

    });