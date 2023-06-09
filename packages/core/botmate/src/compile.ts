import tsUtils from '@botmate/typescript-utils';

async function compile(dir?: string) {
  const appDir = dir || process.cwd();
  const isTSProject = await tsUtils.isUsingTypeScript(appDir);
  const outDir = await tsUtils.resolveOutDir(appDir);

  if (isTSProject) {
    await tsUtils.compile(appDir, {
      watch: false,
      configOptions: { options: { incremental: true } },
    });
  }

  const distDir = isTSProject ? outDir : appDir;

  return { appDir, distDir };
}

export default compile;
