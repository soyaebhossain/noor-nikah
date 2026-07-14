import fs from 'fs';

const filePath = 'src/NoorNikah.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Fix size mismatch on line 565
content = content.replace(/<VerifiedBadge size=\{16\} \/>/g, '<VerifiedBadge size={18} />');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✓ Fixed size mismatch!');
