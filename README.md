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

## 研究图片

四个项目各有三张图片，保存在 `assets/`。`content.js` 中每个项目的 `images` 数组包含图片路径、尺寸、中英文标题、替代文字、图注与出处；增加或替换图片只需更新该数组。

WG-IDENT 保留 Fig. D.5 的概览图，补充方法流程与 Fig. 8 的 KS 变系数恢复结果。PriorIDENT 使用方法示意、Fig. 3 三体轨迹与 Fig. 7 浅水方程实验。测试函数项目使用相关 WG-IDENT Fig. 1–3 及第 4.2 节的理论关系。实验曲线和曲面均保留论文原图，示意图单独标注。

Crypto Alpha Terminal 使用实际项目界面的宏观资金、风险监控与多智能体配置截图；图注注明截图状态，未生成分析输出。画面中的市场数值不是实时数据。

图片支持上一张、下一张、页码、左右方向键和手机横向滑动，没有自动播放。切换语言会保留各项目当前页码；图片和“查看完整图片”链接可在新标签页查看原尺寸图片。

## 工作与教育标志

`assets/logos/` 保存公司与学校的官方 logo，出处见该目录的 `SOURCES.md`。工作和教育条目的 `logo` 字段包含图片路径及原始比例；可选 `theme` 用于白色标志的深色背景。更新经历时可沿用这一格式。

## 报告照片

`assets/photos/` 保存 Cheng Tang 提供的真实报告和交流照片。`cheng-tang-presentation.webp` 用于首页人物照片；其余五张照片统一显示在“会议与学术交流”栏目下方的照片区，在 `content.js` 的 `conferencePhotos` 数组中维护路径、尺寸、中英文替代文字和图注。会议记录本身不插入照片。照片区保留完整画面，点击可在新标签页查看大图。素材只做自动方向校正、等比例缩放与 WebP 压缩，没有生成或重绘人物、背景。


## 访问地图

页脚上方的 MapMyVisitors 地图显示累计 Pageviews，点击地图或“查看详细统计”可打开 https://mapmyvisitors.com/web/1c8od 。此统计项目仅对应 https://chengtang1205.github.io/tangresearch-ai/ ，访问数据从 2026-10-06 接入后开始累积，不能还原此前访问。

使用服务生成的 480×247 图片代码，以避免引入外部 JavaScript；图片请求用于计数，因此保留 `loading="eager"`，不要改成延迟加载。图像按容器宽度等比例显示，服务不可用时显示提示并保留统计链接。地图图片由服务实时提供，不是保存在仓库中的静态图片。地图参数 `d` 是公开嵌入标识，仓库不包含账户凭证。

公开统计页中的“Visitors' IP addresses → Show to all”和“Referrer Information → Show to all”保持关闭。服务仍会处理访客 IP、浏览器和访问相关信息；网站底部链接至其隐私政策。账户所有者可登录 MapMyVisitors 的 My Websites → Settings 管理统计项目。
