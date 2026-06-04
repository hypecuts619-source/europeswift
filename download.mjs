import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';

const url = 'https://github.com/hypecuts619-source/europeswift/archive/refs/heads/main.zip';
const zipPath = path.join(process.cwd(), 'main.zip');

https.get(url, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
            const file = fs.createWriteStream(zipPath);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Download completed.');
                // We don't have unzip available naturally maybe, but can use npx extract-zip or similar
                // Actually let's just write this to file and use npx to extract.
            });
        });
    } else {
        const file = fs.createWriteStream(zipPath);
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Download completed.');
        });
    }
}).on('error', (err) => {
    console.error('Error downloading: ', err);
});
