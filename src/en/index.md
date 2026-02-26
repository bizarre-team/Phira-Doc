---

layout: home

hero:
  name: Phira
  text: Phigros Fan Community
  actions:
    - theme: brand
      text: About
      link: /en/README
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
  - icon: 🎮
    title: Chart Making
    details: Complete chart standard documentation, supporting RPE, PE, Official and more formats
  - icon: 📚
    title: Documentation
    details: From beginner to advanced, a full guide covering all modules and features
  - icon: 🛠️
    title: Build Guide
    details: Build instructions for Windows, Linux, and Android to get you started quickly

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


Note: This documentation is based on https://teamflos.github.io/phira-docs/ and has been migrated and revised.
