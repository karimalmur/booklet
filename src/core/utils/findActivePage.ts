import { AppPage } from "core/pages"

export default function findActivePage(currentPages: readonly AppPage[], pathname: string): AppPage | null {
  const map: Record<string, AppPage> = {}

  const traverse = (array: readonly AppPage[]) => {
    array.forEach((item) => {
      map[item.pathname] = item
      traverse(item.children || [])
    })
  }

  traverse(currentPages)

  return map[pathname] || null
}
