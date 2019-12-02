# canvas-loop-engine

[![CircleCI Status](https://circleci.com/gh/Julien-Amblard/canvas-loop-engine.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/Julien-Amblard/canvas-loop-engine)
[![npm](https://img.shields.io/npm/dt/canvas-loop-engine.svg?style=flat-square)](https://www.npmjs.com/package/canvas-loop-engine)
[![npm](https://img.shields.io/npm/v/canvas-loop-engine.svg?style=flat-square)](https://www.npmjs.com/package/canvas-loop-engine)
[![npm](https://img.shields.io/npm/l/canvas-loop-engine.svg?style=flat-square)](https://github.com/Julien-Amblard/canvas-loop-engine/blob/master/LICENSE)
  
> A basic loop engine for canvas animation

## [Live example](https://codepen.io/Capse/pen/gObOKGo)

- [Install](#install)
- [Importing](#importing)

- [Options](#options)
  - [$canvas](#canvas)
  - [contextType](#contextType)
  - [contextAttributes](#contextAttributes)
  - [autoStart](#autoStart)
  - [clearOnUpdate](#clearOnUpdate)
  - [data](#data)
  - [onInit](#onInit)
  - [onStart](#onStart)
  - [onStop](#onStop)
  - [onUpdate](#onUpdate)
  - [onDraw](#onDraw)
- [Methods](#methods)
  - [start()](#start)
  - [stop()](#stop)
  - [toggle()](#toggle)
  - [update()](#update)
  - [draw()](#draw)
  - [isRunning](#isRunning)

## Install <a id="install"></a>

`npm i canvas-loop-engine --save`  
or  
`yarn add canvas-loop-engine`  

---

### Importing <a id="importing"></a>

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({ ...options })
MyLoop.start()
```

---

## Options <a id="options"></a>  

### $canvas <a id="canvas"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `HTMLCanvasElement` | `null` | `true` | The canvas html element you want to draw on. |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas")
})
```

### contextType <a id="contextType"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `string` | `"2d"` | `false` | The canvas context type giving in the getContext. See [getContext documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)  |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  contextType: "webgl"
})
```

---
### contextAttributes <a id="contextAttributes"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `object` | `null` | `false` | The canvas context attributes giving in the getContext. See [getContext documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)  |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  contextType: "webgl",
  contextAttribute: {
    antialias: false,
    depth: false
  }
})
```

---

### autoStart <a id="autoStart"></a>  
| Type | Default | required | Description |
|:----|:----|:----|:----|
| `boolean` | `true` | `false` | Define if the loop engine should start automaticaly. |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  autoStart: false //default true
})
```

---

### clearOnUpdate <a id="clearOnUpdate"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `boolean` | `true` | `false` | Automaticaly clear the canvas before each draw |

> Will trigger just before the onDraw functions

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  autoStart: false //default true
})
```

---

#### data <a id="data"></a>  
| Type | Default | required | Description |
|:----|:----|:----|:----|
| `any` | `{}` | `false` | You can give a data object. it will be return as argument in every props function (onInit, onUpdate, onDraw, onStar, onStop) for a future usage. |

> Usually, you can use it to stock your drawing settings (*particles etc...*)  

> ⚠️ The data object will be deeply clone. It will break every references

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  data: [{
    //...particle data
  }]
})
```

---

### onInit <a id="onInit"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `function` \| `array of function` | `null` | `false` | function or array of function that will trigger at the loop init |

| name | type | Description |
|:----|:----|:----|
| $canvas | `HTMLCanvasElement` | the html convas element |
| ctx | `HTMLElement` | the html convas element |
| data | `any` | the data object you send at the init |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onInit: function ({ $canvas, ctx, data }) {
    //do things
  }
})
```

***or***  

```js
import Engine from "canvas-loop-engine"

const foo = function ({ $canvas, ctx, data }) {
  //do things
}
const bar = function ({ $canvas, ctx, data }) {
  //do things
}

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onInit: [foo, bar]
})
```

---

### onStart <a id="onStart"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `function` \| `array of function` | `null` | `false` | Function or array of function that will trigger when you start the loop |

| name | type | Description |
|:----|:----|:----|
| $canvas | `HTMLCanvasElement` | the html convas element |
| ctx | `HTMLElement` | the html convas element |
| data | `any` | the data object you send at the init |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onStart: function ({ $canvas, ctx, data }) {
    //do things
  }
})
```

***or***  

```js
import Engine from "canvas-loop-engine"

const foo = function ({ $canvas, ctx, data }) {
  //do things
}
const bar = function ({ $canvas, ctx, data }) {
  //do things
}

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onStart: [foo, bar]
})
```

---

### onStop <a id="onStop"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `function` \| `array of function` | `null` | `false` | Function or array of function that will trigger when you stop the loop |

| name | type | Description |
|:----|:----|:----|
| $canvas | `HTMLCanvasElement` | the html convas element |
| ctx | `HTMLElement` | the html convas element |
| data | `any` | the data object you send at the init |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onStop: function ({ $canvas, ctx, data }) {
    //do things
  }
})
```

***or***  

```js
import Engine from "canvas-loop-engine"

const foo = function ({ $canvas, ctx, data }) {
  //do things
}
const bar = function ({ $canvas, ctx, data }) {
  //do things
}

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onStop: [foo, bar]
})
```

---

### onUpdate <a id="onUpdate"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `function` \| `array of function` | `null` | `false` | Function or array of function that will trigger on each loop update |

| name | type | Description |
|:----|:----|:----|
| $canvas | `HTMLCanvasElement` | the html convas element |
| ctx | `HTMLElement` | the html convas element |
| data | `any` | the data object you send at the init |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onUpdate: function ({ $canvas, ctx, data }) {
    //do things
  }
})
```

***or***  

```js
import Engine from "canvas-loop-engine"

const foo = function ({ $canvas, ctx, data }) {
  //do things
}
const bar = function ({ $canvas, ctx, data }) {
  //do things
}

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onUpdate: [foo, bar]
})
```

---

### onDraw <a id="onDraw"></a>  

| Type | Default | required | Description |
|:----|:----|:----|:----|
| `function` \| `array of function` | `null` | `false` | Function or array of function that will trigger on each draw, usually, it's here you draw on canvas |

| name | type | Description |
|:----|:----|:----|
| $canvas | `HTMLCanvasElement` | the html convas element |
| ctx | `HTMLElement` | the html convas element |
| data | `any` | the data object you send at the init |

```js
import Engine from "canvas-loop-engine"

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onDraw: function ({ $canvas, ctx, data }) {
    //draw things
  }
})
```

***or***  

```js
import Engine from "canvas-loop-engine"

const foo = function ({ $canvas, ctx, data }) {
  //draw things
}
const bar = function ({ $canvas, ctx, data }) {
  //draw things
}

const MyLoop = new Engine({
  $canvas: document.querySelector("canvas"),
  onDraw: [foo, bar]
})
```

---

## Methods <a id="methods"></a>  

### .start() <a id="start"></a>  

| Type | Description |
|:----|:----|
| `function` | Start the loop, if it was'nt already start |
> Will trigger the `onStart` functions

---

### .stop() <a id="stop"></a>  

| Type | Description |
|:----|:----|
| `function` | Stop the loop, if it was'nt already stop |
> Will trigger the `onStop` functions

---

### .toggle() <a id="toggle"></a>  

| Type | Description |
|:----|:----|
| `function` | Toogle the loop (stop or start) |
> Will trigger the `onStop` or `onStart` functions

---

### .update() <a id="update"></a>  

| Type | Description |
|:----|:----|
| `function` | trigger the `onUpdate` functions |

---

### .draw() <a id="draw"></a>  

| Type | Description |
|:----|:----|
| `function` | trigger the `onDraw` functions |

---

### .isRunning <a id="isRunning"></a>  

| Type | Description |
|:----|:----|
| `boolean` | the current loop status (if he's running or not) |

---

---

## TODO  

- [x] Doc
- [ ] TU
- [ ] TS
