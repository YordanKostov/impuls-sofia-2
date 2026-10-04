import { useState } from "react";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { useForm } from "react-hook-form";
import { useLanguage } from "../context/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";
import { SITE, telHref } from "../lib/site";
import { motion } from "framer-motion";

const MAP_SRC =
  "https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=%D0%A3%D0%BB.%20%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%20%D0%9A%D0%B8%D0%BF%D1%80%D0%B8%D1%8F%D0%BD%20236%201799%20Sofia%2C%20Bulgaria&maptype=roadmap";

function Field({ id, label, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-ink-700"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="ml-1 mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const { t } = useLanguage();
  const content = t.contactPage;
  const form = content.form;
  // Shortcut to validation messages
  const errorMsg = form.validation;
  usePageTitle(content.title);

  const fieldProps = (name) => ({
    id: name,
    className: `field ${errors[name] ? "field-error" : ""}`,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const onSubmit = async (data) => {
    // Honeypot: real visitors never fill this in
    if (data.botcheck) return;

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3_ACCESS_KEY,
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          subject: "New Inquiry from Impuls Website",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20">
      <Container>
        <PageHeader
          eyebrow="Impuls Sofia"
          title={content.title}
          subtitle={content.desc}
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT COLUMN: Form */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="card p-6 md:p-9"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <input
                type="checkbox"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register("botcheck")}
              />

              <Field id="name" label={form.labels.name} error={errors.name && errorMsg.name}>
                <input
                  {...register("name", { required: true })}
                  {...fieldProps("name")}
                  placeholder={form.namePh}
                  autoComplete="name"
                />
              </Field>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="email" label={form.labels.email} error={errors.email && errorMsg.email}>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/,
                    })}
                    {...fieldProps("email")}
                    placeholder={form.emailPh}
                    type="email"
                    autoComplete="email"
                  />
                </Field>

                <Field id="phone" label={form.labels.phone} error={errors.phone && errorMsg.phone}>
                  <input
                    {...register("phone", {
                      required: true,
                      minLength: 6,
                      pattern: /^[0-9+\s-]+$/,
                    })}
                    {...fieldProps("phone")}
                    placeholder={form.phonePh}
                    type="tel"
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <Field id="message" label={form.labels.message} error={errors.message && errorMsg.message}>
                <textarea
                  {...register("message", { required: true })}
                  {...fieldProps("message")}
                  placeholder={form.msgPh}
                  rows={5}
                  style={{ resize: "none" }}
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? form.sending : form.btn}
              </button>

              {/* Status Messages */}
              <div aria-live="polite">
                {formStatus === "success" && (
                  <div className="rounded-2xl border border-mint-200 bg-mint-50 p-4 font-medium text-ink">
                    {form.success}
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
                    {form.error}
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Details + Map */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-mint-600">
                  {content.info.addressLabel}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold leading-snug text-ink">
                  {content.info.addressVal}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-mint-600">
                  {content.info.phoneLabel}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                  <a href={telHref} className="hover:text-ink-700">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-mint-600">
                  {content.info.emailLabel}
                </dt>
                <dd className="mt-1 break-words font-display text-2xl font-semibold text-ink">
                  <a href={`mailto:${SITE.email}`} className="hover:text-ink-700">
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-[2rem] border border-ink/10 bg-ink-100 shadow-soft">
              <iframe
                title={content.info.mapTitle}
                src={MAP_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
