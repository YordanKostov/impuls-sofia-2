import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import usePageTitle from "../hooks/usePageTitle";

// Internal page for the club, so it is Bulgarian only.
// Needs supabase/admin-setup.sql to have been run once.

const BUCKET = "news";
const MAX_SIDE = 2000; // px; phone photos are scaled down before upload

// Bulgarian -> Latin for URL slugs (official streamlined system)
const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
  р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
  ш: "sh", щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya",
};

function slugify(text) {
  return [...text.toLowerCase()]
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 80)
    .replace(/^-+|-+$/g, "");
}

// First line of the post becomes the title, the next sentences the excerpt
function suggestFromText(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const title = (lines[0] || "").slice(0, 120);
  let excerpt = lines.slice(1).join(" ");

  if (excerpt.length > 200) {
    const cut = excerpt.slice(0, 200);
    const end = Math.max(
      cut.lastIndexOf(". "),
      cut.lastIndexOf("! "),
      cut.lastIndexOf("? ")
    );
    excerpt = end > 80 ? cut.slice(0, end + 1) : `${cut.replace(/\s+\S*$/, "")}…`;
  }
  return { title, excerpt };
}

// Some pastes from Facebook lose the line breaks before "•" bullets and
// leave a replacement character (U+FFFD) in their place; put the breaks back
const fixPaste = (text) => text.replace(/\uFFFD/g, "\n");

// The title is shown above the text, so don't repeat it as the first line
function bodyWithoutTitle(text, title) {
  const [first, ...rest] = text.trim().split("\n");
  return first.trim() === title.trim() ? rest.join("\n").trim() : text.trim();
}

async function shrinkImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Снимката не може да бъде обработена."))),
      "image/jpeg",
      0.85
    )
  );
}

async function uniqueSlug(base) {
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .like("slug", `${base}%`);
  if (error) throw error;

  const taken = new Set(data.map((row) => row.slug));
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}

function explainError(error) {
  const msg = error?.message || String(error);
  if (/row-level security|violates|unauthorized/i.test(msg)) {
    return "Нямате права за запис. Проверете дали имейлът ви е добавен в supabase/admin-setup.sql и дали скриптът е пуснат.";
  }
  if (/bucket not found/i.test(msg)) {
    return "Липсва хранилището за снимки „news“. Пуснете supabase/admin-setup.sql в Supabase.";
  }
  if (/facebook_url/i.test(msg)) {
    return "Липсва колоната facebook_url. Пуснете supabase/admin-setup.sql в Supabase.";
  }
  if (/(title|excerpt|content)_en/i.test(msg)) {
    return "Липсват колоните за английския текст. Пуснете supabase/articles-english.sql и supabase/albums-english.sql в Supabase.";
  }
  return msg;
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function Field({ id, label, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-ink-700"
      >
        {label}
      </label>
      {children}
      {hint && <p className="ml-1 mt-1.5 text-sm text-ink-500">{hint}</p>}
    </div>
  );
}

function ErrorBox({ children }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
      {children}
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Грешен имейл или парола.");
    setBusy(false);
  };

  return (
    <form onSubmit={onSubmit} className="card max-w-md space-y-5 p-6 md:p-9">
      <Field id="email" label="Имейл">
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field id="password" label="Парола">
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
        {busy ? "Влизане..." : "Вход"}
      </button>
      {error && <ErrorBox>{error}</ErrorBox>}
    </form>
  );
}

