const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/hp/Downloads/portfilio/uday-portfolio/src/components';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
    
    // Luxury Hex Mapping
    content = content.replace(/#3b82f6/gi, '#D4AF37'); // Blue -> Gold Action
    content = content.replace(/#050505/g, '#0B0B0F'); // Backgrounds -> Deep Charcoal
    content = content.replace(/#020202/g, '#0B0B0F'); 
    content = content.replace(/#0a0a0a/g, '#111116'); 
    content = content.replace(/#f5f5f5/gi, '#EAEAEA'); // Text -> Soft White
    
    // Replace hardcoded tailwind blue classes
    content = content.replace(/blue-500/g, 'yellow-600'); 
    content = content.replace(/blue-400/g, 'yellow-500'); 

    fs.writeFileSync(path.join(srcDir, file), content);
});

console.log("Colors updated across all components.");
