# README

Welcome to Ready City!

This application unites Rails with modern Javascript using the `webpack-rails`
gem. To get up and running, do the following:
- clone this repo then `cd` inside
- `bundle && npm i` to get all Rails & Javascript dependencies
- `npm run start` to start webpack-dev-server via `Procfile.dev`
  - **NB:** `Procfile.dev` is configured for hot reloading of both JS assets served through webpack-dev-server and CSS assets served through the asset pipeline
- visit localhost:5000 to view the app
