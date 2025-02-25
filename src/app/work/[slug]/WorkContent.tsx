'use client'

interface WorkContentProps {
  title: string
  imageUrl: string
  content: string
  children?: React.ReactNode
}

export default function WorkContent({ title, imageUrl, content, children }: WorkContentProps) {
  return (
    <main className="work-content">
      <article>
        <h1>{title}</h1>
        <img src={imageUrl} alt={title} />
        <div 
          className="content"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        {children}
      </article>

      <style jsx>{`
        .work-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
        }
      `}</style>
    </main>
  )
}
