import React from "react";
import { useResume } from "./hooks";

const { STYLES } = require("./styles");
const isPresent = require("./utils/is-present");
const multiJoin = require("./utils/multi-join");

export const Сard = (props) => {
  return (
    <>
      {isPresent(props.title) && <p style={STYLES.h2}>{props.title}</p>}
      {isPresent(props.subtitle) && <p style={STYLES.date}>{props.subtitle}</p>}
      {isPresent(props.content) && (
        <p>Здесь должен быть рич текст но я его не сделал еше</p>
      )}
    </>
  );
};

export const ReferenceCard = (props) => {
  const { resume, i18n } = useResume();
  return (
    <>
      <p style={STYLES.h2}>
        {multiJoin([props.name, props.company], [i18n.t("from")])}
      </p>
      {(props.email || props.phone) && (
        <p>
          {props.email && <t color={resume.color}>{props.email}</t>}
          {props.email && props.phone && " · "}
          {props.phone}
        </p>
      )}
    </>
  );
};
