import re

with open("src/NoorNikah.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace line 359
content = content.replace(
    '{p.verified && <span className="verified-badge" title="বারাকাহ ভেরিফায়েড">✓</span>}',
    '{p.verified && <VerifiedBadge size={18} />}'
)

# Replace line 365
content = content.replace(
    '<span className="verified-badge">✓</span><span>বারাকাহ ভেরিফায়েড প্রোফাইল</span>',
    '<VerifiedBadge size={16} /><span>বারাকাহ ভেরিফায়েড প্রোফাইল</span>'
)

# Replace line 565
content = content.replace(
    '<span className="eyebrow"><span className="verified-badge">✓</span> প্রিমিয়াম ভেরিফিকেশন সেবা</span>',
    '<span className="eyebrow"><VerifiedBadge size={18} /> প্রিমিয়াম ভেরিফিকেশন সেবা</span>'
)

with open("src/NoorNikah.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("✓ All replacements done!")
