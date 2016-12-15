# Notes on *Brian Holt's Workshop: A Complete Intro to React v2*

## Install and run

```console
✔ npm install --global yarn
✔ yarn
```

### Server-side rendering

Run in your CLI:

```console
✔ npm run watch
✔ npm run start
```

and connect to `port` 5050.

### Development (Front-End Only)

Run in your CLI:

```console
✔ npm run dev
```

and connect to `port` 8080.


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
- `npm install --save-dev react`, run `yarn add --dev react`.
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
- The `{ url: false }` option for the `css-loader` is so that the `css-loader` doesn't attempt to bundle your images into your JS bundle too.
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
3. We could filter the data that the children is interested into, and then pass it down through `<BrowserRouter>` and `<Match>` (from `react-router` v4) when creating the component with a lamdba. This is my preferred approach.

Example of option 3:

```javascript
const App = () => (
  <BrowserRouter>
    <div className='app'>
      <Match exactly pattern='/' component={Landing} />
      {/* SIMPLE EXAMPLE */}
      <Match
        pattern='/search'
        component={props => <Search shows={preload.shows} {...props} />} />
      {/* COMPLEX EXAMPLE */}
      <Match
        pattern='/details/:id'
        component={props =>
          <Details
            show={preload.shows.filter(s => props.params.id === s.imdbID)[0]}
            {...props}
          />
        }
      />
    </div>
  </BrowserRouter>
)
```


## 8. Lifecycle of a React component

### 1st. `constructor`

- Set up your components initial state.
- Runs:
	- In `node`
	- In the browser

### 2nd. `componentWillMount`

- Runs right **before** the component gets mounted.
- Great place for:
  - Share code between `node` and the browser.
- Runs:
	- In `node`
	- In the browser

### 3rd. `componentDidMount`

- Runs right **after** your component gets put into the DOM.
- The idea: render first then go get the data.
- Great place for:
  - interact with the `DOM`
  - `AJAX`
	- setup external event listeners
	- wrap `D3`
	- wrap a `jQuery` plugin
- Runs in the browser
- **DOES NOT** run in `node`

### 4th. `componentWillUnmount`

- Runs right before the component is taken off the DOM.
- Great place for:
	- dispose external event listeners
	- clean up in general
- Runs in the browser
- **DOES NOT** run in `node`

### `shouldComponentUpdate` (only for performance)

- React triggers re-renders when the component data (`state` and/or `props`) change:
- The mechanism for *diffing* the data can be expensive (slow) on **deeply nested data**.
- React gives you an escape patch for this kind of situations: `shouldComponentUpdate`.

**DO NOT** use `shouldComponentUpdate` unless you tested your performance and the situation described above is the root of your problem.


## 9. React Performance Tools

Visual tool for checking where your application is waisting render cycles.

It has 3 different metrics:

- `Print Inclusive`: includes Lifecycle Methods.
- `Print Exclusive`: excludes Lifecycle Methods.
- `Print Wasted`: shows where you are wasting time (unnecessary renders, ...)

