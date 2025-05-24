import React from 'react';
import RecipesTable from './components/RecipesTable';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe Browser</h1>
      <RecipesTable />
    </div>
  );
}
