"use client";

import { useActionState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    }
  }, [state]);

  return <form className="contact-form" action={formAction}><div className="form-row"><Label htmlFor="name">Name</Label><Input id="name" name="name" type="text" placeholder="Your name" required /></div><div className="form-row"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="you@company.com" required /></div><div className="form-row"><Label htmlFor="projectType">What do you need help with?</Label><select id="projectType" name="projectType" defaultValue="" required><option value="" disabled>Select one</option><option>Business website</option><option>Custom web application</option><option>Backend or API</option><option>Existing system</option><option>Something else</option></select></div><div className="form-row"><Label htmlFor="description">Project context</Label><Textarea id="description" name="description" rows={5} placeholder="A few sentences about the project, timeline, or challenge." required /></div><Button type="submit" disabled={pending} data-analytics-event="submit_inquiry" data-analytics-category="conversion" className="button button-dark">{pending ? "Sending…" : "Send inquiry"} <ArrowUpRight aria-hidden="true" /></Button>{state.message && <p className={`form-message ${state.status}`} aria-live="polite">{state.message}</p>}</form>;
}