function ImportForm() {
  const [fbUrl, setFbUrl] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [textEn, setTextEn] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [date, setDate] = useState(today);
  const [photos, setPhotos] = useState([]); // [{ file, preview }]
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [savedSlug, setSavedSlug] = useState(null);

  const fillFromText = (overwrite) => {
    const suggestion = suggestFromText(text);
    if (overwrite || !title) setTitle(suggestion.title);
    if (overwrite || !excerpt) setExcerpt(suggestion.excerpt);
  };

  const [photoError, setPhotoError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (fileList) => {
    const files = [...fileList].filter((f) => f.type.startsWith("image/"));
    if (!files.length) return false;
    setPhotoError(null);
    setPhotos((prev) => [
      ...prev,
      ...files.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ]);
    return true;
  };

  const addPhotos = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  // "Copy image" on Facebook, then Ctrl+V anywhere on this page
  useEffect(() => {
    const onPaste = (e) => {
      const data = e.clipboardData;
      // Pasted text (e.g. the post itself) goes into the focused field as usual
      if (!data || data.types.includes("text/plain")) return;
      if (addFiles(data.files)) e.preventDefault();
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, []);

  // Dragged from a folder we get files; dragged from another tab often only a link
  const onDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    if (addFiles(e.dataTransfer.files)) return;

    const url = (e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain"))
      .split("\n")[0]
      .trim();
    if (!/^https?:\/\//.test(url)) return;

    try {
      const res = await fetch(url);
      const blob = await res.blob();
      if (!res.ok || !blob.type.startsWith("image/")) throw new Error();
      addFiles([new File([blob], "photo", { type: blob.type })]);
    } catch {
      setPhotoError(
        "Тази снимка не може да се вземе с влачене. Щракнете с десен бутон върху нея във Facebook, изберете „Копиране на изображението“ и натиснете Ctrl+V тук."
      );
    }
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(photos[index].preview);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const makeCover = (index) => {
    setPhotos((prev) => [prev[index], ...prev.filter((_, i) => i !== index)]);
  };

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.preview));
    setFbUrl("");
    setText("");
    setTitle("");
    setExcerpt("");
    setTextEn("");
    setTitleEn("");
    setExcerptEn("");
    setDate(today());
    setPhotos([]);
    setPhotoError(null);
    setSavedSlug(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const cleanTitle = title.trim();
      const slug = await uniqueSlug(slugify(cleanTitle) || "novina");

      // 1. Photos -> storage
      const folder = `${slug}-${Date.now()}`;
      const urls = [];
      for (const [i, photo] of photos.entries()) {
        setProgress(`Качване на снимка ${i + 1} от ${photos.length}...`);
        const blob = await shrinkImage(photo.file);
        const path = `${folder}/${String(i + 1).padStart(2, "0")}.jpg`;
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, blob, { contentType: "image/jpeg" });
        if (error) throw error;
        urls.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
      }

      // 2. More than one photo -> album, so they show in the article carousel
      setProgress("Запазване...");
      let albumId = null;
      if (urls.length > 1) {
        const { data: album, error } = await supabase
          .from("albums")
          .insert({
            title: cleanTitle,
            cover_url: urls[0],
            ...(titleEn.trim() && { title_en: titleEn.trim() }),
          })
          .select("id")
          .single();
        if (error) throw error;
        albumId = album.id;

        const { error: imagesError } = await supabase.from("gallery_images").insert(
          urls.map((image_url, i) => ({ album_id: albumId, image_url, order_index: i + 1 }))
        );
        if (imagesError) throw imagesError;
      }

      // 3. The article itself
      const article = {
        title: cleanTitle,
        slug,
        excerpt: excerpt.trim(),
        content: bodyWithoutTitle(text, cleanTitle),
        cover_image: urls[0] || null,
        // Noon, so the date doesn't shift a day in another time zone
        published_at: new Date(`${date}T12:00:00`).toISOString(),
        album_id: albumId,
      };
      if (fbUrl.trim()) article.facebook_url = fbUrl.trim();
      if (titleEn.trim()) article.title_en = titleEn.trim();
      if (excerptEn.trim()) article.excerpt_en = excerptEn.trim();
      if (textEn.trim()) article.content_en = bodyWithoutTitle(textEn, titleEn);

      const { error } = await supabase.from("articles").insert(article);
      if (error) throw error;

      setSavedSlug(slug);
    } catch (err) {
      console.error("Import failed:", err);
      setError(explainError(err));
    } finally {
      setSaving(false);
      setProgress("");
    }
  };

  if (savedSlug) {
    return (
      <div className="card space-y-5 p-6 md:p-9">
        <p className="font-display text-3xl font-semibold text-ink">Статията е публикувана.</p>
        <div className="flex flex-wrap gap-3">
          <Link to={`/news/${savedSlug}`} className="btn-primary">
            Отвори статията
          </Link>
          <button type="button" onClick={reset} className="btn-outline">
            Добави още една
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-6 p-6 md:p-9">
      <Field
        id="fbUrl"
        label="Линк към публикацията във Facebook"
        hint="По желание. Под статията ще има бутон към оригиналната публикация."
      >
        <input
          id="fbUrl"
          type="url"
          className="field"
          placeholder="https://www.facebook.com/ImpulsSofiq/posts/..."
          value={fbUrl}
          onChange={(e) => setFbUrl(e.target.value)}
        />
      </Field>

      <Field
        id="text"
        label="Текст на публикацията"
        hint="Копирайте текста от Facebook и го поставете тук. Първият ред става заглавие."
      >
        <textarea
          id="text"
          required
          rows={10}
          className="field"
          value={text}
          onChange={(e) => setText(fixPaste(e.target.value))}
          onBlur={() => fillFromText(false)}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto]">
        <Field id="title" label="Заглавие">
          <input
            id="title"
            required
            className="field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <Field id="date" label="Дата">
          <input
            id="date"
            type="date"
            required
            className="field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
      </div>

      <Field id="excerpt" label="Кратко резюме" hint="Показва се в списъка с новини.">
        <textarea
          id="excerpt"
          rows={3}
          className="field"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </Field>

      <button
        type="button"
        onClick={() => fillFromText(true)}
        disabled={!text.trim()}
        className="link-arrow disabled:opacity-40"
      >
        Попълни отново заглавие и резюме от текста
      </button>

      <details className="rounded-2xl border border-ink/10 bg-white/50 p-5 [&[open]>summary]:mb-5">
        <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.14em] text-ink-700">
          Английска версия (по желание)
        </summary>
        <div className="space-y-5">
          <p className="text-sm text-ink-500">
            Показва се, когато сайтът е на английски. Без нея се показва българският текст.
          </p>
          <Field id="textEn" label="Text (English)">
            <textarea
              id="textEn"
              rows={8}
              className="field"
              value={textEn}
              onChange={(e) => setTextEn(fixPaste(e.target.value))}
              onBlur={() => {
                const suggestion = suggestFromText(textEn);
                if (!titleEn) setTitleEn(suggestion.title);
                if (!excerptEn) setExcerptEn(suggestion.excerpt);
              }}
            />
          </Field>
          <Field id="titleEn" label="Title (English)">
            <input
              id="titleEn"
              className="field"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
            />
          </Field>
          <Field id="excerptEn" label="Excerpt (English)">
            <textarea
              id="excerptEn"
              rows={3}
              className="field"
              value={excerptEn}
              onChange={(e) => setExcerptEn(e.target.value)}
            />
          </Field>
        </div>
      </details>

      <Field
        id="photos"
        label="Снимки"
        hint="Първата снимка е корицата. При повече от една снимка се създава и албум в Галерията."
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`rounded-2xl border-2 border-dashed p-5 transition-colors ${
            dragging ? "border-mint-600 bg-mint-50" : "border-ink/15 bg-white/50"
          }`}
        >
          <p className="mb-4 text-sm leading-relaxed text-ink-700">
            <strong>От Facebook:</strong> десен бутон върху снимката → „Копиране на
            изображението“ → <kbd className="rounded bg-ink-100 px-1.5 py-0.5 font-sans text-xs font-bold">Ctrl</kbd>+<kbd className="rounded bg-ink-100 px-1.5 py-0.5 font-sans text-xs font-bold">V</kbd> тук.
            Може и да ги довлачите в това поле или да ги изберете от телефона/компютъра.
          </p>
          <input
            id="photos"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={addPhotos}
            className="block w-full text-sm text-ink-700 file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-5 file:py-2.5 file:font-bold file:text-white hover:file:bg-ink-900"
          />
        </div>
      </Field>

      {photoError && <ErrorBox>{photoError}</ErrorBox>}

      {photos.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {photos.map((photo, i) => (
            <li key={photo.preview} className="relative">
              <img
                src={photo.preview}
                alt=""
                className={`aspect-square w-full rounded-xl object-cover ${
                  i === 0 ? "ring-4 ring-mint-600" : ""
                }`}
              />
              {i === 0 ? (
                <span className="absolute bottom-1.5 left-1.5 rounded-full bg-mint-600 px-2 py-0.5 text-xs font-bold text-white">
                  Корица
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => makeCover(i)}
                  className="absolute bottom-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-ink hover:bg-white"
                >
                  Корица
                </button>
              )}
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label="Премахни снимката"
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 font-bold text-ink hover:bg-white"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={saving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? "Публикуване..." : "Публикувай статията"}
        </button>
        <span aria-live="polite" className="text-sm font-medium text-ink-500">
          {progress}
        </span>
      </div>

      {error && <ErrorBox>{error}</ErrorBox>}
    </form>
  );
}

export default function Admin() {
  const [session, setSession] = useState(undefined); // undefined = still checking
  usePageTitle("Админ");

  // Keep the page out of search results
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className="py-12 md:py-20">
      <Container>
        <PageHeader
          eyebrow="Админ"
          title="Статия от Facebook"
          subtitle="Поставете текста и снимките от публикация – тя ще се появи в Новини като обикновена статия."
        />

        {session === undefined ? null : session ? (
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink-500">
              <span>Влезли сте като {session.user.email}</span>
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="link-arrow"
              >
                Изход
              </button>
            </div>
            <ImportForm />
          </div>
        ) : (
          <LoginForm />
        )}
      </Container>
    </section>
  );
}
