import * as React from 'react';
import{ createRoot } from 'react-dom/client';
import App from './App';
import '../styles/index.css';
import '../styles/vscode.css';

export function main() {
  const rootElement = document.getElementById('root') ;
  if (rootElement != null) {
    const root = createRoot(rootElement);
    root.render(<React.StrictMode>
      <App />
    </React.StrictMode>);
  }
}
