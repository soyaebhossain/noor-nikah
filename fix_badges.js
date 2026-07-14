import fs from 'fs';

const filePath = 'src/NoorNikah.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace line 359
content = content.replace(
    '{p.verified && <span className="verified-badge" title="বারাকাহ ভেরিফায়েড">✓</span>}',
    '{p.verified && <VerifiedBadge size={18} />}'
);

// Replace line 365
content = content.replace(
    '<span className="verified-badge">✓</span><span>বারাকাহ ভেরিফায়েড প্রোফাইল</span>',
    '<VerifiedBadge size={16} /><span>বারাকাহ ভেরিফায়েড প্রোফাইল</span>'
);

// Replace line 565
content = content.replace(
    '<span className="eyebrow"><span className="verified-badge">✓</span> প্রিমিয়াম ভেরিফিকেশন সেবা</span>',
    '<span className="eyebrow"><VerifiedBadge size={18} /> প্রিমিয়াম ভেরিফিকেশন সেবা</span>'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✓ All replacements done!');
