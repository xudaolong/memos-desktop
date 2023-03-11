import { spawn } from 'child_process';
import { app } from 'electron';
import fs from 'fs';
import { join } from 'path';

class Memos {
  constructor() {}

  getBinName () {
    return process.platform === 'win32' ? 'memos.exe' : 'memos';
  }

  getMemosBin() {
    return process.env.NODE_ENV === 'development'
      ? join(process.cwd(), `/release/app/bin/${this.getBinName()}`)
      : join(process.resourcesPath, `/app/bin/${this.getBinName()}`);
  }

  // 保存到我的文档中
  getFolderPath() {
    const folderPath = join(
      app.getPath('documents'),
      `/memos-${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`
    );

    // 如果文件夹不存在则创建
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    return folderPath;
  }

  run() {
    // 运行memos实例
    const memos = spawn(
      this.getMemosBin(),
      [`--port=8081`, `--data=${this.getFolderPath()}`],
      {
        detached: true,
        stdio: 'ignore',
      }
    );

    // 监听子进程的退出事件
    memos.on('close', (code) => {
      console.log(`【memos】进程退出, 退出码:${code}`);
    });

    // electron 应用退出时，关闭子进程
    app.on('quit', () => {
      memos.kill();
      console.log(`【memos】应用退出了`);
    });
  }
}

const memos = new Memos();

export { memos };
