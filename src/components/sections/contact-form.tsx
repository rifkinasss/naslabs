"use client";

import { useActionState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
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

  useEffect(() => {
    if (state.status === "success") {
      toast.success(translatedMessage);
    }
  }, [state, translatedMessage]);

  return <form className="contact-form" action={formAction}><div className="form-row"><Label htmlFor="name">{t("name")}</Label><Input id="name" name="name" type="text" placeholder={t("namePlaceholder")} required /></div><div className="form-row"><Label htmlFor="email">{t("email")}</Label><Input id="email" name="email" type="email" placeholder={t("emailPlaceholder")} required /></div><div className="form-row"><Label htmlFor="projectType">{t("help")}</Label><select id="projectType" name="projectType" defaultValue="" required><option value="" disabled>{t("select")}</option><option>{t("types.website")}</option><option>{t("types.app")}</option><option>{t("types.api")}</option><option>{t("types.existing")}</option><option>{t("types.other")}</option></select></div><div className="form-row"><Label htmlFor="description">{t("projectContext")}</Label><Textarea id="description" name="description" rows={5} placeholder={t("contextPlaceholder")} required /></div><Button type="submit" disabled={pending} data-analytics-event="submit_inquiry" data-analytics-category="conversion" className="button button-dark">{pending ? t("sending") : t("send")} <ArrowUpRight aria-hidden="true" /></Button>{state.message && <p className={`form-message ${state.status}`} aria-live="polite">{translatedMessage}</p>}</form>;
}
