import fs from 'fs';
import path from 'path';

/**
 * Scans a directory and returns an array of relative paths to the public content
 * @param directory the directory to scan for public content
 * @returns an array of relative paths to the public content
 */
export function getPublicContents(directory: string): string[] {
    directory = directory.replace(/^\/|\/$|^\\|\\$/g, '');

    const publicPrefix = '/public';
    const directoryPath = path.join(__dirname, `${publicPrefix}\\${directory}`);

    try {
        const files = fs.readdirSync(directoryPath);
        // Filter out private files that start with an underscore
        const publicFiles = files.filter((file) => !file.startsWith('_'));
        // Map the file names to their relative paths
        const relativePaths = publicFiles.map((file) => `/${directory}/${file}`);
        return relativePaths;
    } catch (err) {
        console.error(`Unable to scan directory: ${err}`);
        return [];
    }
}
