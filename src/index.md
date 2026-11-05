---

layout: home

hero:
  name: Phira
  text: Phigros 二创社区
  actions:
    - theme: brand
      text: 帮助
      link: help/
    - theme: alt
      text: 多人联机服务器状态
      link: "https://phira.dmocken.top/status/"
    - theme: alt
      text: Github
      link: "https://github.com/Teamflos/Phira"
  image:
      src: /favicon.png
      alt: Phira

features:
  - icon:
      src: /svg/gamepad.svg
      alt: 新手入门
      width: '48'
      height: '48'
    title: 新手入门
    details: 下载安装、注册登录、账号绑定，快速开始游玩 Phira
  - icon:
      src: /svg/book.svg
      alt: 常见问题
      width: '48'
      height: '48'
    title: 常见问题
    details: 安装、在线服务、联机、资源包、鸿蒙侧载等问题自助排查
  - icon:
      src: /svg/tools.svg
      alt: 联机搭建
      width: '48'
      height: '48'
    title: 联机搭建
    details: Termux、Windows、Linux 多平台多人服务器部署教程

---

<style>
.VPHero {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 50vh !important;
  flex-direction: row !important;
}

.VPHero .container {
  display: flex !important;
  flex-direction: row !important;
  width: 100% !important;
  gap: 2rem !important;
  align-items: center !important;
}

.VPHero .main {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: center !important;
}

.VPHero .main .heading {
  transform: none !important;
}

.VPHero .main .actions {
  margin-top: 1.5rem !important;
}

.VPHero .image {
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transform: none !important;
}

.VPHero .image img {
  max-width: 300px !important;
  border-radius: 12px !important;
}

@media (max-width: 768px) {
  .VPHero .container {
    flex-direction: column !important;
  }

  .VPHero .main {
    align-items: center !important;
  }

  .VPHero .image {
    order: -1 !important;
  }

  .VPHero .image img {
    max-width: 200px !important;
  }
}
</style>