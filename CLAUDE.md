# CRITICAL RULES — Read first

## Git — explicit user authorization required
Do not run Git commands unless the user explicitly asks for Git work.

When the user explicitly asks to commit or push:
- Inspect the working tree before staging.
- Preserve unrelated user changes and never use destructive Git commands.
- Use Conventional Commits for commit messages.
- Commit only the changes within the requested scope.
- Push only when the user explicitly requests a push and states or confirms the target branch.

Explicit authorization to commit does not automatically authorize pushing,
and authorization to push does not authorize force-pushing.

## Commits
Do not suggest commit messages unless asked.
Do not remind the user to commit.
When asked, follow the Git rules below.

---

@AGENTS.md

## Git rules

### Commit format (Conventional Commits)
`<type>(<scope>): <short description>`

Types:
- `feat`: new feature or page
- `fix`: bug fix
- `style`: UI/design changes
- `refactor`: code restructure
- `docs`: documentation
- `chore`: config, deps, setup

Examples:
```
feat(button): add button component page with all variants
fix(code-block): fix syntax highlighting for strings
style(navbar): improve active link indicator
chore(deps): update omverse-ui to v0.1.5
```

### Rules
1. An explicit user request to commit is approval to commit. Show the changed
   files and proposed message before committing, but do not ask for duplicate
   confirmation unless the scope or target is ambiguous.

2. Run `git push` only when the user explicitly requests it. An explicit push
   request that identifies the target branch is approval; never force-push.

3. NEVER commit `node_modules`, `.env`, or build files

4. Always run `git status` before committing
   so I can see what files changed

5. One commit per feature/page — not one
   giant commit for everything

6. Commit message must describe WHAT changed
   and WHY, not HOW

### Before every commit show me:
- List of changed files (`git status`)
- Proposed commit message
- Proceed when the user's explicit request already provides approval
