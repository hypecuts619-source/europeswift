import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Mock SEO
jest.mock('./src/components/SEO', () => ({ SEO: () => null }));

// Instead of actual BankSwift, let's see if we can trigger the issue by modifying test.tsx
// wait...
