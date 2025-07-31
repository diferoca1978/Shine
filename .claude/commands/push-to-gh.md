# Git Workflow Instructions

## Prerequisites Check

### Step 0: Verify SSH Configuration (if needed)

First, check your remote URL to see if you're using SSH:
```bash
git remote -v
```

**If you see URLs starting with `git@github.com:`** - you're using SSH and need proper SSH key setup.

**If you see URLs starting with `https://github.com`** - you can skip SSH setup and use username/password or token authentication.

#### Quick SSH Test
If using SSH, test your connection:
```bash
ssh -T git@github.com
```

**✅ If this succeeds** - Your SSH key is already configured! Skip to the Main Workflow below.

**❌ If this prompts for SSH key input** - This is normal! You'll be prompted during push operations.

**Need to add SSH key to GitHub/GitLab?**

**Paste your SSH public key here:**
```
[PASTE YOUR SSH PUBLIC KEY HERE]
```

**To add your key:**
- Go to GitHub.com → Settings → SSH and GPG keys → New SSH key
- Paste the key above and give it a name
- Click "Add SSH key"

---

## Main Workflow

### Step 1: Check Current Branch
```bash
git branch
```
*Verify you're not on the `main` branch. If you are, create and switch to a feature or dev branch first.*

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

## Step 6: Push to Remote Repository
```bash
# First time pushing this branch
git push -u origin your-branch-name

# Subsequent pushes
git push
```

### SSH Key Input (When Prompted)
If the system asks for your SSH key during push, simply provide it here:

**Enter your SSH key when prompted:**
```
[INPUT YOUR SSH KEY HERE]
```

*This is a normal part of the authentication process - not an error.*

## Step 7: Create Pull Request (Optional)

After pushing your branch, you have several options to create a PR:

### Option 1: GitHub CLI (if installed)
```bash
gh pr create --title "Your PR Title" --body "Description of changes"
```

## Commonly used branches:
- `main` - Production branch
- `dev` - Development branch
- `feature/your-feature-name` - Feature branch


## Important Notes
- **Never commit directly to `main`** - always use feature branches
- Pull latest changes from `main` before starting new work: `git pull origin main`
- Consider rebasing or merging `main` into your feature branch if it's behind
- Delete feature branches after PR is merged to keep repository clean but never delete the dev branch 

## SSH Key Troubleshooting

If you encounter SSH authentication issues during the workflow:

### Common Issues and Solutions
```bash
# Check if SSH agent is running and has your key
ssh-add -l

# Add your SSH key to the agent (if not listed)
ssh-add ~/.ssh/id_ed25519  # or your specific key file

# Test connection
ssh -T git@github.com
```

### Switch Remote URL Type
```bash
# Switch from HTTPS to SSH
git remote set-url origin git@github.com:USERNAME/REPOSITORY.git

# Switch from SSH to HTTPS (if SSH issues persist)
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

### Manual SSH Key Setup (Alternative Method)
If you need to locate your existing SSH key:

**Find your public key:**
```bash
cat ~/.ssh/id_ed25519.pub
# or
cat ~/.ssh/id_rsa.pub
```
---

**Remember**: After pushing your changes, you'll be prompted to create a Pull Request. This allows for code review and controlled merging into the main branch.