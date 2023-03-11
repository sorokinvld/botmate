import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DownloadService {
  async download(
    url: string,
    type: string,
    fileName: string,
    overwrite?: boolean,
  ) {
    mkdirSync(`data/downloads/${type}`, {
      recursive: true,
    });

    const downloadPath = `data/downloads/${type}/${fileName}`;

    if (existsSync(downloadPath) && !overwrite) return;

    const writer = createWriteStream(downloadPath);

    axios
      .get(url, {
        responseType: 'stream',
      })
      .then((response) => {
        response.data.pipe(writer);
      });
  }
}
