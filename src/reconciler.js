import ReactReconciler from "react-reconciler";
import * as Docx from "docx";

/// IS helper from
/// https://github.com/react-spring/react-three-fiber
const is = {
  obj: (a) => a === Object(a) && !is.arr(a),
  fun: (a) => typeof a === "function",
  str: (a) => typeof a === "string",
  num: (a) => typeof a === "number",
  und: (a) => a === void 0,
  arr: (a) => Array.isArray(a),
  equ(a, b) {
    // Wrong type or one of the two undefined, doesn't match
    if (typeof a !== typeof b || !!a !== !!b) return false;
    // Atomic, just compare a against b
    if (is.str(a) || is.num(a) || is.obj(a)) return a === b;
    // Array, shallow compare first to see if it's a match
    // eslint-disable-next-line eqeqeq
    if (is.arr(a) && a == b) return true;
    // Last resort, go through keys
    let i;
    for (i in a) if (!(i in b)) return false;
    for (i in b) if (a[i] !== b[i]) return false;
    return is.und(i) ? a === b : true;
  },
};

/// populate DocxTypes with Docx Primitives
const DocxTypes = {};
Object.keys(Docx).forEach((key) =>
  is.fun(Docx[key]) ? (DocxTypes[key.toLowerCase()] = Docx[key]) : null
);
DocxTypes["section"] = class Section {
  constructor(props) {
    this.type = "section";
    this.isSection = true;
    this.props = props;
    this.children = [];
  }
  addChildElement(child) {
    this.children.push(child);
  }
};

const hostConfig = {
  getRootHostContext(rootContainerInstance) {
    console.log("getRootHostContext", rootContainerInstance);
    return {};
  },

  getChildHostContext(parentHostContext, type, rootContainerInstance) {
    console.log(
      "getChildHostContext",
      parentHostContext,
      type,
      rootContainerInstance
    );
    return {};
  },

  getPublicInstance(instance) {
    console.log("getPublicInstance", instance);
    return instance;
  },

  prepareForCommit(containerInfo) {
    console.log("prepareForCommit", containerInfo);
  },

  resetAfterCommit(containerInfo) {
    console.log("resetAfterCommit", containerInfo);
  },

  createInstance(
    type,
    _props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    console.log(
      "createInstance",
      type,
      _props,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    );
    //locate instance in DocxType
    const instance = DocxTypes[type];
    // sanitise children away from props
    const { children = [], props = {} } = _props;
    if (instance) {
      /// in case children are text pass them to constructor
      const text = is.str(children) || is.num(children) ? children : undefined;
      const docxInstacne = new instance({ ...props, text });
      if (type === "document") {
        rootContainerInstance.document = docxInstacne;
      }
      return docxInstacne;
    }
    throw new Error(`${type} is not Docx Element`);
  },

  appendInitialChild(parentInstance, child) {
    console.log("appendInitialChild", parentInstance, child);
    if ("addSection" in parentInstance) {
      if (!child.isSection)
        throw new Error("Document children are must be of Sections");
      parentInstance.addSection({
        properties: child.props,
        children: child.children,
      });
    } else if ("addChildElement" in parentInstance) {
      parentInstance.addChildElement(child);
    }
  },

  finalizeInitialChildren(
    domElement,
    type,
    props,
    rootContainerInstance,
    hostContext
  ) {
    console.log(
      "finalizeInitialChildren",
      domElement,
      type,
      props,
      rootContainerInstance,
      hostContext
    );
    const functionKeys = Object.keys(domElement).filter((k) =>
      is.fun(domElement[k])
    );
    const functionalProps = Object.keys(props).filter(
      (propKey) => propKey in functionKeys
    );
    functionalProps.forEach((propKey) => {});
  },

  prepareUpdate(
    domElement,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    hostContext
  ) {
    console.log(
      "prepareUpdate",
      domElement,
      type,
      oldProps,
      newProps,
      rootContainerInstance,
      hostContext
    );
    return [null];
  },

  shouldSetTextContent(type, props) {
    return (
      type === "textrun" &&
      (typeof props.children === "string" || typeof props.children === "number")
    );
  },

  shouldDeprioritizeSubtree(type, props) {
    console.log("shouldDeprioritizeSubtree", type, props);
    return false;
  },
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    console.log(
      "createTextInstance",
      text,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    );
    return text;
  },

  now: Date.now(),

  isPrimaryRenderer: true,
  scheduleDeferredCallback: "",
  cancelDeferredCallback: "",

  // -------------------
  //     Mutation
  // -------------------

  supportsMutation: true,

  commitMount(domElement, type, newProps, internalInstanceHandle) {},

  commitUpdate(
    domElement,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
  ) {},

  resetTextContent(domElement) {},

  commitTextUpdate(textInstance, oldText, newText) {},

  appendChild(parentInstance, child) {},

  appendChildToContainer(container, child) {},

  insertBefore(parentInstance, child, beforeChild) {},

  insertInContainerBefore(container, child, beforeChild) {},

  removeChild(parentInstance, child) {},

  removeChildFromContainer(container, child) {},
};
const DocxRenderer = ReactReconciler(hostConfig);

let internalContainerStructure;
export default {
  render(elements, containerNode, callback) {
    // We must do this only once
    if (!internalContainerStructure) {
      internalContainerStructure = DocxRenderer.createContainer(
        containerNode,
        false,
        false
      );
    }

    DocxRenderer.updateContainer(
      elements,
      internalContainerStructure,
      null,
      callback
    );
  },
};
