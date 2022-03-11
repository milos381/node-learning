//THIS FILE WAS USED FOR FIRST PART OF EXCRSISE
//TO USE IT AGAIN, PASTE THIS CODE TO APP.JS
// const http = require('http')

// const routes = require('./routes')

// const server = http.createServer(routes)

// server.listen(3000)
const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "message"><button>"SEND"</button></input></form></body>')
        res.write('</html>')
        return res.end() //this return statement is because we don't want to continue rendering at first
    }
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk)
            // > <Buffer 6d 65 73 73 61 67 65 3d 68 65 6c 6c 6f 2b 74 68 65 72 65>
            body.push(chunk)
        })
        // on a line below, we have to put return in order for event listener to gets executed
        // before it proceeds to the global code 
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            // console.log(parsedBody)
            // > message=hello+there
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/') 
                return res.end()
            })
    
        })
    
    }
    //the code below this line will render after sucessfully sending a post request and it will be rendered at /message
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node Server!</h1></body>')
    res.write('</html>')
    res.end()
}

module.exports = requestHandler
