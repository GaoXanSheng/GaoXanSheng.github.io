export interface Project {
  title: string
  url: string
  meta: string
  desc: string
}

export const projects: Project[] = [
  {
    title: 'JiaolongControl',
    url: 'https://github.com/GaoXanSheng/JiaolongControl',
    meta: 'C# / Electron · 60 ★',
    desc: '给【蛟龙 16PRO】7945HX + RTX 4060 写的一套硬件控制台。',
  },
  {
    title: '笼中物',
    url: 'https://yunmouren.top/CagedBird/',
    meta: 'Three.js / cannon-es · 单文件 0.63 MB',
    desc: '先生，请问你看到我的鸟了吗？',
  },
  {
    title: '塔栗 Dari',
    url: 'https://talidari.com',
    meta: 'Nuxt 4 / Cloudflare',
    desc: '有一段时间挺喜欢的V，做了宣传站：棉花糖匿名信箱、档案记事时间线、局内野史八卦。',
  },
  {
    title: 'CraftBrowser',
    url: 'https://github.com/GaoXanSheng/CraftBrowser',
    meta: 'Java / C++ / TypeScript',
    desc: '把 Chromium 嵌进 Minecraft 的一次尝试：Fabric / Forge 双端模组，大概有复活的可能性吧。',
  },
]
