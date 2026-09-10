import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const compressed = new Map();
const root = path.resolve('out');
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.webp':'image/webp', '.png':'image/png', '.jpeg':'image/jpeg', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.pdf':'application/pdf', '.mp4':'video/mp4', '.webm':'video/webm'};
http.createServer((req,res) => {
 let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
 if(!file.startsWith(root + path.sep) && file !== root){res.writeHead(403).end();return;}
 if(fs.existsSync(file + '.html')) file += '.html';
 else if(fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404).end('Not found');return;}
 const size = fs.statSync(file).size;
 res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
 res.setHeader('Cache-Control','no-cache');
 res.setHeader('Accept-Ranges','bytes');
 const range=req.headers.range?.match(/bytes=(\d+)-(\d*)/);
 if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),size-1):size-1; if(start>end || start>=size){res.writeHead(416).end();return;}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});fs.createReadStream(file,{start,end}).pipe(res);}
 else if(/\.(html|css|js|json|svg|txt)$/.test(file) && req.headers['accept-encoding']?.includes('gzip')) {
 const stamp=fs.statSync(file).mtimeMs;const cached=compressed.get(file);const data=cached?.stamp===stamp?cached.data:gzipSync(fs.readFileSync(file));compressed.set(file,{stamp,data});res.setHeader('Content-Encoding','gzip');res.setHeader('Vary','Accept-Encoding');res.setHeader('Content-Length',data.length);res.end(data);
 } else{res.setHeader('Content-Length',size);fs.createReadStream(file).pipe(res);}
}).listen(3000,'127.0.0.1',() => console.log('Portfolio preview: http://localhost:3000'));
