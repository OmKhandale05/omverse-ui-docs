import { notFound } from 'next/navigation'
import { guideMetadata } from '@/lib/page-metadata'
import {
  getEnterpriseResource,
} from '@/lib/enterprise-experiences'
import { EnterpriseExperiencePage } from '@/components/enterprise/EnterpriseExperiencePage'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const resource = getEnterpriseResource('templates', resolved.slug)

  if (!resource) {
    return guideMetadata(
      'Enterprise template',
      'Explore enterprise template guidance and reusable screen structures.',
      '/enterprise/templates',
    )
  }

  return guideMetadata(
    resource.title,
    resource.overview[0] ?? `${resource.title} template documentation for enterprise teams.`,
    `/enterprise/templates/${resource.slug}`,
  )
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const resource = getEnterpriseResource('templates', resolved.slug)

  if (!resource) {
    notFound()
  }

  return (
    <EnterpriseExperiencePage
      breadcrumb={['Enterprise', 'Templates', resource.title]}
      resource={resource}
    />
  )
}
