import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"works">;
export type Industry = Project["data"]["industry"];

export const INDUSTRY_ORDER: Industry[] = ["legal", "salud", "tecnologia"];

export const INDUSTRY_LABELS: Record<Industry, string> = {
  legal: "Legal",
  salud: "Salud",
  tecnologia: "Tecnología",
};

const byMostRecent = (a: Project, b: Project) =>
  b.data.pubDate.getTime() - a.data.pubDate.getTime();

const mostRecent = (projects: Project[]) =>
  projects.reduce((latest, project) =>
    project.data.pubDate.getTime() > latest.data.pubDate.getTime() ? project : latest,
  );

export const getIndustriesWithProjects = async () => {
  const allProjects = await getCollection("works");

  return INDUSTRY_ORDER.map((industry) => ({
    industry,
    label: INDUSTRY_LABELS[industry],
    projects: allProjects
      .filter((project) => project.data.industry === industry)
      .sort(byMostRecent),
  })).filter((group) => group.projects.length > 0);
};

export const getSitewideDefaultProject = async () => {
  const allProjects = await getCollection("works");
  const featuredProjects = allProjects.filter((project) => project.data.featured);

  return mostRecent(featuredProjects.length ? featuredProjects : allProjects);
};

export const getIndustryDefaultProject = async (industry: Industry) => {
  const allProjects = await getCollection("works");
  const industryProjects = allProjects.filter((project) => project.data.industry === industry);
  const featuredInIndustry = industryProjects.filter((project) => project.data.featured);

  return mostRecent(featuredInIndustry.length ? featuredInIndustry : industryProjects);
};
