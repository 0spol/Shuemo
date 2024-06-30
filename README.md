# [Shuemo](https://shuemo.dev/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/0spol/shuemo/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/shuemo.svg?style=flat)](https://www.npmjs.com/package/shuemo) [![CircleCI Status](https://circleci.com/gh/0spol/shuemo.svg?style=shield)](https://circleci.com/gh/0spol/shuemo) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://shuemo.dev/docs/how-to-contribute)

Shuemo is a Final Year Project (TFG) developed by three collaborators: Erik (MeLlamoTawet(https://github.com/MeLLamoTawet)), Ariel (AxxelESP(https://github.com/AxxelESP)), and Gonzalo (0spol(https://github.com/0spol)).

* **Declarative:** Shuemo allows you to design simple and interactive UIs. It efficiently updates and renders the right components as your data changes, making your code more predictable and easier to debug.
* **Component-Based:** Create encapsulated components that manage their own state, and compose them to build complex UIs. Component logic is written in JavaScript, allowing you to pass rich data through your app while keeping the state out of the DOM.
* **Learn Once, Write Anywhere:** Shuemo is versatile and can integrate with different technology stacks, enabling you to develop new features without rewriting existing code. It also supports server-side rendering with [Node](https://nodejs.org/en) and mobile apps with [React Native](https://reactnative.dev/).

[Learn how to use Shuemo in your project](https://shuemo.dev/learn).

## Installation

Shuemo is designed for gradual adoption, and **you can use as much or as little Shuemo as you need**:

* Use the [Quick Start](https://shuemo.dev/learn) to get a taste of Shuemo.
* [Add Shuemo to an Existing Project](https://shuemo.dev/learn/add-shuemo-to-an-existing-project) to integrate it incrementally.
* [Create a New Shuemo App](https://shuemo.dev/learn/start-a-new-shuemo-project) if you're looking to use a powerful JavaScript toolchain.

## Documentation

You can find the Shuemo documentation [on the website](https://shuemo.dev/).  

Check out the [Getting Started](https://shuemo.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [Quick Start](https://shuemo.dev/learn)
* [Tutorial](https://shuemo.dev/learn/tutorial)
* [Thinking in Shuemo](https://shuemo.dev/learn/thinking-in-shuemo)
* [Installation](https://shuemo.dev/learn/installation)
* [Describing the UI](https://shuemo.dev/learn/describing-the-ui)
* [Adding Interactivity](https://shuemo.dev/learn/adding-interactivity)
* [Managing State](https://shuemo.dev/learn/managing-state)
* [Advanced Guides](https://shuemo.dev/learn/advanced-guides)
* [API Reference](https://shuemo.dev/reference/shuemo)
* [Where to Get Support](https://shuemo.dev/community)
* [Contributing Guide](https://shuemo.dev/docs/how-to-contribute)

You can improve it by sending pull requests to [this repository](https://github.com/0spol/shuemo).

## Examples

We have several examples [on the website](https://shuemo.dev/). Here is the first one to get you started:

```jsx
import { createRoot } from 'shuemo-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
```

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://shuemo.dev/learn#writing-markup-with-jsx). JSX is not required to use Shuemo, but it makes code more readable, and writing it feels like writing HTML.

## Contributing

The main purpose of this repository is to continue evolving Shuemo core, making it faster and easier to use. Development of Shuemo happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Shuemo.

### [Code of Conduct](https://shuemo.dev/codeofconduct)

Shuemo has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://shuemo.dev/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://shuemo.dev/docs/how-to-contribute)

Read our [contributing guide](https://shuemo.dev/docs/how-to-contribute) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Shuemo.

### [Good First Issues](https://github.com/0spol/shuemo/labels/good%20first%20issue)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/0spol/shuemo/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License

Shuemo is [MIT licensed](./LICENSE).