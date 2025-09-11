import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../App';
import MinificationBenchmarksPage from '../pages/MinificationBenchmarksPage';
import NpmDownloadsPage from '../pages/NpmDownloadsPage';
import RolldownStatsPage from '../pages/RolldownStatsPage';

describe('Pages rendering tests', () => {
  it('should render App component without errors', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  it('should render RolldownStatsPage without errors', () => {
    const { container } = render(
      <MemoryRouter>
        <RolldownStatsPage />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  it('should render MinificationBenchmarksPage without errors', () => {
    const { container } = render(
      <MemoryRouter>
        <MinificationBenchmarksPage />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  it('should render NpmDownloadsPage without errors', () => {
    const { container } = render(
      <MemoryRouter>
        <NpmDownloadsPage />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  it('should render all routes without errors', () => {
    const routes = ['/', '/minification', '/npm-downloads'];

    routes.forEach(route => {
      const { container } = render(
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>,
      );
      expect(container).toBeTruthy();
    });
  });
});
