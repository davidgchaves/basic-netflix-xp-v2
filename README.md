# Notes on *Brian Holt's Workshop: A Complete Intro to React v2*

## Install and run

```console
✔ npm install --global yarn
✔ yarn
✔ npm run build
✔ npm run server
```

For development:

```console
✔ npm run dev
```

## TODO v1

1. Refactor to use `HOC`s, where possible.
2. Use [`recompose`](https://github.com/acdlite/recompose) to simulate Lifecycle events.
3. Change from `standard` to `eslint + standard-rules`.
4. Try out [eslint-plugin-immutable](https://github.com/jhusain/eslint-plugin-immutable).
5. Find a reliable solution (if possible) that allows `ES6` modules and `webpack`'s `require.ensure`.


## TODO v2

1. Fix those pesky `npm install --global`.


## Global installs (making `Spacemacs` happy)

```console
✔ npm install --global standard
```

### Reminder in case you decide to switch back to `eslint` (TODOs v1 3 and 4)

```console
✔ npm install --global eslint eslint-config-standard eslint-config-standard-react eslint-config-standard-jsx eslint-plugin-babel eslint-plugin-promise eslint-plugin-standard eslint-plugin-react
```


## Links and Resources

### Links

- [Brian's Notes v1](https://btholt.github.io/complete-intro-to-react-v1)
- [Brian's Notes v2](https://btholt.github.io/complete-intro-to-react/all.html)
- [Brian's Fluent 2016 Code](https://github.com/btholt/complete-intro-to-react)

### Tools

- [`standard`](https://github.com/feross/standard)
- [`standard-format`](https://github.com/maxogden/standard-format): Converts your code into `Standard` JavaScript Format.
- [`standard-react`](https://www.npmjs.com/package/standard-react): Extra `standard` rules for `React`.
- [JavaScript Standard Style](https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style): A TL;DR of the `standard` JavaScript rules.
- [`radium`](http://stack.formidable.com/radium): Inline styles on `react` elements.
- [`aphrodite`](https://github.com/Khan/aphrodite): Inline styles that work!.
- [`emmet`](http://emmet.io/): Plugin for many popular text editors which greatly improves HTML & CSS workflow.
- [VimBox](https://github.com/jordwalke/VimBox): Simple, Modern MacVim Configuration by @jordwalke.


## 0. Goal

The goal of this workshop is to get you full up to speed on modern development and give you an idea what it is like to develop an app in the `react` ecosystem.

In addition to `react`, we are going to be using `node`, `express`, `redux`, `webpack`, `jest`, `enzyme`, `npm`, and `react-router`.


## 1. Tooling

### `yarn`

```console
✔ npm install --global yarn
```
#### Basic Usage

Instead of:

- `npm install`, run `yarn`.
- `npm install --save react`, run `yarn add react`.
- `npm install --global nodemon`, run `yarn global add nodemon`.

Rule of thumb:

- Use `yarn` for Apps.
- Use `npm` for Libraries.

#### Cool stuff

Try `yarn update-interactive`.

### `standard`

```console
✔ npm install --global standard
```

`standard` is a linting tool.

- Run `standard` from your terminal and see if you have any issues.
- Run `standard --fix` from your terminal to automatically fix some of those issues.

### `babel 6`

#### `babel 6` plugins

- `babel 6` has the concept of plugins.
- Each `babel 6` transformation comes in the form a plugin.

#### `babel 6` presets

- `babel 6` has the concept of presets (bundles of plugins).
- `es2015` and `react` has their own preset.

#### `.babelrc` for development

It is ok to use presets:

`.babelrc`

```json
{
  "presets": [
    "react",
    ["es2015", { "modules": false, "loose": true }]
  ],
  "env": {
    "test": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
}
```

Why `{ "modules": false }`?
So `webpack 2` can take care of the `modules` (and not `babel 6`) and do `tree shaking`.

Why `{ "loose": true }`?
It reduces the bundle size, but be careful because it's going to bite you in edge cases.

#### `.babelrc` for production

Only include the `es2015` transformations (plugins) you need:

`.babelrc`

```json
{
  "presets": ["react"],
  "plugins": [
    "...",
    "..."
  ]
}
```

### `webpack`

```console
✔ npm install --global webpack@v2.1.0-beta.25
```

Two of `webpack`'s core features:

- module compilation
- plug in loaders

Build for `webpack` is pretty slow:

- take advantage of `webpack`'s watch feature.

#### What are `webpack` loaders?

`Webpack` loaders are black boxes where `webpack`:

- pipe input into...
- ...accept output out of.

#### What are `webpack` loaders useful for?

Use loaders to:

- transpile,
- include CSS,
- include inline images via encoding,
- transform SVGs.

#### `babel-loader`

Transpile our code using `babel 6`.

#### `eslint-loader`

Run `standard` for us.

#### `json-loader`

Require in `json` files.

#### `style-loader` and `css-loader`

We need two loaders to load CSS:

- The `style-loader` takes the finished, parsed CSS and then bundles that into your JS bundle.
- The `css-loader` lets `webpack` understand CSS (without it `webpack` doesn't parse CSS).
- You could just as easy put the `less-loader` or `postcss-loader` instead of the `css-loader` if you wanted to have an augmented CSS language to work with.
- The `{ url: false }` option for the `css-loader` is so that the `css-loader` doesn’t attempt to bundle your images into your JS bundle too.
- **GOTCHA**: All our CSS is going to be in `bundle.js`:
  - You have to wait for you js to load before your css load.
  - NOT A GOOD IDEA.
  - Bearable in development.

#### A basic `webpack` config file

A good way to send your code through `babel 6` is via `webpack` loader mechanism:

`webpack.config.js`

```javascript
const path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/index.jsx',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        include: path.resolve(__dirname, 'js'),
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      }
    ]
  }
}
```


## 2. `Props`

- `Props` are variables that you pass from the `parent` to the `child`.
- The `child` cannot modify the `props` it gets.
- When bugs arise in the future, you know the `child` didn't modify the variable because it can't.


## 3. JSX

### Brian's theory about JSX

- *markup in JS is a good thing!*
- *JS in markup is a bad thing!*

### Components

Components in `react` are nothing but functions.

We're keeping all the concerns of a component in one place:

- the markup structure
- the event listeners
- the state
- the state mutators

If the component breaks, we know it broke there.

### `.js` vs `.jsx`

It doesn't actually matter if you use `.js` or `.jsx` extension, since both are getting run through `Babel 6`.

But it does signify to all who follow that `*.jsx`  files **must be** compiled before being shipped out.


## 4. The *basic Netflix experience* App

Our app is going to have:

- a home page
- a browse/search page
- a video page

All CSS is pre-done.

### React Approach to UIs

*TL;DR*: Given a set of parameters, how does this UI look?

- Think of your UI as snapshots.
- Look at the UI as how is it going to look given a set of parameters.
- Do not think of your UI as a progression of time and events.

When coding `React`, assume you have all the data you need coming in via `props` and then figure out later how to get it there.


## 5. React State

### Debugging trick

Useful to dump your `props`, `params` or `state` (any JSON data) to the page.

```javascript
<pre><code>
  {JSON.stringify(this.props.params, null, 2)}
</code></pre>
```

```javascript
import preload from '../public/data'

const Search = () => (
  <div className='search'>
    <pre><code>
      {JSON.stringify(preload, null, 2)}
    </code></pre>
  </div>
)
```

### `props`

- `props` are passed down from parents to children.
- `props` are immutable.

### `state`

- `state` is created, read, and mutated all inside of a component.
- If a component has `state`, that `state` cannot be mutated by a parent, child, or any other external influence.
- The only way to (sanely) mutate `state` is through the `setState` method.

#### `forceUpdate` vs `setState`

- `forceUpdate` kicks off a re-render.
- `setState` updates the state and schedules a re-render.

Integrating with other libraries (D3, jQuery) is almost the only reason to use `forceUpdate`.

#### How React handles keypresses and re-renders?

1. Every time a key is pressed, an event is fired.
2. React is listening to those events and when a keypress happens (for example), React kicks off a re-render.
3. If as a consequence of the event fired, we are not modifying the `state`, then the re-render renders the same `state` as before.
4. We need to modify the `state` with `setState` when the event is fired.
5. Remember that your `state` object is the source of truth.

#### React Synthetic DOM Events

- respect the same API as a *real*  event.

### mutating parent's `state`

A parent component has the ability to expose functions to children so the child can invoke them and let the parent know it should mutate its `state`:

- It is totally up to the parent to respect that call and mutate the `state`.
- The child can only invoke functions exposed to it via passed-down `props`.


## 6. Testing

### Setup Snapshot Testing with `Jest`

Add `Jest` configuration to `package.json`

```json
"jest": {
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
  "moduleFileExtensions": ["js", "json", "jsx"]
}
```

or use an external `.jestrc` config file:

```json
{
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
  "moduleFileExtensions": ["js", "json", "jsx"]
}
```

and let `Jest` know about it:

```console
✔ NODE_ENV=test ./node_modules/.bin/jest --config .jestrc
```

### Renderers

- `renderer` from `react-test-renderer`:
  - Renders the whole tree.
  - Great for *integration (cucumber-like) testing*.
  - Slow!
- `shallow` from `enzyme`:
  - Allows shallow rendering.
  - Great for testing components in isolation.
  - Relatively fast.

**GOTCHA**:

- `renderer` and `shallow` are incompatible with each other.
- If you want to use both (integration and unit) place them in different files.
- Nonetheless I still have problems with `--coverage` failing.

```javascript
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
```

### Enzyme trick

Use `console.log(wrapper.debug())` inside a test to peek under the hood:

```javascript
it('renders our brand', () => {
  const wrapper = shallow(<Search />)
  console.log(wrapper.debug())
})
```

### Brian's theory about unit testing and React

*I don't test my UI code ever. My UI is ever shifting and in reality, I don't much care if my markup changes. I expect to as we design and iterate on the website. However I do test the hell out of my business logic which I'll separate into small modules.*


## 7. Dealing with Data

### Sharing data

- Do not make two `AJAX` requests to get the same data.
- Share this state between components by pushing it up to the highest common ancestor component.

### How to organize React methods in an ES6 component

1. `constructor`.
2. Lifecycle methods like `componentDidUpdate`.
3. Methods you create.
4. `render`.

Makes it easier to find things when you look for them.

### How to pass data to children

There's at least 3 ways to do this:

1. We could pass all the data and let the children select what she needs. This isn't great because the child is given an additional concern it doesn't need to have.
2. We could create a `callback` in the parent that passes to the children, so she can ask for the data. This is slightly better but it's an odd API for getting data. Ideally we just hand down `props` and not a `callback`, especially since this isn't async.
3. We could hook into `onEnter` `callback` (from `react-router`) for the route, grab the data that the chidren is interested into, and then pass that down. This is my preferred approach.


## 8. React DevTools

Some tricks:

- If you `right-click -> Inspect Element` on something and then click the React tab, it will take you straight to that element in the virtual DOM.
- Select something in the virtual DOM in the React tab. Now go to the Console tab and type `$r`. It should be a reference to the element you have selected in the virtual DOM and you can manipulate it.
- You can do the above trick with the normal DOM explorer with `$0`, `$1`, `$2`, `$3`, and `$4` instead where:
	- 0 is the last one you selected,
	- 1 is the penultimate,
	- and so on.
- iframes and Chrome extensions don’t work with React Dev Tools as of writing.


## 9. Redux

With `redux`:

- You have a single `store` which stores your entire app state in a single tree.
- You emit an `action` every time you want to modify the tree.
- An `action` kicks off a `reducer`:
	- A pure function
	- Takes a tree and parameter(s)
	- Returns a new tree after applying whatever transformations it deems fit.


## 10. Redux DevTools

### 1. Add `middleware` to `redux` that hooks into the DevTools

`Store.js`

```javascript
import { createStore, compose } from 'redux'

import reducer from './Reducer'
import { INITIAL_STATE } from './Constants'

const reduxDevTools = () => (
  (typeof window === 'object' &&
   typeof window.devToolsExtension !== 'undefined'
  )
    ? window.devToolsExtension()
    : (f) => f
)

const store = createStore(
  reducer,
  INITIAL_STATE,
  compose(reduxDevTools())
)

export default store
```

### 2. Add a server

- Redux DevTools doesn't work with the `file:///` protocol.
- Quick and dirty alternative, use `node`'s `http-server`:

```console
✔ npm install --save-dev http-server
✔ ./node_modules/.bin/http-server -p 5050 ./
```

Open `localhost:5050` in your browser.

### 3. Automate with `npm`

`package.json`

```json
"scripts": {
  "start": "npm run build",
  "build": "webpack -d",
  "watch": "webpack -d --watch",
  "server": "http-server -p 5050 ./"
}
```


## 11. Testing Redux

### Brian's theory about unit testing and Redux

- *As opposed to testing React which I don't do much of, I test the hell out of my redux code*.
- *Redux code is very testable and you should cover all or nearly-all of your reducers with tests*.


## 12. Universal Rendering

- Quite straightforward with just vanilla React.
- Not quite so simple once you introduce `react-router` into the mix:
	- Avoid route duplication.
	- Re-use already defined routes.

### The problem with `window` and `document`

The big key with Universal Rendering is being careful about referencing `window` and `document` as those aren't available in `node` environments.

If you need to interact with them:

```node
if (window) { /* do stuff with window*/ }
```

### A basic `express` server

```node
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import template from 'lodash.template'
import express from 'express'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { readFileSync } from 'fs'

import store from './src/Store'
import routes from './src/routes'

const port = 5050
const baseTemplate = readFileSync('./index.html')
const app = express()

app.use('/public', express.static('./public'))

app.use((req, res) => {
  match(
    {routes: routes(), location: req.url},
    (error, redirectLocation, renderProps) => {
      if (error) {
        res
          .status(500)
          .send(error.message)
      } else if (redirectLocation) {
        res.redirect(
          302,
          `${redirectLocation.pathname}${redirectLocation.Search}`
        )
      } else if (renderProps) {
        const body = ReactDOMServer.renderToString(
          React.createElement(
            Provider,
            {store},
            React.createElement(RouterContext, renderProps)
          )
        )
        res
          .status(200)
          .send(template(baseTemplate)({body}))
      } else {
        res
          .status(404)
          .send('Not found')
      }
    }
  )
})

console.log(`Listening on ${port}`)
app.listen(port)
```

### A basic `express` server commented

#### 1. Match routes on the server

Use `react-router`'s `match` with the route to match and the url

```node
import { match } from 'react-router'

app.use((req, res) => {
  match(
    {routes: routes(), location: req.url},
    (error, redirectLocation, renderProps) => { .... }
  )
})
```

#### 2. Check for `500`s

```node
(error, redirectLocation, renderProps) => {
  if (error) {
    res
      .status(500)
      .send(error.message)
  } else if (redirectLocation) { .... }
})
```

#### 3. Check for `300`s

```node
(error, redirectLocation, renderProps) => {
  ....
  if (redirectLocation) {
    res.redirect(
      302,
      `${redirectLocation.pathname}${redirectLocation.Search}`
    )
  } else if (renderProps) { .... }
})
```

#### 4. Check for `200`s

```node
const baseTemplate = readFileSync('./index.html')

(error, redirectLocation, renderProps) => {
  ....
  if (renderProps) {
    const body = ReactDOMServer.renderToString(
      React.createElement(
        Provider,
        {store},
        React.createElement(RouterContext, renderProps)
      )
    )
    res
      .status(200)
      .send(template(baseTemplate)({body}))
  } else { .... }
})
```

#### 5. If there's no match, then `404`

```node
(error, redirectLocation, renderProps) => {
  ....
  if (renderProps) { ....
  } else {
    res
      .status(404)
      .send('Not found')
  }
})
```

#### `200` in detail

##### Generate `body`

Generate the `body` with `ReactDOMServer`'s `renderToString` (render our app out to a string instead of to the DOM)

```node
const body = ReactDOMServer.renderToString(
  React.createElement(
    Provider,
    {store},
    React.createElement(RouterContext, renderProps)
  )
)
```

##### Attach it to the markup

Use `lodash.template` to template our rendered string into the `index.html` markup

```node
res
  .status(200)
  .send(template(readFileSync('./index.html'))({body}))
```


## 13. Lifecycle of a React component (universal)

### 1st. `constructor`

- Set up your components initial state.
- Runs:
	- In `node`
	- In the browser

### 2nd. `componentWillMount`

- Runs right **before** the component gets mounted.
- Use it any time you want code to run both in node and in the browser.

### 3rd. `componentDidMount`

- Runs right **after** your component gets put into the DOM.
- Will not get run in node but will in the browser.
- The idea: render first then go get the data.
- Great place for interact with the `DOM`:
	- wrap `D3`
	- wrap a `jQuery` plugin

### 4th. `componentWillUnmount`

- Runs right before the component is taken off the DOM. - Great place for:
	- get rid of external event listeners
	- clean up in general


## 14. Webpack Chunking and Async Routing

Serve **just** the JavaScript you need for the current page:

- Use webpack's async loading API (`require.ensure`)
- Webpack is able to download the chunks as we need them.
- Identify the modules that can be async.
- Treat all of our routes as async (`react-router` is already instrumented for this, server and client-side).

### ES6 vs CommonJS Modules

There's some weird errors going on if you use ES6 modules (as I do) and `require.ensure` (the need to suffix all `require('./whatever')` with `.default`) at the same time.

I think that if you want to remain sane and need to use webpack's `require.ensure`, just go with CommonJS modules all the way, and avoid ES6 modules.
