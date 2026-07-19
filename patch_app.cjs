const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

const legacyRedirects = `
                {/* Legacy Redirects */}
                <Route path="hong-kong/*" element={<Navigate to="/swift/hong-kong-sar-china" replace />} />
                <Route path="macao/*" element={<Navigate to="/swift/macao-sar-china" replace />} />
                <Route path="runion/*" element={<Navigate to="/swift/reunion" replace />} />
                <Route path="cte-divoire/*" element={<Navigate to="/swift/cote-divoire" replace />} />
                <Route path="macedonia/*" element={<Navigate to="/swift/north-macedonia" replace />} />
                <Route path="saint-lucia/*" element={<Navigate to="/swift/st-lucia" replace />} />
                <Route path="st-vincent-and-grenadines/*" element={<Navigate to="/swift/st-vincent-grenadines" replace />} />
                <Route path="saint-kitts-and-nevis/*" element={<Navigate to="/swift/st-kitts-nevis" replace />} />
                <Route path="saint-pierre-and-miquelon/*" element={<Navigate to="/swift/st-pierre-miquelon" replace />} />
                <Route path="congo-democratic-republic/*" element={<Navigate to="/swift/congo-kinshasa" replace />} />
                <Route path="congo-republic/*" element={<Navigate to="/swift/congo-brazzaville" replace />} />
                <Route path="curaao/*" element={<Navigate to="/swift/cura-ao" replace />} />
                <Route path="swaziland/*" element={<Navigate to="/swift/eswatini" replace />} />
                <Route path="virgin-islands-uk/*" element={<Navigate to="/swift/british-virgin-islands" replace />} />
                <Route path="turks-and-caicos-islands/*" element={<Navigate to="/swift/turks-caicos-islands" replace />} />
`;

app = app.replace(
    '<Route path="swift">',
    '<Route path="swift">\n' + legacyRedirects
);

fs.writeFileSync('src/App.tsx', app);
