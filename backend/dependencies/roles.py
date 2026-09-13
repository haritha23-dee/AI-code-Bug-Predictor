from .auth import require_role

require_admin = require_role("admin")
require_user = require_role("user", "admin")
require_user_only = require_role("user")