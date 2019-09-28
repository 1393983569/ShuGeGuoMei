import defaultSettings from '@/settings'

const title = defaultSettings.title || '蔬哥果妹'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
