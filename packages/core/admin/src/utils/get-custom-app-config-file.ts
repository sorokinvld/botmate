import { join } from 'path';
import fse from 'fs-extra';

/**
 * Retrieve the custom admin entry file name
 * @param {String} dir - Directory of the admin panel
 * @returns String
 */
const getCustomAppConfigFile = async (dir: string) => {
	const adminSrcPath = join(dir, 'src', 'admin');

	if (!fse.pathExistsSync(adminSrcPath)) {
		return undefined;
	}

	const useTypeScript = false; // await isUsingTypeScript(adminSrcPath, 'tsconfig.json');

	const files = await fse.readdir(adminSrcPath);

	const appJsx = files.find((file) => /^app.jsx?$/.test(file));
	const appTsx = files.find((file) => /^app.tsx?$/.test(file));

	if (useTypeScript) {
		return appTsx || appJsx;
	}

	return appJsx;
};

export default getCustomAppConfigFile;
