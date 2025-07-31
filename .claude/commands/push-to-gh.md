# Git Workflow Instructions

## Main Workflow

### Step 1: Check Current Branch
```bash
git branch
```
*Verify you're not on the `main` branch. If you are, switch to a dev branch first or create it.*

### Additional Prerequisites
- Ensure you're working on a feature branch (not `main`)
- Your changes are ready to be committed

## Step 2: Create Feature Branch (if needed)
```bash
#Create and switch to dev branch
git checkout -b dev

# Or switch to existing dev branch
git checkout your-branch-name
```

## Step 3: Stage Your Changes
```bash
# Stage all changes
git add .
```

## Step 4: Check Staged Changes
```bash
git status
```

## Step 5: Commit Your Changes
```bash
git commit -m "Your descriptive commit message"
```

### Commit Message Best Practices:
- Avoid to use any reference to claude code or any other tool¡
- Use present tense ("Add feature" not "Added feature")
- Keep it concise but descriptive
- Start with a capital letter
- Don't end with a period

## Commonly used branches:
- `main` - Production branch
- `dev` - Development branch
- `feature/your-feature-name` - Feature branch


## Important Notes
- **Never commit directly to `main`** - always use dev branch or feature branches if exists
- **Never make the push**
- Consider merging `main` into your feature branch if it's behind
