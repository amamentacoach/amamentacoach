import jwt from 'jsonwebtoken'

function verifyJWT(req, res, next){ 

    const token = req.headers.authorization; 
    
    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    
 
    jwt.verify(token, process.env.SECRET?process.env.SECRET:"segredo", function(err, decoded) { 
        if (err) 
            return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
        
        req.mae_id = decoded.id
        next(); 
    }); 
} 

export default verifyJWT;