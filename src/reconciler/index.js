import ReactReconciler from "react-reconciler";
import * as Docx from "docx";

import { is } from "utils/is.js";
import { DocxTypes } from "reconciler/elements.js";

const emptyObject = {};
const hostConfig = {
  // _props contain raw react children
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
    const { children = [], props = {} } = _props;
    if (classConstructor) {
      /// for textrun element with singular text child we pass text arg
      const text =
        classConstructor.name === "TextRun" &&
        (is.str(children) || is.num(children))
          ? children
          : undefined;
      const docxInstacne = new classConstructor({ ...props, text });
      if (type === "document") {
        if (rootContainerInstance.context_document)
          throw new Error("Document instance must be singular to React Tree");
        rootContainerInstance.document = docxInstacne;
        hostContext.context_document = docxInstacne;
      }
      return docxInstacne;
    }
    throw new Error(`${type} is not Docx Element`);
  },

  // both parentInstance and child are types of host elements (DOCX objects)
  appendInitialChild(parentInstance, child) {
    if ("addSection" in parentInstance) {
      if (!child.type === "section")
        throw new Error("Document children must be of Sections");
      parentInstance.addSection({
        properties: child.props,
        children: child.children,
      });
    } else if ("addChildElement" in parentInstance) {
      parentInstance.addChildElement(child);
    } else {
      throw new Error(
        `${JSON.stringify(
          parentInstance
        )} does not have any methods to append a child`
      );
    }
  },

  // asks us if CreateTextInstance must be called for text content of that element
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

  /// Docx doesn't provide straightforward way to mutate elements outside constructor
  finalizeInitialChildren(
    domElement,
    type,
    props,
    rootContainerInstance,
    hostContext
  ) {
    ///
    /// saving console.log to possible track callback in the future
    ///
    /*console.log(
      "finalizeInitialChildren",
      domElement,
      type,
      props,
      rootContainerInstance,
      hostContext
    );*/
  },

  /// no need for that so far
  getRootHostContext(rootContainerInstance) {
    return emptyObject;
  },
  // or that
  getChildHostContext(parentHostContext, type, rootContainerInstance) {
    return emptyObject;
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
    console.log("shouldDeprioritizeSubtree", type, props);
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

export default {
  render(elements, containerNode, callback) {
    if (!containerNode || !is.obj(containerNode))
      throw new Error("containerNode must be an empty object");
    // We must do this only once
    if (!containerNode.__internalContainerStructure) {
      containerNode.__internalContainerStructure = DocxRenderer.createContainer(
        containerNode,
        false,
        false
      );
    }

    DocxRenderer.updateContainer(
      elements,
      containerNode.__internalContainerStructure,
      null,
      callback
    );
  },
};
