# Cheng Tang — Research & AI

Cheng Tang 的中英双语个人研究主页，展示数学背景、论文、量化与 AI 研究，以及个人项目。

## 发布到 GitHub Pages

网站使用 GitHub 账号 `ChengTang1205`，仓库名为 `tangresearch-ai`。将本目录的文件放在公开仓库根目录，然后在 **Settings → Pages** 中选择 **Deploy from a branch → main → /(root)** 并保存。

主页地址：`https://chengtang1205.github.io/tangresearch-ai/`。发布状态可在仓库的 **Settings → Pages** 中查看。

## 更新内容

- `content.js`：个人介绍、研究方向、论文、会议与学术交流、工作经历、教育经历和项目。新增项目时在 `projects` 数组添加条目，并提供中文和英文内容。新增会议时在 `conferences` 数组中添加日期、会议名称、地点、参与身份及报告题目（如有），按时间倒序排列。
- `index.html`：网页结构。
- `styles.css`：视觉样式。
- `app.js`：中英切换和内容显示。
- `.nojekyll`：直接发布静态文件。

网页使用相对资源路径，可发布在根地址或项目子路径下，不需要安装依赖或执行构建。

本目录只包含公开网页文件，不包含原始简历、Sites 配置、凭证或部署缓存。
