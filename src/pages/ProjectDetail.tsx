import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { projectsData } from '../i18n/translations'
import AchievementPopup from '../components/ui/AchievementPopup'
import { markProjectVisited } from '../hooks/useQuestSystem'

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

function VideoPlayer({ url }: { url: string }) {
  const ytId = getYouTubeId(url)

  if (ytId) {
    return (
      <div className="w-full rounded-lg overflow-hidden mb-8" style={{ border: '1px solid var(--color-border)', aspectRatio: '16/9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          title="video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  // Яндекс Диск — кнопка выводится через externalLinks, ничего не рендерим
  return null
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { tr, lang } = useLanguage()
  const project = projects.find((p) => p.slug === slug)
  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projectIndex >= 0 && projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null
  const [allDone, setAllDone] = useState(false)

  useEffect(() => {
    if (!slug) return
    const result = markProjectVisited(slug)
    if (result.allDone) setAllDone(true)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ color: 'var(--color-muted)' }}>
        <p className="text-lg">{tr.projectDetail.notFound}</p>
        <Link to="/" style={{ color: 'var(--color-accent)' }}>{tr.projectDetail.backHome}</Link>
      </div>
    )
  }

  const localized = projectsData[lang][project.slug as keyof typeof projectsData.en]
  const title = localized?.title ?? project.title
  const description = localized?.description ?? project.description

  function renderDescription(text: string) {
    const links = project!.descriptionLinks
    if (!links) return text

    const parts: (string | React.ReactElement)[] = [text]
    for (const [phrase, href] of Object.entries(links)) {
      const result: (string | React.ReactElement)[] = []
      for (const part of parts) {
        if (typeof part !== 'string') { result.push(part); continue }
        const segments = part.split(phrase)
        segments.forEach((seg, i) => {
          result.push(seg)
          if (i < segments.length - 1)
            result.push(
              <a key={`${phrase}-${i}`} href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-accent)')}
              >{phrase}</a>
            )
        })
      }
      parts.splice(0, parts.length, ...result)
    }
    return parts
  }

  const externalLinks = [
    project.links?.play && { label: tr.projectDetail.playGoogle, href: project.links.play },
    project.links?.appstore && { label: tr.projectDetail.playAppStore, href: project.links.appstore },
    project.links?.website && { label: tr.projectDetail.playVisit, href: project.links.website },
    project.links?.youtube && !getYouTubeId(project.links.youtube) && { label: tr.projectDetail.watchYoutube, href: project.links.youtube },
    project.links?.github && { label: 'GitHub', href: project.links.github },
    project.links?.itch && { label: 'itch.io', href: project.links.itch },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <AchievementPopup title={title} />
      {allDone && (
        <AchievementPopup title={lang === 'ru' ? '🏅 Все квесты выполнены!' : '🏅 All Quests Completed!'} />
      )}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: 'var(--color-muted)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
      >
        {tr.projectDetail.back}
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        {title}
      </h1>

      <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {renderDescription(description)}
      </p>

      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={title}
          className="w-full rounded-lg mb-8 object-cover"
          style={{ border: '1px solid var(--color-border)', maxHeight: '480px' }}
        />
      )}

      {project.links?.youtube && <VideoPlayer url={project.links.youtube} />}

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-mono"
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {externalLinks.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-8">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {nextProject && (
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            {lang === 'ru' ? '// СЛЕДУЮЩИЙ КВЕСТ' : '// NEXT QUEST'}
          </p>
          <Link
            to={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-accent)'
            }}
          >
            {nextProject.title} →
          </Link>
        </div>
      )}
    </div>
  )
}
