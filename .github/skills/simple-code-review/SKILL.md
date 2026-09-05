---
name: simple-code-review
description: 'Review changed code for bugs, regressions, security issues, maintainability problems, and missing tests. Use when the user asks for a code review, diff review, PR review, or feedback on implementation changes.'
argument-hint: 'Optional: specify a file, feature, or review focus'
user-invocable: true
disable-model-invocation: false
---

# Simple Code Review

Review code changes and report only actionable findings. Do not modify files unless the user separately asks for fixes.

## Procedure

1. Identify the review scope from the user's request. If no scope is given, review the current working-tree diff.
2. Read the changed files and enough surrounding code to understand their contracts and call sites.
3. Check for:
   - Incorrect behavior, edge cases, and error handling gaps
   - Regressions in existing workflows or public interfaces
   - Security, privacy, and credential-handling problems
   - Missing validation, tests, or important loading and empty states
   - Unnecessary complexity that could make future changes risky
4. Run the narrowest relevant test, type check, lint, or build command when available. Do not change code to make the check pass.
5. Report findings ordered by severity. Include a file link and line number for every finding, explain the impact, and give a concise fix direction.

## Review Rules

- Report real risks, not stylistic preferences.
- Prefer a small number of high-confidence findings over exhaustive commentary.
- Treat unrelated pre-existing issues as out of scope unless they block the reviewed change.
- Do not expose secrets found in files; identify the credential leak without repeating its value.
- If no issues are found, say so clearly and mention remaining test or runtime gaps.

## Output Format

### Findings

For each issue:

- **[Severity] Short title**
- **Location:** `path/to/file:line`
- **Impact:** What can fail or regress.
- **Recommendation:** The smallest reasonable direction for fixing it.

Use `Critical`, `High`, `Medium`, or `Low` severity.

### Open Questions

List assumptions or areas that could not be verified.

### Validation

List commands run and whether they passed, failed, or were unavailable.
