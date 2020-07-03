import React from "react";

const resumeContext = React.createContext({});
/// hook to access resume data and config
export const useResume = React.useContext.bind(undefined, resumeContext);
export const ResumeProvder = ({ resume, config, i18n, children }) => {
  return (
    <resumeContext.Provider value={{ resume, i18n, config }}>
      {children}
    </resumeContext.Provider>
  );
};
