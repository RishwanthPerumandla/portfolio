---

title: "VoixAI: Engineering a Reliable Voice Agent for Complex Orders"
description: "A backend-first case study on building a real-time voice ordering system with multi-runtime orchestration, deterministic order state, validation, replay, telemetry, and a path toward reliable scale."
slug: voixai
dateFormatted: June 27, 2026
cover: /assets/images/posts/1.png
category: AI Engineering
---
**GitHub Repository →** [VoixAI repository link](https://github.com/RishwanthPerumandla/VoixAI.git)


> “Can I get a 10-piece boneless combo, half hot and half lemon pepper, with fries?”
>
> “Actually, make that bone-in.”
>
> “Wait, make it 20.”
>
> “And no fries. Veggie sticks.”
>
> “Also, can you make half of it garlic parmesan?”

This is where the project became interesting for me.

At first, I thought building a restaurant voice agent was mainly a voice problem. The system needed to hear the customer, understand what they wanted, and respond naturally enough that the experience did not feel like a frustrating phone tree.

That part was exciting.

With modern speech models, I could connect a microphone to an agent, give it a menu, and get it to hold a surprisingly natural conversation. It could greet a customer, answer basic questions, recommend items, and even take a simple order.

But then I started thinking about the conversation above.

The customer has not placed five separate orders. They have made four corrections to the same order, in a few seconds, while expecting the system to keep up naturally.

That is not only a voice problem.

It is a backend problem.

It is a state-management problem.

It is a reliability problem.

And that is why I built **VoixAI**.

VoixAI is a real-time voice ordering system built around a Wingstop-style restaurant workflow. I intentionally chose a difficult menu because I did not want to hide behind a simple “burger and fries” demo. The menu has more than 130 items, wing types, flavors, split flavors, combos, group packs, sides, dips, preparation preferences, quantity rules, and many opportunities for a customer to change their mind.

I wanted to understand what it would actually take to build a voice agent that a business could eventually trust with a real transaction.

---

## The first version could take an order. It just did not feel human.

The first version of VoixAI was built around a structured state machine.

The flow was simple:

```text
Greeting
   ↓
Collect item
   ↓
Collect required options
   ↓
Validate order
   ↓
Confirm cart
   ↓
Submit or hand off
```

This approach was useful because it was predictable.

The system could make sure it asked for every required option:

* Bone-in or boneless
* Flavor
* Quantity
* Side
* Dip
* Cooking preference
* Confirmation before placing the order

From a backend perspective, this was a good starting point. It made the order flow explicit and controlled.

But when I listened to the actual interaction, it felt robotic.

People do not speak in perfectly clean steps. They interrupt. They change their mind halfway through a sentence. They say “yeah” just to acknowledge something. They ask what comes with a combo before answering the original question. They may correct something the moment the agent starts repeating it back.

The state machine was good at guiding an order.

It was not good at handling the way people naturally speak.

That pushed me to explore a different question:

> How can I make the conversation flexible without letting the order become unreliable?

---

## The boundary I needed: the model can talk, but it cannot own the order

This became the main principle behind VoixAI:

> **Let the model handle the conversation. Let deterministic systems own the order.**

An AI model is useful for understanding language.

It can understand that these phrases are all related:

* “Make it bone-in.”
* “Actually, I want traditional wings.”
* “Not boneless—the regular wings.”
* “Can you switch those to classic?”

But the model should not decide whether that update is valid.

It should not decide whether the selected item supports the requested change, whether the customer is changing the correct line item, whether the cart price changed, or whether the order is complete enough to submit.

Those decisions belong in the backend.

So I designed the agent to ask for structured actions instead of directly editing the cart.

```text
add_item_to_order(...)
update_item_modifier(...)
replace_item(...)
remove_item(...)
validate_cart(...)
submit_order(...)
```

The customer speaks naturally.

The voice runtime interprets the intent.

The backend validates the request against the menu, pricing rules, and current order state.

Only then does the agent confirm the change.

```text
Customer speaks
      ↓
Voice runtime identifies intent
      ↓
Structured tool call
      ↓
Ordering engine validates request
      ↓
Cart is updated and persisted
      ↓
Agent receives confirmed result
      ↓
Natural spoken response
```

This sounds like a subtle distinction, but it changes the entire system.

The model can be flexible.

The order cannot be.

---

## Why I chose a Wingstop-style ordering flow

A simple restaurant chatbot can look impressive without dealing with the difficult parts.

A Wingstop-style order does not let the system hide.

| Customer says                             | What the backend has to understand              |
| ----------------------------------------- | ----------------------------------------------- |
| “I want a 10-piece combo.”                | Wing type, flavor, side, drink, quantity, price |
| “Make it half hot and half lemon pepper.” | Flavor limits and item-specific rules           |
| “Actually, make it bone-in.”              | Safe replacement of the correct item            |
| “Remove the fries and add veggie sticks.” | Required modifier rules and price updates       |
| “Make those well done.”                   | Whether preparation is supported                |
| “I meant 20 wings, not 10.”               | Quantity replacement without duplicate items    |

To the customer, this is one conversation.

To the backend, it is a sequence of state changes.

That is why I liked this use case. It forced me to think like both an AI engineer and a backend engineer.

The agent needs to understand what the customer means.

The system needs to make sure the order is still correct after every change.

---

## I did not want to lock the product into one voice model

Once I moved beyond the initial state-machine flow, I started exploring different voice architectures.

The classic approach looks like this:

```text
Customer Audio
   ↓
Speech-to-Text
   ↓
LLM + Tool Calls
   ↓
Text-to-Speech
   ↓
Agent Audio
```

This is a strong architecture for debugging and control. I can inspect the transcript, look at tool calls, understand why the model asked a question, and trace how the cart changed.

But it can sometimes feel less natural because speech gets flattened into text before the model sees it.

Then there are speech-to-speech models.

These systems can handle the rhythm of a conversation more naturally. They can be better at barge-in, backchanneling, timing, and expressive responses because the interaction remains closer to audio.

But they come with different trade-offs. They can be harder to inspect, harder to replay, and more dependent on provider behavior.

Instead of choosing one forever, I built VoixAI around multiple runtime paths:

| Runtime                 | Why I use it                                          |
| ----------------------- | ----------------------------------------------------- |
| Classic STT → LLM → TTS | Better visibility, transcripts, and tool control      |
| OpenAI Realtime         | Lower-friction real-time conversation                 |
| Gemini Live             | More audio-native turn-taking and natural interaction |

The point was not to create three versions of the same product.

The point was to make the voice layer replaceable.

If one provider improves latency, another becomes cheaper, or a real-time runtime has an outage, I do not want to rewrite the ordering system underneath it.

![VoixAI Multi-Runtime Architecture](/assets/images/posts/2.png)

*Diagram 1: The customer interacts with a LiveKit room and Python agent runtime. Classic, OpenAI Realtime, and Gemini Live paths connect to the same ordering and validation layer.*

---

## The order engine became the real center of the project

The voice agent is the part people see.

But the order engine is the part that makes VoixAI useful.

I kept the ordering domain separate from the LiveKit agent code. The core package does not depend on a specific voice provider or real-time framework.

It owns the parts of the product that should remain stable:

* Menu catalog and item templates
* Flavor and modifier validation
* Combo and group-pack rules
* Pricing, tax, and upcharges
* Order lifecycle state machine
* Confirmation checks
* Deterministic order-intent reducer
* Serialization
* Replay of saved intent sequences

That separation matters because it gives the product room to grow.

The same ordering engine can eventually support:

* Voice ordering
* Web ordering
* Mobile ordering
* A store employee dashboard
* POS integrations
* Automated regression tests
* Customer order history

The voice agent is one interface into the system.

It is not the source of truth.

![VoixAI Ordering Domain Architecture](/assets/images/posts/3.png)

*Diagram 2: The voice layer sends structured order intents. The ordering engine applies the mutation, validates it against the menu catalog, recalculates pricing, and returns a confirmed result.*

---

## “Actually…” became a state-management problem

The hardest part of this project was not adding an item to the cart.

It was dealing with corrections.

A customer saying, “Actually, make that bone-in,” sounds simple.

But the system has to know:

* Which item are they changing?
* Does that item support the new wing type?
* Which modifiers should remain?
* Which modifiers are now invalid?
* Does the flavor selection still work?
* Does the price change?
* Has the customer already changed the order again?

I did not want the agent to keep the entire answer inside a long prompt.

Instead, I modeled order changes as explicit intents.

```text
AddItem
   ↓
UpdateFlavor
   ↓
ReplaceWingType
   ↓
RemoveSide
   ↓
AddDip
   ↓
ValidateOrder
   ↓
ConfirmOrder
```

The reducer applies the intent, validates the resulting state, and produces the updated order.

The project also supports replaying saved intent sequences.

That gives me a much better way to debug failures.

Instead of asking, “What did the LLM think happened?” I can inspect the actual progression:

```text
1. Added 10-piece boneless wings
2. Set flavor to Hot
3. Replaced Hot with Lemon Pepper
4. Added fries
5. Removed fries
6. Added veggie sticks
7. Confirmed order
```

That is easier to test, easier to replay, and much easier to reason about.

The order is not just remembered by the conversation.

It is represented as state.

---

## A live call is not just another API request

While building the backend, I also had to think differently about latency.

A dashboard query taking three seconds is annoying.

A voice agent taking three seconds after every customer sentence feels broken.

That is why I think about VoixAI in two separate paths.

The **control plane** handles normal backend work:

* Creating a session
* Issuing LiveKit tokens
* Resolving store configuration
* Loading menu context
* Selecting a runtime
* Creating a draft order
* Recording session metadata

The **real-time path** handles the live customer interaction:

* Audio streaming
* LiveKit room participation
* Turn detection
* Barge-in handling
* Streaming responses
* Tool calls
* Runtime fallback decisions

The live path should stay focused on the customer.

Analytics, dashboards, cost aggregation, and other non-critical work should not make someone wait while placing an order.

![VoixAI Control Plane and Real-Time Data Plane](/assets/images/posts/4.png)

*Diagram 3: The control plane creates and configures a session. The real-time path keeps the customer conversation responsive.*

---

## Thinking about scale before I need it

I am not claiming that VoixAI is already handling thousands of live restaurant calls.

It is not.

But I also did not build it as a single script that works only for one demo session.

A real deployment has to deal with:

* Multiple concurrent LiveKit rooms
* Agent-worker CPU and memory
* Voice-provider concurrency limits
* Tool-call latency
* Database load
* Telemetry volume
* Provider outages
* Call failures
* Store-level isolation

The current architecture already separates the web app, FastAPI API layer, Python agent runtime, shared ordering domain, database, and dashboard.

That gives the system a clean path toward scaling horizontally.

The next hardening stage is straightforward:

1. Run the API as stateless instances behind a load balancer.
2. Use PostgreSQL as the durable production database instead of the local SQLite fallback.
3. Scale agent workers based on active rooms, CPU, memory, and provider capacity.
4. Keep telemetry and analytics off the real-time call path.
5. Add authentication, rate limiting, and tenant isolation.
6. Load-test concurrent calls before making any serious scale claims.

![VoixAI Scale-Out Path](/assets/images/posts/5.png)

*Diagram 4: The current separation between agent workers, API services, the ordering domain, and persistent storage creates a clear path toward scale. This is the deployment direction I am hardening next.*

For me, that is the difference between building something that works once and building something that has a chance to work in the real world.

---

## Reliability is not about never failing

![VoixAI Reliability Architecture](/assets/images/posts/6.png)

A reliable system is not a system where nothing ever goes wrong.

Providers fail. Networks slow down. Tool calls time out. Customers say unclear things. Store inventory can change.

The important question is what the system does next.

VoixAI already includes building blocks for that direction:

* Realtime-provider probing
* Circuit-breaker behavior
* Frustration monitoring
* Mock and SIP-oriented handoff paths
* Escalation after repeated placement failures
* Duplicate confirmation prevention
* Persisted call events, transcripts, and escalation records

The fallback path is designed around continuity:

```text
Preferred voice runtime
          ↓
Alternative supported runtime
          ↓
Structured clarification or recovery
          ↓
Human/store handoff
```

A handoff should not make the employee restart the conversation.

The employee should receive the current cart, available transcript, unresolved question, and reason for escalation.

The AI should not become more confident when it is uncertain.

It should become safer.

---

## How I am measuring whether it is actually getting better

A voice agent sounding natural is not enough.

I want to know whether it completes correct orders.

That is why the system persists calls, transcripts, events, runtime sessions, orders, and dashboard metrics.

The next evaluation phase is focused on situations that look more like real customer behavior:

* Changing the order multiple times
* Interrupting confirmation
* Asking ambiguous questions
* Repeating a request after a delay
* Invalid flavors or modifiers
* Provider latency during a live session
* Runtime fallback
* Order-placement failure
* Customer frustration
* Human escalation

The metrics I care about are practical:

| Metric                          | Why it matters                                |
| ------------------------------- | --------------------------------------------- |
| Validated order completion rate | Did the system finish a correct order?        |
| Cart correction recovery rate   | Can it handle changes safely?                 |
| Tool-call success rate          | Is backend execution reliable?                |
| Barge-in recovery latency       | Does the conversation feel natural?           |
| Fallback success rate           | Can the system degrade safely?                |
| P95 response latency            | Does the customer experience stay responsive? |
| Cost per validated order        | Is the system useful for a business?          |

The system should improve because the numbers show it is improving.

Not because one new voice sounds better in a demo.

---

## What I am still working on

I want to be honest about where VoixAI is today.

The main architecture is in place: the ordering engine, menu validation, pricing, voice runtimes, telemetry, dashboard, persistence, replay support, and local Docker stack.

But there are still important things I am hardening:

* Authentication and rate limiting for the LiveKit token endpoint
* More consistent conversation orchestration across each runtime
* Browser-level end-to-end tests
* More unit coverage for the frustration monitor, circuit breaker, and handoff flows
* Cleanup of a legacy agent test and a few casing-related test assertions
* Production configuration for SIP handoff
* Stronger request idempotency and order-version protection for complex concurrent updates
* Load testing with realistic concurrent ordering sessions

I do not see these as things to hide.

This is the part where a promising prototype turns into a reliable system.

---

## Final thoughts

Building VoixAI changed how I think about voice AI.

The voice is only the interface. The real engineering work happens behind it:

* Real-time infrastructure
* Stateful backend design
* Menu and pricing validation
* Deterministic order mutations
* Runtime abstraction
* Telemetry and replay
* Failure handling and escalation
* Cost tracking
* Load testing

AI coding tools helped me move faster with scaffolding, implementation, and refactoring. But they did not decide where the source of truth should live, how an order correction should be represented, what happens when a provider fails, or when the system should escalate instead of guessing.

Those are the decisions I wanted VoixAI to demonstrate.

VoixAI is not just a voice agent that can take an order. It is a backend-first AI system designed around a harder goal: making real-time AI interactions reliable enough to support real business workflows.

---

**GitHub Repository →** [VoixAI repository link](https://github.com/RishwanthPerumandla/VoixAI.git)

**Architecture Diagrams →** [VoixAI Architecture diagrams](https://github.com/RishwanthPerumandla/VoixAI/tree/main/architectures)
