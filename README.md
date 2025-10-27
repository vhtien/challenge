# challenge

## Function criteria
1. Can create multiple TODOs successfully
2. Cannot create TODOS with a single character
3. The minimum characters in task name should be 2
4. Can close all TODOs at once
5. Can close a single TODO
6. Can filter TODOs
7. Can clear all completed TODOs
8. Can undo a completed TODO
9. Can undo all completed TODO

## Implement strategy
We need to automate the web application, then we need to focus on all supported browsers when testing every function. There are many frameworks for automating web application, but the best one comes with a lot of built-in supports like cross-browsers testing, running in parallel, test reports ... is playwright. That's why I'm using playwright for this project.

## How to run
Please follow these steps to install dependencies before running:
1. Install Node.js. Please make sure you can see the version using these commands:
    node -v
    npm -v

2. Download this repository and navigate to the root project directory, install dependencies by using this command:
    npm install

3. Install browser binaries for playwright
    npx playwright install

4. Run test scripts in all supported browsers (chromium, firefox, webkit, Google Chrome) in parallel by using this command:
    npm run test

I also support a shotcut for running only in chromium by using this command:
    npm run test-chromium

5. Using this command to see the html report after running:
    npm run report
