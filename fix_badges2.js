import fs from 'fs';

const filePath = 'src/NoorNikah.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

let count = 0;

// Replace verified-badge with VerifiedBadge component
// Pattern 1: <span className="verified-badge" title="...">✓</span>
content = content.replace(/<span className="verified-badge" title="[^"]*">✓<\/span>/g, '<VerifiedBadge size={18} />');
count += (content.match(/<VerifiedBadge size={18} \/>/g) || []).length;

// Pattern 2: <span className="verified-badge">✓</span> (without title)
content = content.replace(/<span className="verified-badge">✓<\/span>/g, '<VerifiedBadge size={16} />');

// Pattern 3: Large badge <span className="verified-badge" style="...">✓</span>
content = content.replace(/<span className="verified-badge" style=\{\{ width: 42, height: 42, fontSize: 24 \}\}>✓<\/span>/g, '<VerifiedBadge size={42} />');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✓ All replacements done!');
