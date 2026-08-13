# omverse-ui component documentation standard

Every component is documented as a product decision, an interaction contract, and a public API. A page is complete only when it gives designers, writers, engineers, and accessibility reviewers enough information to use the component consistently without relying on private context.

## Canonical page structure

All component pages use these sections in this order:

1. **Overview** — purpose, mental model, and the simplest live implementation.
2. **Anatomy** — named visual and semantic parts, including required and optional elements.
3. **When to use** — suitable product scenarios and decision criteria.
4. **When not to use** — unsuitable scenarios and the alternative component or pattern.
5. **Variants** — visual hierarchy, purpose, and selection rules for every supported variant.
6. **States** — default, hover, focus, pressed, selected, disabled, loading, empty, error, and other applicable states.
7. **Behavior** — interaction, focus, overflow, responsiveness, async behavior, and state transitions.
8. **Accessibility** — semantics, keyboard model, focus management, screen-reader behavior, contrast, touch, and motion.
9. **Content guidelines** — labels, terminology, formatting, localization, and realistic examples.
10. **Examples** — live, copyable product scenarios, including edge cases and responsive compositions.
11. **Props / API** — complete types, defaults, events, controlled behavior, refs, and HTML attribute forwarding.
12. **Related components** — nearby choices with a concise explanation of when to choose each one.

## Reference qualities

- **Atlassian:** explicit usage decisions, content design, and accessible alternatives.
- **SAP Fiori:** enterprise workflow depth, control selection, responsive behavior, and data-volume guidance.
- **Oracle Redwood:** precise anatomy, interaction states, behavior, and enterprise consistency.
- **Linear:** focused language, restrained presentation, and low-friction developer experience.

References are quality benchmarks only. omverse-ui uses original writing, examples, APIs, visuals, and interaction decisions.

## Definition of done

A component is ready only when:

- every applicable section contains component-specific guidance rather than generic placeholder copy;
- examples use realistic product language and can be copied into an application;
- anatomy names match the implementation and accessibility tree;
- behavior and keyboard documentation match tested behavior;
- every public prop and export is documented;
- light, dark, desktop, mobile, reduced-motion, loading, empty, error, and disabled experiences are reviewed where applicable;
- automated tests cover the critical interaction and accessibility contract;
- related-component guidance helps people make an actual selection decision.

## Data components

Data-heavy components require additional guidance for data volume, responsive adaptation, sorting, selection, pagination, loading, empty and filtered-empty states, row actions, formatting, localization, and performance. A table must not be recommended when a list, chart, form, or simpler selection control better supports the task.
