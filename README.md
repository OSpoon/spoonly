# Spoonly 🥄

Digital artisan portfolio and technical blog built with **Astro** and **Keystatic Cloud**.

## 🚀 技术栈

- **框架:** [Astro 6](https://astro.build/) (SSR 模式)
- **CMS:** [Keystatic Cloud](https://keystatic.io/) (GitHub 托管模式)
- **样式:** Vanilla CSS + Fraunces & Plus Jakarta Sans 字体
- **部署:** [Vercel](https://vercel.com/)
- **功能:** Markdown 博客、项目展示、数字书签、关于页面、实时预览

## 🛠️ 本地开发

1. **安装依赖:**
   ```bash
   pnpm install
   ```

2. **启动开发服务器:**
   ```bash
   pnpm dev
   ```

3. **管理内容:**
   本地运行后，访问 `http://localhost:4321/keystatic` 进入管理后台。在本地模式下，修改会直接保存到本地文件。

## 📝 内容管理

项目采用 **Keystatic Cloud** 进行线上内容管理。

- **管理后台:** [spoonly.cn/keystatic](https://spoonly.cn/keystatic)
- **存储模式:** 
  - **本地模式 (Dev):** 直接读写 `src/content` 和 `src/data`。
  - **云端模式 (Prod):** 通过 Keystatic Cloud 授权，修改后直接向 GitHub 提交 Commit。

## 📁 目录结构

- `src/content/blog/`: 博客文章 (.md)
- `src/data/`: 结构化数据 (projects.json, bookmarks.json, settings.json)
- `public/assets/blog/`: 博客配图存放目录
- `keystatic.config.ts`: CMS 字段与配置定义

## 🌐 部署说明

项目部署在 Vercel，使用 `@astrojs/vercel` 适配器处理服务端逻辑。

- **构建命令:** `pnpm build`
- **发布目录:** `dist`


---

Built with elegance by [OSpoon](https://github.com/OSpoon).
