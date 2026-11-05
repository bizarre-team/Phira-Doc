---

layout: home

hero:
  name: Phira
  text: A Phigros Fan Community
  actions:
    - theme: brand
      text: Help
      link: /en/help/
    - theme: alt
      text: Multiplayer Server Status
      link: "https://phira.dmocken.top/status/"
    - theme: alt
      text: GitHub
      link: "https://github.com/Teamflos/Phira"
  image:
      src: /favicon.png
      alt: Phira

features:
  - icon:
      src: /svg/gamepad.svg
      alt: Getting started
      width: '48'
      height: '48'
    title: Getting Started
    details: Download, install, register and log in to start playing Phira
  - icon:
      src: /svg/book.svg
      alt: FAQ
      width: '48'
      height: '48'
    title: FAQ
    details: Installation, online services, multiplayer, resource packs, HarmonyOS sideloading and more
  - icon:
      src: /svg/tools.svg
      alt: Server setup
      width: '48'
      height: '48'
    title: Server Setup
    details: Multiplayer server deployment guides for Termux, Windows, and Linux

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