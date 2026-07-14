import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import markdownItTaskCheckbox from 'markdown-it-task-checkbox';
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: { 
    plugins: [
      MermaidPlugin(),
      groupIconVitePlugin({ 
        customIcon: {
          github: localIconLoader(import.meta.url, '../src/public/svg/github.svg'),
        },
      })
    ],
    optimizeDeps: {
      exclude: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
        'vitepress', 
        '@nolebase/ui', 
      ],
      include: ['mermaid'],
    },
    ssr: { 
      noExternal: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        "@nolebase/ui-asciinema", 
        '@nolebase/ui', 
        'mermaid', 
      ], 
    }, 
  }, 
  lang: "zh-Hans",
  srcDir: './src',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['script',{ type: 'text/javascript' },`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vcwukneqc8");`],
    ['script', { src: 'https://u.a.07210700.xyz/script.js' , 'data-website-id': '7431dadf-dee8-4463-9743-340cbc89cdd9' }]
  ],
  themeConfig: {// https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'algolia',
      options: {
        appId: process.env.VITEPRESS_ALGOLIA_APP_ID ?? '',
        apiKey: process.env.VITEPRESS_ALGOLIA_API_KEY ?? '',
        indexName: process.env.VITEPRESS_ALGOLIA_INDEX_NAME ?? '',
        locales: {
          root: {
            searchParameters: {
              facetFilters: ['lang:zh-Hans']
            },
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除',
                  resetButtonAriaLabel: '清除查询',
                  cancelButtonText: '关闭',
                  cancelButtonAriaLabel: '关闭'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '没有找到结果',
                  suggestedQueryText: '可以试试搜索',
                  reportMissingResultsText: '觉得这里应该有结果？',
                  reportMissingResultsLinkText: '告诉我们'
                }
              }
            }
          },
          en: {
            searchParameters: {
              facetFilters: ['lang:en']
            },
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation'
              }
            }
          }
        }
      }
    },
    logo: "/favicon.png",
    externalLinkIcon: true,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bizarre-Team/Phira-Doc' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-Hans',
      dir: 'ltr',
      title: "Phira 文档",
      description: "有关Phira的文档",
      themeConfig: {
        editLink: {
          pattern: 'https://github.com/Bizarre-Team/Phira-Doc/edit/main/src/:path',
          text: '在 GitHub 上编辑此页'
        },
        lastUpdated: {
          text: '更新于',
          formatOptions: {
            dateStyle: 'full',
            timeStyle: 'medium'
          }
        },
        docFooter: {
          prev: '上一个',
          next: '下一个'
        },
        outline: {
          level: [2, 4],
          label: '当前页大纲'
        },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '目录',
        nav: [
          { text: '常见问题', link: '/help/' }
        ],
        sidebar: [
      {
        text: '帮助文档',
        link: '/help/',
      }, 
      {
        text: '常见问题',
        collapsed: true,
        items: [
          { text: '常见问题自助文档', link: '/help/' },
          { text: '鸿蒙 HAP 侧载安装教程', link: '/help/harmony-sideload' },
        ]
      },
      {
        text: 'Phira MP 构建指南',
        collapsed: true,
        items: [
          { text: '教程', link: '/mp_build_guide/' },
          { text: 'Termux（安卓）', link: '/mp_build_guide/Termux' },
          { text: 'Windows', link: '/mp_build_guide/Windows' },
          { text: 'Linux', link: '/mp_build_guide/Linux' },
        ]
      }
    ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      dir: 'ltr',
      title: "Phira Documentation",
      description: "Documentation for Phira",
      themeConfig: {
        editLink: {
          pattern: 'https://github.com/OrbiterStellarTrek/Phira-Doc/edit/main/src/:path',
          text: 'Edit this page on GitHub'
        },
        lastUpdated: {
          text: 'Updated',
          formatOptions: {
            dateStyle: 'full',
            timeStyle: 'medium'
          }
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        outline: {
          level: [2, 4],
          label: 'On this page'
        },
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Contents',
        nav: [
          { text: 'Help', link: '/en/help' },
          { text: 'FAQ', link: '/en/help/' }
        ],
        sidebar: [
          { text: 'Help', link: '/en/help' },
          {
            text: 'FAQ',
            collapsed: true,
            items: [
              { text: 'FAQ Home', link: '/en/help/' },
              { text: 'HarmonyOS HAP Sideloading Guide', link: '/en/help/harmony-sideload' },
            ]
          },
          {
            text: 'Phira MP Build Guide',
            collapsed: true,
            items: [
              { text: 'Guide', link: '/en/mp_build_guide/' },
              { text: 'Termux (Android)', link: '/en/mp_build_guide/Termux' },
              { text: 'Windows', link: '/en/mp_build_guide/Windows' },
              { text: 'Linux', link: '/en/mp_build_guide/Linux' },
            ]
          }
        ],
      },
    }
  },
  markdown: {
    config(md) {
      md.use(MermaidMarkdown);
      md.use(markdownItTaskCheckbox); //todo
      md.use(groupIconMdPlugin) //代码组图标
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'es':
              return 'Copiar código'
            case 'fa':
              return 'کپی کد'
            case 'ko':
              return '코드 복사'
            case 'pt':
              return 'Copiar código'
            case 'ru':
              return 'Скопировать код'
            case 'zh':
              return '复制代码'
            case 'ja':
              return 'コードをコピー'
            default:
              return 'Copy code'
          }
        })()
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        )
      }
    },
  },
  sitemap: {
    hostname: 'https://docs.dmocken.top/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },
  lastUpdated: true,
})
