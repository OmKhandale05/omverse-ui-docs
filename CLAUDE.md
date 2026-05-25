# CRITICAL RULES — Read first

## Git — NEVER touch
NEVER run any git command under any circumstances.
Not git add, git commit, git push, git reset,
git rebase, git merge or anything else.

Only create and modify files.
The user runs all git commands themselves.
This rule overrides everything else.

## Commits
Do not suggest commit messages unless asked.
Do not remind the user to commit.
Just build the files and stop.

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
1. ALWAYS ask me before committing:
   > "Ready to commit with message:
   > `feat(button): add button page with all variants`
   > Proceed? (yes/no)"

2. NEVER run `git push` automatically — always ask first:
   > "Ready to push to origin/main. Proceed? (yes/no)"

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
- Wait for my approval
