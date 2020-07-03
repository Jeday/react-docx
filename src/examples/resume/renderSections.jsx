import React from "react";
import { useResume } from "./hooks";
import { Section, SidebarSection } from "./section";
import { Сard, ReferenceCard } from "./card";
import { Skill } from "./skill";
import { RichText } from "./richText";

const iconsBuffers = require("./icons");
const { STYLES } = require("./styles");
const multiJoin = require("./utils/multi-join");
const LodashFind = require("lodash/find");

export const RenderSection = ({ section }) => {
  const { i18n, resume, config } = useResume();
  switch (section.sectionType) {
    case "activities":
      return (
        <Section
          title={i18n.t("extra_curricular_activities")}
          iconBuffer={iconsBuffers.activities}
        >
          {section.items.map((item) => (
            <Сard
              key={item.id}
              title={multiJoin(
                [item.title, item.employer, item.city],
                [i18n.t("at"), ", "]
              )}
              subtitle={"datedatedate"}
              content={item.description}
            />
          ))}
        </Section>
      );
    case "courses":
      return (
        <Section title={i18n.t("courses")}>
          {section.items.map((item) => (
            <Сard
              key={item.id}
              title={multiJoin([item.course, item.institution], [", "])}
              subtitle={"datedatedate"}
            />
          ))}
        </Section>
      );
    case "educations":
      return (
        <Section
          title={i18n.t("education")}
          iconBuffer={iconsBuffers.educations}
        >
          {section.items.map((item) => (
            <Сard
              key={item.id}
              title={multiJoin(
                [item.degree, item.school, item.city],
                [", ", ", "]
              )}
              subtitle={"datedatedate"}
            />
          ))}
        </Section>
      );
    case "workExperiences":
      return (
        <Section
          title={i18n.t("work_experience")}
          iconBuffer={iconsBuffers.workExperiences}
        >
          {section.items.map((item) => (
            <Сard
              key={item.id}
              title={multiJoin(
                [item.title, item.employer, item.city],
                [i18n.t("at"), ", "]
              )}
              subtitle={"datedatedate"}
            />
          ))}
        </Section>
      );
    case "references":
      return (
        <Section
          title={i18n.t("references")}
          iconBuffer={iconsBuffers.references}
        >
          {resume.referencesUponRequest ? (
            <p style={STYLES.h2}>{i18n.t("references_upon_request")}</p>
          ) : (
            section.items.map((item) => (
              <ReferenceCard key={item.id} {...item} />
            ))
          )}
        </Section>
      );
    case "internships":
      return (
        <Section title={i18n.t("internships")}>
          {section.items.map((item) => (
            <Сard
              key={item.id}
              title={multiJoin(
                [item.title, item.employer, item.city],
                [i18n.t("at"), ", "]
              )}
              subtitle={"datedatedate"}
              content={item.description}
            />
          ))}
        </Section>
      );
    case "profile":
      return (
        <Section title={i18n.t("profile")} iconBuffer={iconsBuffers.profile}>
          <RichText html={section.value} />
        </Section>
      );
    case "custom":
      return (
        <Section title={section.title} iconBuffer={iconsBuffers.custom}>
          {section.items.map((item) => (
            <Сard
              key={item.id}
              title={multiJoin([item.title, item.city], [", "])}
              subtitle={"datedatedate"}
              content={item.description}
            />
          ))}
        </Section>
      );
    case "hobbies":
      return (
        <SidebarSection title={i18n.t("hobbies")}>
          {section.items.map((item) => (
            <p key={item.id}>{item.hobby}</p>
          ))}
        </SidebarSection>
      );
    case "languages":
      return (
        <SidebarSection title={i18n.t("languages")}>
          {section.items.map((item) => {
            const { languageLevels } = config;
            const showLevel = item.level && item.level !== "hidden";
            const level = showLevel
              ? LodashFind(languageLevels, { name: item.level })
              : null;

            return (
              <Skill
                key={item.id}
                skill={item.language}
                rating={level && level.rating}
                color={resume.color}
              />
            );
          })}
        </SidebarSection>
      );
    case "skills":
      return (
        <SidebarSection title={i18n.t("skills")}>
          {section.items.map((item) => {
            const { skillLevels } = config;
            const { hideSkillLevel } = resume;
            const showLevel =
              item.level && item.level !== "hidden" && !hideSkillLevel;
            const level = showLevel
              ? LodashFind(skillLevels, { name: item.level })
              : null;

            return (
              <Skill
                key={item.id}
                skill={item.skill}
                rating={level && level.rating}
                color={resume.color}
              />
            );
          })}
        </SidebarSection>
      );

    case "socialProfiles":
      return (
        <SidebarSection title={i18n.t("social_profiles")}>
          {section.items.map((item) => (
            <p key={item.id}>
              <href src={item.link} label={item.label} />
            </p>
          ))}
        </SidebarSection>
      );
    default:
      return null;
  }
};
