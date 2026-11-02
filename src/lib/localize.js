// Articles and albums keep an optional English version in *_en columns
// (title_en, excerpt_en, content_en); without one, the Bulgarian text is shown.
export function localized(article, field, lang) {
  return (lang === "en" && article?.[`${field}_en`]) || article?.[field];
}
