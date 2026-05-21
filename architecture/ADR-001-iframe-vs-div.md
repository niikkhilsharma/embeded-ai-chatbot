# ADR-001 - Iframe vs Div for Embedded Chatbot Widget

## Status
Accepted

---

## Context

We are building an embeddable chatbot widget that can be added to any external website via a simple `<script>` tag placed in the page header. Once added, the chatbot should appear at the bottom of the host website.

The core question was: **should the widget be injected as a `<div>` into the host page's DOM, or should it be rendered inside an `<iframe>`?**

---

## Options Considered

### Option 1: Div
- Inject a `<div>` directly into the host website's DOM
- The chatbot UI lives inside the host page's document

**Pros:**
- Lighter and faster to load
- No need for cross-origin communication

**Cons:**
- Host website's CSS can conflict with or override chatbot styles
- Host website's JavaScript can accidentally interfere with chatbot logic
- Our chatbot code could unintentionally affect the host site's layout or behavior
- Harder to maintain across diverse, unpredictable host environments

---

### Option 2: Iframe ✅
- Inject an `<iframe>` that loads the chatbot UI from our own hosted URL
- The chatbot lives in a completely isolated environment

**Pros:**
- Full CSS and JavaScript isolation from the host website
- Host site cannot break our chatbot; our chatbot cannot break their site
- Safer and more reliable across unknown websites with varying code quality
- Industry standard approach for third-party embedded widgets

**Cons:**
- Slight overhead in load time compared to a plain div
- Requires `postMessage` API for cross-origin communication between the iframe and host page

---

## Decision

We will use an **iframe** to embed the chatbot widget.

---

## Rationale

The chatbot widget will be embedded on websites we do not control. These sites may have varying CSS frameworks, JavaScript libraries, and coding standards. Using an iframe ensures our widget works reliably and consistently regardless of the host environment, and protects both parties from unintended interference.

---

## Consequences

- Cross-origin communication between the iframe and the host page must be handled using the `window.postMessage` API
- The chatbot UI must be hosted on our own server and loaded via a URL inside the iframe
- A small performance trade-off is accepted in exchange for stability, safety, and maintainability