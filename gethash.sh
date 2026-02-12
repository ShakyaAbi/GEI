#!/bin/bash
# Generate bcrypt hash for 'admin123'
docker exec gei-website-prod node << 'EOF'
import bcrypt from 'bcrypt';
const hash = await bcrypt.hash('admin123', 10);
console.log(hash);
EOF
