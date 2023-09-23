const getToken = (req)=>{
    const authhHeader = req.headers.authorization
    const token =authhHeader.split(" ")[1]
    console.log(token)
    return token


}

module.exports = getToken