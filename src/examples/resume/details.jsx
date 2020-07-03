import React from "react";
import { useResume } from "./hooks";
import { SidebarSection } from "./section";
import { STYLES } from "./styles";

const isPresent = require("./utils/is-present");
const formatAddress = require("./utils/format-address");

export const Details = () => {
  const { i18n } = useResume();
  return (
    <SidebarSection title={i18n.t("details")}>
      <Contacts />
      <BirthInfo />
      <Nationality />
      <DrivingLicense />
    </SidebarSection>
  );
};

const Contacts = () => {
  const { resume } = useResume();
  const { phoneNumber, email } = resume;
  const address = formatAddress(resume);
  // hold my beer
  let counter = 0;
  const checkCounter = () => (counter > 0 ? { break: true } : {});
  return (
    <p>
      {isPresent(address) && <t {...checkCounter()}>{address}</t> && counter++}
      {isPresent(phoneNumber) && <t {...checkCounter()}>{phoneNumber}</t> &&
        counter++}
      {isPresent(email) && <t {...checkCounter()}>{email}</t> && counter++}
    </p>
  );
};

const BirthInfo = () => {
  const { resume, i18n } = useResume();
  const { birthDate, birthPlace } = resume;
  let title = "";

  if (isPresent(birthDate)) {
    title = i18n.t("date_of_birth");
  }

  if (isPresent(birthPlace)) {
    title = i18n.t("place_of_birth");
  }

  if (isPresent(birthDate) && isPresent(birthPlace)) {
    title = i18n.t("date_and_place_of_birth");
  }

  if (!title) return null;

  // hold my beer
  let counter = 0;
  const checkCounter = () => (counter > 0 ? { break: true } : {});
  return (
    <>
      <p style={STYLES.h4}>{title}</p>
      <p>
        {isPresent(birthDate) && <t {...checkCounter()}>{birthDate}</t> &&
          counter++}
        {isPresent(birthPlace) && <t {...checkCounter()}>{birthPlace}</t> &&
          counter++}
      </p>
    </>
  );
};

const Nationality = () => {
  const { resume, i18n } = useResume();
  if (!isPresent(resume.nationality)) return null;

  return (
    <>
      <p style={STYLES.h4}>{i18n.t("nationality")}</p>
      <p>{resume.nationality}</p>
    </>
  );
};

const DrivingLicense = () => {
  const { resume, i18n } = useResume();
  if (!isPresent(resume.drivingLicense)) return null;

  return (
    <>
      <p style={STYLES.h4}>{i18n.t("driving_license")}</p>
      <p>{resume.drivingLicense}</p>
    </>
  );
};
