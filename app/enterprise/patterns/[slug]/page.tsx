import { notFound } from 'next/navigation'
import { guideMetadata } from '@/lib/page-metadata'
import {
  getEnterpriseResource,
} from '@/lib/enterprise-experiences'
import { EnterpriseExperiencePage } from '@/components/enterprise/EnterpriseExperiencePage'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const resource = getEnterpriseResource('patterns', resolved.slug)

  if (!resource) {
    return guideMetadata(
      'Enterprise pattern',
      'Explore enterprise pattern guidance and usage conventions.',
      '/enterprise/patterns',
    )
  }

  return guideMetadata(
    resource.title,
    resource.overview[0] ?? `${resource.title} pattern documentation for enterprise teams.`,
    `/enterprise/patterns/${resource.slug}`,
  )
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const resource = getEnterpriseResource('patterns', resolved.slug)

  if (!resource) {
    notFound()
  }

  return (
    <EnterpriseExperiencePage
      breadcrumb={['Enterprise', 'Patterns', resource.title]}
      resource={resource}
    />
  )
}
