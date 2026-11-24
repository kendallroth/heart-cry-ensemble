################################################################################
# Setup
################################################################################

setup: setup_git_hooks setup_env_files

# Apply Git hooks
setup_git_hooks:
	cp setup/git/* .git/hooks/
	chmod u+x .git/hooks/*

# Copy required environment files
#   NOTE: Gracefully handle errors when copying files only if not existing before
setup_env_files:
	cp -np web/.env.example web/.env || true
