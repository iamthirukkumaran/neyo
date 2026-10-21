const fs = require('fs');
const path = require('path');

const subpages = [
  'features/index.html',
  'safety/index.html',
  'download/index.html',
  'contact/index.html',
  'privacy/index.html',
  'terms/index.html',
  'delete-account/index.html',
  'child-safety/index.html'
];

subpages.forEach(sub => {
  const filePath = path.join(__dirname, '..', sub);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace nav-links block
  const oldNav = `<ul class="nav-links">
        <li><a href="../">Home</a></li>
        <li><a href="../features/"`;
  
  if (content.includes('<li><a href="../research/">Research Case Study</a></li>')) {
    return;
  }

  // Insert research link after safety link
  content = content.replace(
    '<li><a href="../safety/"',
    '<li><a href="../safety/"'
  );

  content = content.replace(
    '<li><a href="../download/"',
    '<li><a href="../research/">Research Case Study</a></li>\n        <li><a href="../download/"'
  );

  // Also in footer links
  content = content.replace(
    '<li><a href="../safety/">Safety & Privacy</a></li>',
    '<li><a href="../safety/">Safety & Privacy</a></li>\n            <li><a href="../research/">Research Case Study</a></li>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated nav in', sub);
});
