interface SectionIntroProps {
  id: string
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}

export function SectionIntro({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionIntroProps) {
  return (
    <div className={`enterprise-section-intro enterprise-section-intro--${align}`}>
      <p className="enterprise-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p className="enterprise-section-description">{description}</p>
    </div>
  )
}
