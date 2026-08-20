import { notFound } from 'next/navigation'
import { guideMetadata } from '@/lib/page-metadata'
import {
  getEnterpriseResource,
} from '@/lib/enterprise-experiences'
import { EnterpriseExperiencePage } from '@/components/enterprise/EnterpriseExperiencePage'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const resource = getEnterpriseResource('floorplans', resolved.slug)

  if (!resource) {
    return guideMetadata(
      'Enterprise floorplan',
      'Explore enterprise floorplan guidance and implementation structure.',
      '/enterprise/floorplans',
    )
  }

  return guideMetadata(
    resource.title,
    resource.overview[0] ?? `${resource.title} floorplan documentation for enterprise teams.`,
    `/enterprise/floorplans/${resource.slug}`,
  )
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const resource = getEnterpriseResource('floorplans', resolved.slug)

  if (!resource) {
    notFound()
  }

  return (
    <EnterpriseExperiencePage
      breadcrumb={['Enterprise', 'Floorplans', resource.title]}
      resource={resource}
    />
  )
}
