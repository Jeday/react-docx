# react-docx [![https://www.npmjs.com/package/react-docx](https://img.shields.io/npm/v/react-docx)](https://www.npmjs.com/package/react-docx)

react-docx is a React [reconciler](https://github.com/facebook/react/tree/master/packages/react-reconciler) for [DOCX.js](https://github.com/dolanmiu/docx).

### Why

Largely inspired by [R3F](https://github.com/react-spring/react-three-fiber) this library allows you write your DOCX documents in declarative style with reusable components. This is not a wrapper library and so DOCX classes are transformed dynamically into React components.

### Limitations

In current early stage of library and because of inconsistent style of some methods in DOCX.js not all advanced DOCX features may work declaratively. Currently only single render run is supported, that means that using useState or passing another set of values to Context providers will have no effect. Alternatively you can call renderAsyncDocument again to rerender the document entirely.

### Usage

Install peer dependencies React and Docx! They are needed for JSX and DOCX elements.

```jsx
import React from "react"; // that is needed for jsx to work
import { renderAsyncDocument } from "react-docx";
import * as Docx from "docx"; // that is a peer dependency

renderAsyncDocument(
  <section>
    <paragraph heading={Docx.HeadingLevel.HEADING_1}>
      You can pass props as if you are passing them to constructor
    </paragraph>
    <p>There are some helpful shortcuts for often used tags, like this</p>
    <p>
      <t>this one is for TextRun</t>
    </p>
    <p>
      For text inside anything else than t or textrun tags, TextRun is created
      under the hood
      <t break>
        For when docx objects have functional methods, you can pass function
        name as a prop. Prop value will be passed as an argument, if you need to
        pass many arguments use array instead.
      </t>
    </p>
    <p>
      Docx object is considered a tag if it has a constructor signature and is
      exported out of DOCX.js. Object key is then converted to lowercase.
      Everything you can make with raw DOCX.js(including mistakes), you can make
      here.
    </p>
    <p>
      <img
        src="base64 string or buffer object works"
        width={200}
        height={200}
      />
      <href
        src="http://localhost:8080"
        label={"For images and links shortcuts object are provided"}
      />
      This allows for removal of boilerplate for often used objects. In future
      more such object will be implemented.
    </p>
    <p>
      Sections are root tags for valid DOCX. If you want to have multiple
      sections, pass React Fragment with them to renderAsyncDocument.
    </p>
    <Component text="You can use components of course, just like in react!">
      <t>A child</t>
    </Component>
  </section>
).then((document) => console.log("This is rendered docx document", document));

const Component = ({ children, text }) => {
  const ref = React.useRef(null); // use can use refs to access docx objects
  React.useLayoutEffect(() => {
    // you can use LayoutEffect hook in combination with refs to write imperative code( hacks for example)
    console.log(ref.current);
    // because of useLayoutEffect nature it will work in single render as opposed to regular useEffect
  }, []);
  return (
    <p ref={ref}>
      <t>{text}</t>
      {children}
    </p>
  );
};
```

### API

For details on Docx refer to [it's docs](https://docx.js.org).

Core render function, returns promise that is resolved with rendered document object. You can use Docx tools to convert it to blob, as according to Docx examples.

```jsx
renderAsyncDocument(ReactElements, DocumentProperites, FileProperties);
```

### Future Plans

- More shortcuts
- More fictive objects to remove boilerplate
- Add mutations to Document tree