Check the [Official Docs](https://facebook.github.io/react/docs/perf.html).

### Performance tip

Avoid putting SVGs into React components. If you can, leave them outside of React.


## 10. React DevTools

Some tricks:

- If you `right-click -> Inspect Element` on something and then click the React tab, it will take you straight to that element in the virtual DOM.
- Select something in the virtual DOM in the React tab. Now go to the Console tab and type `$r`. It should be a reference to the element you have selected in the virtual DOM and you can manipulate it.
- You can do the above trick with the normal DOM explorer with `$0`, `$1`, `$2`, `$3`, and `$4` instead where:
	- 0 is the last one you selected,
	- 1 is the penultimate,
	- and so on.
- iframes and Chrome/Firefox extensions don't work with React Dev Tools as of writing.


## 11. Redux

With `redux`:

- You have a single `store` which stores your entire app state in a single tree.
- You emit an `action` every time you want to modify the tree.
- An `action` kicks off a `reducer`:
	- A pure function
	- Takes a tree and parameter(s)
	- Returns a new tree after applying whatever transformations it deems fit.


## 12. TODO: REVIEW (Redux DevTools)

[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

### 1. Add `middleware` to `redux` that hooks into the DevTools

`store.js`

```javascript
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const reduxDevTools = () =>
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    reduxDevTools()
  )
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


## 13. Testing Redux

### Brian's theory about unit testing and Redux

- *As opposed to testing React which I don't do much of, I test the hell out of my redux code*.
- *Redux code is very testable and you should cover all or nearly-all of your reducers with tests*.

### Redux DevTools Autogenerated tests

- Use Redux DevTools autogenerated tests as a template for your tests.
- I don't like the way those tests are written, even though they are a very cool piece of tech-magic :)

`the.generated.test.js`

```javascript
import reducers from '../../reducers';

test('reducers', () => {
  let state;
  state = reducers({omdbData:{},searchTerm:''}, {type:'SET_SEARCH_TERM',searchTerm:'jessica jones'});
  expect(state).toEqual({omdbData:{},searchTerm:'jessica jones'});
});
```

`the.way.i.like.my.test.js`

```javascript
import rootReducer from './reducers'

test('SET_SEARCH_TERM', () => {
  const initialModel = { omdbData: {}, searchTerm: '' }
  const setSearchTermAction = { type: 'SET_SEARCH_TERM', searchTerm: 'jessica jones' }
  const expectedModel = { omdbData: {}, searchTerm: 'jessica jones' }

  expect(
    rootReducer(initialModel, setSearchTermAction)
  ).toEqual(expectedModel)
})
```


## 14. Universal Rendering

- Quite straightforward with just vanilla React.
- Not quite so simple once you introduce `react-router` into the mix:
	- Avoid route duplication.
	- Re-use already defined routes.

### The problem with `window` and `document`

The big key with Universal Rendering is being careful about referencing `window` and `document` as those aren't available in `node` environments.

### Running the App

`package.json`

``` json
  "scripts": {
    "watch": "webpack --watch",
    "start": "NODE_ENV=server nodemon server.js"
  }
```

Run in your CLI:

```console
✔ npm run watch
✔ npm run start
```

and connect:

- to your `express` server (`localhost:5050` in our case)
- not to `webpack-dev-server` (`localhost:8080` in our case)

### A basic universal `express` server

```javascript
require('babel-register')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const _template = require('lodash.template')
const express = require('express')
const ServerRouter = ReactRouter.ServerRouter
const fs = require('fs')

const App = require('./js/App').default

const port = 5050
const baseTemplate = fs.readFileSync('./index.html')
const server = express()

server.use('/public', express.static('./public'))

server.use((req, res) => {
  const context = ReactRouter.createServerRenderContext()
  const body = ReactDOMServer.renderToString(
    React.createElement(
      ServerRouter,
      { location: req.url, context: context },
      React.createElement(
        App
      )
    )
  )
  res.write(_template(baseTemplate)({body}))
  res.end()
})

server.listen(
  port,
  () => {
    console.log()
    console.log(`  🚀   Listening on ${port}  🚀  `)
    console.log()
  }
)
```


## 15. Webpack Chunking and Async Routing

Serve **just** the JavaScript you need for the current page:

- Use webpack's `System.import` async loading API.
- Webpack is able to download the chunks as we need them.
- Identify the modules that can be async.
- Treat all of our routes as async (`react-router` is already instrumented for this, server and client-side).
- Remember to connect to your `express` server (and not to your `webpack-dev-server`)

### Quick and Dirty Way to Shim `System.import` out

Node doesn't have `System.import` (it's tied to the new ES6 module system which Node doesn't have yet)

```
if (global) {
  global.System = { import () {} }
}
```


## 16. Building for Production Tips

[Building for Production Webpack Official Guide](https://webpack.js.org/guides/production-build/)

`package.json`

``` json
  "scripts": {
    "build": "webpack"
  }
```

### Before

```console
❯ npm run build

Hash: 237b050b47e615b5834d
Version: webpack 2.1.0-beta.25
Time: 3503ms
      Asset     Size  Chunks             Chunk Names
0.bundle.js  10.7 kB       0  [emitted]
1.bundle.js  11.1 kB       1  [emitted]
2.bundle.js  5.71 kB       2  [emitted]
  bundle.js   985 kB       3  [emitted]  main
    + 241 hidden modules
```

### 1. Source Maps for Production

Switch to `devtool: 'cheap-module-source-map'`

```console
❯ npm run build

Hash: 1a5a5dd016de1077fe5c
Version: webpack 2.1.0-beta.25
Time: 3615ms
          Asset     Size  Chunks             Chunk Names
    0.bundle.js  9.87 kB       0  [emitted]
    1.bundle.js  10.4 kB       1  [emitted]
    2.bundle.js  5.28 kB       2  [emitted]
      bundle.js   912 kB       3  [emitted]  main
    + 241 hidden modules
```

### 2. Production Environment with Minification

```javascript
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ],
```

```console
❯ npm run build

Hash: edb4ecc442319bcb340d
Version: webpack 2.1.0-beta.25
Time: 6407ms
      Asset     Size  Chunks             Chunk Names
0.bundle.js  3.44 kB       0  [emitted]
1.bundle.js  4.04 kB       1  [emitted]
2.bundle.js  2.13 kB       2  [emitted]
  bundle.js   219 kB       3  [emitted]  main
    + 232 hidden modules
```


## 17. Preact

You need to modify:

- `webpack.config.js`
- `express` server (for Server-side Rendering)

Gotcha: Use `preact-compat` if you want your `propTypes` to work.

### Modify `webpack.config.js`

```javascript
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  {
    include: [
      path.resolve(__dirname, 'js'),
      path.resolve('node_modules/preact-compat/src')
    ],
    test: /\.jsx?$/,
    loader: 'babel-loader'
  },
```

### Modify your `express` server

Using React:

```javascript
const ReactDOMServer = require('react-dom/server')

/* ... */

ReactDOMServer.renderToString( /* ... */ )
```

Using Preact:

```javascript
const preactRenderToString = require('preact-render-to-string')

/* ... */

preactRenderToString( /* ... */)
```

### Using `preact-compat`

```console
❯ NODE_ENV=production webpack -p

Hash: c666fffa47e3593cafd0
Version: webpack 2.1.0-beta.25
Time: 4792ms
          Asset       Size  Chunks             Chunk Names
    0.bundle.js    3.56 kB       0  [emitted]
    1.bundle.js    4.18 kB       1  [emitted]
    2.bundle.js    2.19 kB       2  [emitted]
      bundle.js    96.8 kB       3  [emitted]  main
    + 75 hidden modules
```

### Using `preact`

```console
❯ NODE_ENV=production webpack -p
Hash: e985d191d65ae690efbd
Version: webpack 2.1.0-beta.25
Time: 3708ms
          Asset       Size  Chunks             Chunk Names
    0.bundle.js    3.47 kB       0  [emitted]
    1.bundle.js    4.07 kB       1  [emitted]
    2.bundle.js    2.16 kB       2  [emitted]
      bundle.js    81.6 kB       3  [emitted]  main
    + 72 hidden modules
```
