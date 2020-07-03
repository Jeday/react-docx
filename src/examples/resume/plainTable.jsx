import React from "react";

export const PlainTable = ({ children, ...props }) => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    ref.current.properties.root[1] = [];
  }, []);
  return (
    <table ref={ref} {...props}>
      {children}
    </table>
  );
};
