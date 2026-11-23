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
	cp -np api/.env.example api/.env || true
	cp -np app/.env.example app/.env || true
	cp -np web/.env.example web/.env || true

################################################################################
# Code quality
################################################################################

# NOTE: Consider settings volume/container user to match host user for file permissions (if needed)
format:
	prettier --write "app/**/*.(js|vue)" "api/**/*.js" "web/**/*.(js|vue)"