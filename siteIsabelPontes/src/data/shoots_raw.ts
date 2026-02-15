import manifest from '@/utils/manifest2';

type Projects = {
  projectName: string;
  photoshoots: Record<string, string[]>;
};

export default function photoshoots(): Projects[] {
  const rawProjects: Projects[] = [];

  const BASE = import.meta.env.VITE_R2_PUBLIC_BASE;
  const projects = manifest.projects;

  for (const projectName in projects) {
    if (!Object.prototype.hasOwnProperty.call(projects, projectName)) continue;

    const shootsObj = projects[projectName as keyof typeof projects];
    const photoshoots: Record<string, string[]> = {};

    for (const shootName in shootsObj) {
      if (!Object.prototype.hasOwnProperty.call(shootsObj, shootName)) continue;

      const files = shootsObj[shootName as keyof typeof shootsObj] as string[];

      const imageUrls = files.map((fileName) => {
        const normalized = fileName.startsWith('/')
          ? fileName.slice(1)
          : fileName;

        return `${BASE}/${projectName}/${shootName}/${normalized}`;
      });

      photoshoots[shootName] = imageUrls;
    }

    rawProjects.push({
      projectName,
      photoshoots,
    });
  }

  console.log('Raw Projects:', rawProjects);
  return rawProjects;
}
