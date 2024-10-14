'use client'

import { AppName } from '@/app/apps'
import { PageHeader } from '@/app/partials/PageHeader'
import { Frame, ContentContainer } from '@/partials'

export default function QuotesLibrary() {
  return (
    <Frame title={AppName.QuoteLibrary} disablePadding>
      <PageHeader appName={AppName.QuoteLibrary} />
      <ContentContainer>
        <span>Quote Library Content</span>
      </ContentContainer>
    </Frame>
  )
}
