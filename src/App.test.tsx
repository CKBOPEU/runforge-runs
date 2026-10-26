import { render, screen, waitFor, fireEvent } from '@testing-library/react'; import { describe, it, expect } from 'vitest'; import App from './App';
describe('runs dashboard',()=>{it('searches by repository and run name',async()=>{render(<App/>); expect(await screen.findByText('Release candidate')).toBeInTheDocument(); fireEvent.change(screen.getByLabelText(/search by run/i),{target:{value:'commerce/api'}}); expect(screen.getByText('Fix checkout tests')).toBeInTheDocument(); expect(screen.queryByText('Release candidate')).not.toBeInTheDocument()});it('filters by status',async()=>{render(<App/>); await screen.findByText('Release candidate'); fireEvent.click(screen.getByRole('button',{name:'failed'})); expect(screen.getByText('Mobile smoke suite')).toBeInTheDocument(); expect(screen.queryByText('Release candidate')).not.toBeInTheDocument()});it('opens details and closes with Escape',async()=>{render(<App/>); await screen.findByText('Release candidate'); fireEvent.click(screen.getByText('Release candidate')); expect(screen.getByRole('dialog')).toHaveTextContent('Started agent workspace'); fireEvent.keyDown(document,{key:'Escape'}); await waitFor(()=>expect(screen.queryByRole('dialog')).not.toBeInTheDocument())})});

it('combines search and status and resets an empty result', async () => {
  render(<App />);
  await screen.findByText('Release candidate');
  fireEvent.change(screen.getByLabelText(/search by run/i), { target: { value: 'COMMERCE/API' } });
  fireEvent.click(screen.getByRole('button', { name: 'failed' }));
  expect(screen.getByText(/no runs match/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /reset filters/i }));
  expect(screen.getByText('Release candidate')).toBeInTheDocument();
  expect(screen.getByLabelText(/search by run/i)).toHaveValue('');
});

it('shows an error then loads runs after retry', async () => {
  window.history.replaceState({}, '', '/?error=1');
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Runs are unavailable');
  fireEvent.click(screen.getByRole('button', { name: /try again/i }));
  expect(await screen.findByText('Release candidate')).toBeInTheDocument();
  window.history.replaceState({}, '', '/');
});
