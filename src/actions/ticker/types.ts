export namespace Ticker {
  export enum ContentType {
    HN = 'HN',
    News = 'News',
  }

  export type Item = {
    id: string
    type: ContentType
    title: string
    url?: string
    timestamp?: string
  }

  export type Content = Item[]
}
