"use client";

import { useActionState, useEffect, useState, type FocusEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const t = useTranslations("ContactPage");
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const translatedMessage = state.message ? t(state.message) : "";
  const [focusedStep, setFocusedStep] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.status !== "success" && state.status !== "error") return;
    const update = window.setTimeout(() => setShowSuccess(state.status === "success"), 0);
    return () => window.clearTimeout(update);
  }, [state]);

  const clearStep = (event: FocusEvent<HTMLFieldSetElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedStep(null);
  };

  if (showSuccess) return <section className="v2-contact-form__success" aria-live="polite"><span className="v2-label">{t("successLabel")}</span><h2>{t("successTitle")}</h2><p>{t("successBody")}</p><button type="button" className="v2-contact-form__again" onClick={() => setShowSuccess(false)}>{t("sendAnother")}</button></section>;

  return <form className="v2-contact-form" action={formAction} aria-busy={pending}><input className="v2-contact-form__honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" /><fieldset className={`v2-contact-form__step ${focusedStep === "identity" ? "is-active" : ""}`} onFocus={() => setFocusedStep("identity")} onBlur={clearStep}><legend><span>01</span>{t("steps.identity")}</legend><div className="v2-contact-form__fields"><div className="v2-contact-form__row"><Label htmlFor="name">{t("name")}</Label><Input id="name" name="name" type="text" autoComplete="name" placeholder={t("namePlaceholder")} maxLength={120} required /></div><div className="v2-contact-form__row"><Label htmlFor="email">{t("email")}</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder={t("emailPlaceholder")} maxLength={254} required /></div></div></fieldset><fieldset className={`v2-contact-form__step ${focusedStep === "direction" ? "is-active" : ""}`} onFocus={() => setFocusedStep("direction")} onBlur={clearStep}><legend><span>02</span>{t("steps.direction")}</legend><div className="v2-contact-form__fields"><div className="v2-contact-form__row"><Label htmlFor="projectType">{t("help")}</Label><select id="projectType" name="projectType" defaultValue="" required><option value="" disabled>{t("select")}</option><option>{t("types.website")}</option><option>{t("types.app")}</option><option>{t("types.api")}</option><option>{t("types.existing")}</option><option>{t("types.other")}</option></select></div></div></fieldset><fieldset className={`v2-contact-form__step ${focusedStep === "context" ? "is-active" : ""}`} onFocus={() => setFocusedStep("context")} onBlur={clearStep}><legend><span>03</span>{t("steps.context")}</legend><div className="v2-contact-form__fields"><div className="v2-contact-form__row"><Label htmlFor="description">{t("projectContext")}</Label><Textarea id="description" name="description" rows={7} maxLength={5000} placeholder={t("contextPlaceholder")} required /></div><Button type="submit" disabled={pending} data-analytics-event="submit_inquiry" data-analytics-category="conversion" className="v2-button v2-button-primary v2-contact-form__submit">{pending ? t("sending") : t("send")} <ArrowUpRight aria-hidden="true" /></Button>{state.message && <p className={`v2-contact-form__message ${state.status}`} role={state.status === "error" ? "alert" : "status"} aria-live="polite">{translatedMessage}</p>}</div></fieldset></form>;
}
