import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
	head: Component.Head(),
	header: [],
	afterBody: [],
	footer: Component.Footer({
		links: {
			"📧 Mail": "mailto:philipp@von-neumann.com",
			"🦣 Mastodon": "https://sonomu.club/@PvN",
			"🦋 Bluesky": "https://bsky.app/profile/von-neumann.com",
			"🔊 Soundcloud": "https://soundcloud.com/phvon",
			"🏛️ Impressum": "https://www.von-neumann.com/Impressum/20250425220336-impressum_website"
			// GitHub: "https://github.com/jackyzha0/quartz",
			// "Discord Community": "https://discord.gg/cRFFHYye7t",

		},
	}),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
	beforeBody: [
		Component.ConditionalRender({
			component: Component.Breadcrumbs(),
			condition: (page) => page.fileData.slug !== "index",
		}),
		Component.ConditionalRender({
			component: Component.ArticleTitle(),
			condition: (page) =>
				page.fileData.slug !== "index" &&
				page.fileData.slug !== "20250425152452-selected_works_performances" &&
				page.fileData.slug !== "20250425153841-audio_video_website" &&
				page.fileData.slug !== "20250425154954-contact_links_webseite" &&
				page.fileData.slug !== "20250314152711-webseite_von_neumann_com_about",
		}),
		Component.ConditionalRender({
			component: Component.ContentMeta(),
			condition: (page) =>
				page.fileData.slug !== "index" &&
				page.fileData.slug !== "20250425152452-selected_works_performances" &&
				page.fileData.slug !== "20250425153841-audio_video_website" &&
				page.fileData.slug !== "20250425154954-contact_links_webseite" &&
				page.fileData.slug !== "20250314152711-webseite_von_neumann_com_about",
		}),
	],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.DesktopOnly(Component.Search()),
		//  Component.Darkmode(),
			Component.Explorer({
				title: "Navigation",
				folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
				filterFn: (node) => {
					// set containing names of everything you want to filter out
					const omit = new Set(["impressum", "tags", "advanced"])
 
					// can also use node.slug or by anything on node.data
					// note that node.data is only present for files that exist on disk
					// (e.g. implicit folder nodes that have no associated index.md)
					return !omit.has(node.displayName.toLowerCase())
				},
				sortFn: (a, b) => {
					const nameOrderMap: Record<string, number> = {
						"Essays": 10,
						"Project": 10,
						"Notes": 10,
					}

					let orderA = 0
					let orderB = 0

					if (a.file && a.file.slug) {
						orderA = nameOrderMap[a.file.slug] || 0
					} else if (a.name) {
						orderA = nameOrderMap[a.name] || 0
					}

					if (b.file && b.file.slug) {
						orderB = nameOrderMap[b.file.slug] || 0
					} else if (b.name) {
						orderB = nameOrderMap[b.name] || 0
					}

					return orderA - orderB
				},
			}),
		Component.ConditionalRender({
			component: Component.DesktopOnly(Component.RecentNotes({ title: "Recent" }),),
			condition: (page) => page.fileData.slug == "index",
		})
	],
	right: [
		Component.ConditionalRender({
			component: Component.DesktopOnly(Component.Graph()),
			condition: (page) => page.fileData.slug !== "index",
		}),		
		Component.ConditionalRender({
			component: Component.TagList(),
			condition: (page) =>
				page.fileData.slug !== "index" &&
				page.fileData.slug !== "20250425152452-selected_works_performances" &&
				page.fileData.slug !== "20250425153841-audio_video_website" &&
				page.fileData.slug !== "20250425154954-contact_links_webseite" &&
				page.fileData.slug !== "20250314152711-webseite_von_neumann_com_about",
		}),		
		Component.ConditionalRender({
			component: Component.DesktopOnly(Component.TableOfContents()),
			condition: (page) =>
				page.fileData.slug !== "index" &&
				page.fileData.slug !== "20250425152452-selected_works_performances" &&
				page.fileData.slug !== "20250425153841-audio_video_website" &&
				page.fileData.slug !== "20250425154954-contact_links_webseite" &&
				page.fileData.slug !== "20250314152711-webseite_von_neumann_com_about",
		}),
		Component.DesktopOnly(Component.Backlinks()),

	],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
	beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.Search(),
		//   Component.Darkmode(),
		Component.Explorer({
			title: "Navigation",
			folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
			sortFn: (a, b) => {
				const nameOrderMap: Record<string, number> = {
					"Essays": 100,
					"Project": 200,
					"Notes": 201,
				}

				let orderA = 0
				let orderB = 0

				if (a.file && a.file.slug) {
					orderA = nameOrderMap[a.file.slug] || 0
				} else if (a.name) {
					orderA = nameOrderMap[a.name] || 0
				}

				if (b.file && b.file.slug) {
					orderB = nameOrderMap[b.file.slug] || 0
				} else if (b.name) {
					orderB = nameOrderMap[b.name] || 0
				}

				return orderA - orderB
			},
		})
	],
	right: [],
}
