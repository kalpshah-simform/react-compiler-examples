interface PlaceholderPageProps {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
    </div>
  )
}
