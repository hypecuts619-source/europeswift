const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Remove import statements (single line)
            content = content.replace(/import\s+\{\s*AdSense\s*\}\s+from\s+['"][^'"]+['"];?\n?/g, '');
            
            // Remove AdSense tags
            content = content.replace(/<AdSense[^>]*\/>/g, '');
            
            // Remove commented AdSense tags
            content = content.replace(/\{\/\*\s*<AdSense[^>]*\/>\s*\*\/\}\n?/g, '');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Removed AdSense from ${fullPath}`);
            }
        }
    }
}

walkDir('src');
