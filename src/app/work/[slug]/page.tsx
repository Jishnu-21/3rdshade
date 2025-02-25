import { Metadata } from 'next'
import { generateWorkSchema } from '@/app/utils/schema'
import { generateStructuredBacklinks, generateRelatedContent } from '@/app/utils/backlinks'
import RelatedContent from '@/app/components/RelatedContent'
import WorkContent from './WorkContent'

async function getWork(slug: string) {
  // This would be your API call
  // Mock data for now
  return {
    title: 'Brand Strategy Campaign 2024',
    description: 'Comprehensive brand strategy and digital marketing campaign',
    publishDate: '2024-02-22',
    imageUrl: 'https://3rdshade.com/images/works/brand-strategy-2024.jpg',
    content: 'Detailed case study content...',
    category: 'marketing'
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const work = await getWork(params.slug)
  const relatedContent = generateRelatedContent(params.slug, work.category)
  
  return {
    title: `${work.title} | 3rdShade Marketing Agency`,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      images: [work.imageUrl],
      type: 'article',
      publishedTime: work.publishDate,
      modifiedTime: work.publishDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: work.title,
      description: work.description,
      images: [work.imageUrl],
    },
    alternates: {
      canonical: `https://3rdshade.com/work/${params.slug}`
    }
  }
}

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const work = await getWork(params.slug)
  const workSchema = generateWorkSchema(work)
  const relatedContent = generateRelatedContent(params.slug, work.category)
  const backlinksSchema = generateStructuredBacklinks(params.slug, relatedContent)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(backlinksSchema) }}
      />
      <WorkContent
        title={work.title}
        imageUrl={work.imageUrl}
        content={work.content}
      >
        <RelatedContent 
          currentSlug={params.slug}
          category={work.category}
        />
      </WorkContent>
    </>
  )
}
