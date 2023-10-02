const getToken = (req)=>{
    const authhHeader = req.headers.authorization
    const token =authhHeader.split(" ")[1]
   
    return token


}

module.exports = getToken