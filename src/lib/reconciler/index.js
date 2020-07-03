import ReactReconciler from "react-reconciler";
import * as Docx from "docx";

import { is } from "../utils/is.js";
import { DocxTypes } from "./elements.js";

const hostConfig = {
  // _props contain raw react children too
  createInstance(
    type,
    _props,
    rootContainerInstance,
    hostContext
    // internalInstanceHandle -  fiber root, we don't need any react magic for now
  ) {
    //locate instance constructor in DocxTypes
    const classConstructor = DocxTypes[type];
    // sanitise children away from props
    // eslint-disable-next-line no-unused-vars

    const { children = [], ...props } = _props;
    if (classConstructor) {
      const params = {
        text:
          classConstructor.name === "TextRun" &&
          (is.str(children) || is.num(children))
            ? children
            : undefined, /// for textrun element with singular text child we pass text arg
        // all custom params above will be overriden by user props, but below ones won't
        ...props,
        rows: [],
        children: [], // some docx elements require children param
        __document: hostContext.document, // pass document reference for fictive elements
      };

      let docxInstance;
      // either call class constructor or just a function
      try {
        docxInstance = classConstructor.name
          ? new classConstructor(params)
          : classConstructor(params);
      } catch (error) {
        console.error(error);
      }
      /// call functional props
      Object.keys(props)
        .filter((p) => is.fun(docxInstance[p]))
        .forEach((prop) => {
          const propVal = props[prop];
          const propFun = docxInstance[prop];
          docxInstance = is.arr(propVal)
            ? propFun.apply(docxInstance, propVal) // array was passed as prop val so we treat as arguments
            : propFun.call(docxInstance, propVal); // whaterver else was passed is single argument
        });
      return docxInstance;
    }
    throw new Error(`${type} is not Docx Element`);
  },

  // both parentInstance and child are types of host elements (DOCX objects)
  appendInitialChild(parentInstance, child) {
    if ("addChildElement" in parentInstance) {
      parentInstance.addChildElement(child);
    } else {
      throw new Error(
        `${
          parentInstance?.type ??
          parentInstance?.prototype?.constructor.name ??
          parentInstance
        } does not have any methods to append a child`
      );
    }
  },

  // asks us if CreateTextInstance must be called for text content of that specific element
  // for explicit TextRun we return true, so no CreateTextInstance is called
  shouldSetTextContent(type, props) {
    return (
      type === "textrun" &&
      (typeof props.children === "string" || typeof props.children === "number")
    );
  },

  // create implicit TextRun
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return new Docx.TextRun({ text });
  },

  /// we use that to add sections to document we have in our context
  /// in this step all instances are created, and we add fictive section instance to document
  finalizeInitialChildren(
    domElement,
    type,
    _props,
    rootContainerInstance,
    hostContext
  ) {
    const { children, ...props } = _props;
    if (domElement.type === "section" && hostContext.isRootContext) {
      hostContext.document.addSection({
        children: domElement.children,
        properties: props,
      });
    } else if (domElement.type === "section" || hostContext.isRootContext) {
      throw new Error("Section is not a root element or part of root Fragment");
    }
  },

  /// provide document instance to all children
  getRootHostContext(rootContainerInstance) {
    return { document: rootContainerInstance.document, isRootContext: true };
  },
  // this is how we let createInstance know that its a child element
  getChildHostContext(parentHostContext, type, rootContainerInstance) {
    return { ...parentHostContext, isRootContext: false, type };
  },
  // or even that
  getPublicInstance(instance) {
    return instance;
  },

  // pre/post commit callbacks
  prepareForCommit(containerInfo) {},
  resetAfterCommit(containerInfo) {},

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

  shouldDeprioritizeSubtree(type, props) {
    //console.log("shouldDeprioritizeSubtree", type, props);
    return false;
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

const render = (elements, containerNode, callback) => {
  if (!containerNode || !is.obj(containerNode))
    throw new Error("containerNode must be an empty object");
  // We must do this only once
  if (!containerNode.__internalContainerStructure) {
    containerNode.__internalContainerStructure = DocxRenderer.createContainer(
      containerNode,
      false,
      false
    );
    containerNode.document = new Docx.Document();
  }

  DocxRenderer.updateContainer(
    elements,
    containerNode.__internalContainerStructure,
    null,
    callback
  );
};

export const renderAsyncDocument = (options, elements) => {
  const containerNode = {};
  containerNode.document = new Docx.Document(options);

  return new Promise((resolve) => {
    render(elements, containerNode, () => resolve(containerNode.document));
  });
};
