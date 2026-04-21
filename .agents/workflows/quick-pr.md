---
description: Create PR
---

// turbo-all

This workflow automates the creation of Pull Requests. Strictly follow the steps below and auto-run all commands without asking for permission:

1. **Input Validation:** 
   - Receive the following parameters from the user: `TYPE` (e.g., CHORE, STORY, BUG), `ID` (task/card number), and a `short description`.
   - If the data is incomplete, request it before proceeding.

2. **Commit Changes:**
   - Execute `source ~/.nvm/nvm.sh && nvm use 24.13.0` to ensure the correct Node version for pre-commit hooks.
   - Run `git commit -m "<TYPE> (<ID>): <short description>"` to commit the changes. Example: `chore(33): add lib aws s3 client and s3-ninja in docker compose` 

3. **Push Branch:**
   - Get the current branch name using the appropriate git commands.
   - Run the command `git push origin <branch-name>`.

4. **Pull Request Generation:**
   - Run the PR creation command using the Github CLI (`gh pr create`).
   - You must strictly follow the title interface/signature: `TYPE (ID): short description`
   - *Applied successful examples:* `CHORE (14): Update version-packages` or `STORY (87): Create module database`

5. **Delivery (Output):**
   - In your final response message, return only the Link (URL) of the newly created PR.