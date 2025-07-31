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
- SSH authentication is working (if using SSH URLs)

## Step 2: Create Feature Branch (if needed)
```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Or switch to existing feature branch
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
- Use present tense ("Add feature" not "Added feature")
- Keep it concise but descriptive
- Start with a capital letter
- Don't end with a period
- Avoid any reference to claude code or any other tool¡

## Commonly used branches:
- `main` - Production branch
- `dev` - Development branch
- `feature/your-feature-name` - Feature branch


## Important Notes
- **Never commit directly to `main`** - always use feature branches
- Consider merging `main` into your feature branch if it's behind
