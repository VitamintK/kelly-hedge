# kelly-hedge
A javascript calculator that tells you how much to hedge a bet in order to maximize E[log(wealth)]

Currently available at http://scientist.wang/kelly-hedge/ 

my workflow:

Developing: `npm run dev`  
Build: `npx next build`  
Copy to scientist.wang: `touch out/.nojekyll && cp -r out/ ~/github/scientist.wang/kelly-hedge/`  
Deploy scientist.wang (have to do it manually for some reason)

