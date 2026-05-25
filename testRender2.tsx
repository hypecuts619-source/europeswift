import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock SEO
jest.mock('./src/components/SEO', () => ({
  SEO: () => null
}));

import { BankSwift } from './src/pages/swift/BankSwift';

try {
  const html = renderToString(
    <MemoryRouter initialEntries={['/swift/ar/t-p-c-g-capital-s-a-']}>
      <Routes>
        <Route path="/swift/:countrySlug/:bankSlug/:bicCode?" element={<BankSwift />} />
      </Routes>
    </MemoryRouter>
  );
  console.log("RENDER SUCCESS, HTML length:", html.length);
} catch (err) {
  console.error("RENDER ERROR:", err);
}
