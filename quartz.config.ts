import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Mycelium",
    pageTitleSuffix: "Philipp von Neumann's Digital Garden",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
//    baseUrl: "",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Sans Condensed",
        body: "IBM Plex Serif",
        code: "IBM Plex Mono",
      },
		colors: {
			lightMode: {
				light: "var(--bg-primary)", // site background
				lightgray: "var(--bg-secondary)", // search background
				gray: "var(--text-secondary)", // date color
				darkgray: "var(--text-primary)", // text color
				dark: "var(--text-secondary)", // node headlines
				secondary: "var(--heading)", // site headlines, links
				tertiary: "var(--link-hover)", // hover color
				highlight: "var(--highlight-bg)", // text highlight backgrounds
				textHighlight: "var(--uchu-green-9)", 
			},
			darkMode: {
				light: "var(--uchu-yin-9)", // site background
				lightgray: "var(--uchu-yin-8)", // search background
				gray: "var(--uchu-yin-8)", // date color
				darkgray: "var(--uchu-yin-5)", // text color
				dark: "var(--uchu-yin-5)", // node headlines
				secondary: "var(--uchu-yin-3)", // site headlines, links
				tertiary: "var(--uchu-yin-9)", // hover color
				highlight: "var(--uchu-yin-6)", // text highlight backgrounds
				textHighlight: "var(--uchu-green-1)", 
			},

        // lightMode: {
        //   light: "#faf8f8",
        //   lightgray: "#e5e5e5",
        //   gray: "#b8b8b8",
        //   darkgray: "#4e4e4e",
        //   dark: "#2b2b2b",
        //   secondary: "#284b63",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#fff23688",
        // },
        // darkMode: {
        //   light: "#161618",
        //   lightgray: "#393639",
        //   gray: "#646464",
        //   darkgray: "#d4d4d4",
        //   dark: "#ebebec",
        //   secondary: "#7b97aa",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#b3aa0288",
        // },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
		Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
		Plugin.OxHugoFlavouredMarkdown(),
		Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
