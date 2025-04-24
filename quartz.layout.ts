import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
	head: Component.Head(),
	header: [],
	afterBody: [],
	footer: Component.Footer({
		links: {
			// GitHub: "https://github.com/jackyzha0/quartz",
			// "Discord Community": "https://discord.gg/cRFFHYye7t",

		},
	}),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
	beforeBody: [
		Component.ConditionalRender({
			component: Component.DesktopOnly(Component.Breadcrumbs()),
			condition: (page) => page.fileData.slug !== "index",
		}),		
		Component.ConditionalRender({
			component: Component.ArticleTitle(),
			condition: (page) => page.fileData.slug !== "index",
		}),
		Component.ConditionalRender({
			component: Component.ContentMeta(),
			condition: (page) => page.fileData.slug !== "index",
		}),
		Component.ConditionalRender({
			component: Component.TagList(),
			condition: (page) => page.fileData.slug !== "index",
		}),
	],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.DesktopOnly(Component.Search()),
		//  Component.LinksLeft(),
		//  Component.Darkmode(),
			Component.Explorer({
				title: "Navigation",
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
			condition: (page) => page.fileData.slug !== "Index",
		})
	],
	right: [
		Component.DesktopOnly(Component.Graph()),
		Component.ConditionalRender({
			component: Component.DesktopOnly(Component.TableOfContents()),
			condition: (page) => page.fileData.slug !== "index",
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
