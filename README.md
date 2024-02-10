## Steps to run project
Variant 1
1. You need `node.js` and `npm`
2. Clone repository in preferred directory
3. Run `npm i`
4. Run `npm run server` (`webpack` and `express` will work together)
5. Go to `http://localhost:9000` in browser 
6. If you make changes, just update page
This option is not ideal, as it does not allow you to debug the server part.

Variant 2
Step 1,2,3 withow changes
4. Open two terminals 
5. In first terminal enter `npm run express`
6. In second terminal enter `npm run dev`. 
Now we have two servers: for the client part and for requests.
P.S.
I have no idea why I didn't think of using two terminals sooner lol


