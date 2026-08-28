"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Message = { from: "bot" | "user"; text: string };
type Step = "start" | "service" | "stage" | "done";
const welcome = "Hi! I can help you understand what NasLabs does or help shape your project inquiry.";

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: welcome }]);
  const [step, setStep] = useState<Step>("start");
  function choose(label: string, reply: string, nextStep: Step) { setMessages((current) => [...current, { from: "user", text: label }, { from: "bot", text: reply }]); setStep(nextStep); }
  function reset() { setMessages([{ from: "bot", text: welcome }]); setStep("start"); }

  return <Popover><PopoverTrigger asChild><Button size="icon" className="chat-trigger" aria-label="Open NasLabs assistant"><MessageCircle aria-hidden="true" /></Button></PopoverTrigger><PopoverContent align="end" side="top" sideOffset={14} className="chat-popover"><div className="chat-popover-header"><div className="chat-title"><span className="chat-status" />NasLabs assistant</div><span className="chat-caption">Usually replies instantly</span></div><div className="chat-body"><div className="chat-messages">{messages.map((message, index) => <div className={`chat-message ${message.from}`} key={`${message.from}-${index}`}>{message.text}</div>)}</div><div className="chat-options" aria-label="Assistant options">{step === "start" && <><Button variant="outline" onClick={() => choose("What does NasLabs build?", "We build business websites, custom web applications, backend APIs, and improvements to existing systems.", "service")}>What do you build?</Button><Button variant="outline" onClick={() => choose("How does a project work?", "We start with discovery, define a practical scope, build in focused iterations, then launch and support.", "service")}>How does a project work?</Button><Button variant="outline" onClick={() => choose("I have a project", "Great. What kind of help are you looking for?", "service")}>I have a project</Button></>}{step === "service" && <><Button variant="outline" onClick={() => choose("A business website", "Good fit. We can help clarify your offer, structure the content, and build a responsive website.", "stage")}>Business website</Button><Button variant="outline" onClick={() => choose("A web application", "Good fit. We can help turn a manual workflow or product idea into a focused web application.", "stage")}>Web application</Button><Button variant="outline" onClick={() => choose("An existing system", "Good fit. We can help with new features, bugs, refactoring, integrations, or ongoing support.", "stage")}>Existing system</Button></>}{step === "stage" && <><Button variant="outline" onClick={() => choose("I am still exploring", "That is completely fine. A short conversation can help turn the rough idea into a useful next step.", "done")}>Still exploring</Button><Button variant="outline" onClick={() => choose("I am ready to discuss it", "Let&apos;s continue with a few project details so we can understand the context.", "done")}>Ready to discuss</Button></>}{step === "done" && <><Button asChild className="button button-dark"><Link href="/contact" data-analytics-event="chat_start_project" data-analytics-category="conversion">Open contact form <ArrowUpRight aria-hidden="true" /></Link></Button><Button variant="ghost" onClick={reset}>Start over</Button></>}</div></div></PopoverContent></Popover>;
}
