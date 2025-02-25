import Link from 'next/link'
import { generateRelatedContent } from '../utils/backlinks'

interface RelatedContentProps {
  currentSlug: string;
  category: string;
}

export default function RelatedContent({ currentSlug, category }: RelatedContentProps) {
  const relatedContent = generateRelatedContent(currentSlug, category)

  return (
    <section className="related-content">
      <h2>Related Articles</h2>
      <div className="related-grid">
        {relatedContent.map((content) => (
          <Link 
            href={`/work/${content.slug}`}
            key={content.slug}
            className="related-item"
          >
            <article>
              <h3>{content.title}</h3>
              <span className="category">{content.category}</span>
            </article>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .related-content {
          margin: 4rem 0;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .related-item {
          padding: 1.5rem;
          background: white;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s ease;
          text-decoration: none;
          color: inherit;
        }

        .related-item:hover {
          transform: translateY(-2px);
        }

        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
        }

        .category {
          font-size: 0.9rem;
          color: #666;
          text-transform: capitalize;
        }
      `}</style>
    </section>
  )
}
