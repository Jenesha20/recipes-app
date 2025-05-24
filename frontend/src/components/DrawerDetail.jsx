import React, { useState } from 'react';
import { formatTime } from '../utils/helpers';

const nutritionFields = [
  'calories',
  'carbohydrateContent',
  'cholesterolContent',
  'fiberContent',
  'proteinContent',
  'saturatedFatContent',
  'sodiumContent',
  'sugarContent',
  'fatContent',
];

const DrawerDetail = ({ recipe, onClose }) => {
  const [expanded, setExpanded] = useState(false);

  if (!recipe) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <header className="drawer-header">
          <h2>{recipe.title}</h2>
          <p><em>{recipe.cuisine}</em></p>
          <button onClick={onClose} aria-label="Close drawer">&times;</button>
        </header>

        <div className="drawer-content">
          <div className="detail-row">
            <strong>Description:</strong>
            <p>{recipe.description || '-'}</p>
          </div>

          <div className="detail-row">
            <strong>
              Total Time: {formatTime(recipe.total_time)}{' '}
              <button
                aria-expanded={expanded}
                aria-controls="prepCookTimes"
                onClick={() => setExpanded(!expanded)}
                className="expand-button"
                title={expanded ? 'Collapse' : 'Expand'}
              >
                {expanded ? '▲' : '▼'}
              </button>
            </strong>
            {expanded && (
              <div id="prepCookTimes" className="nested-times">
                <div>Cook Time: {formatTime(recipe.cook_time)}</div>
                <div>Prep Time: {formatTime(recipe.prep_time)}</div>
              </div>
            )}
          </div>

          <section>
            <h3>Nutrition</h3>
            <table className="nutrition-table">
              <tbody>
                {nutritionFields.map((field) => (
                  <tr key={field}>
                    <td>{field.replace(/([A-Z])/g, ' $1')}</td>
                    <td>{recipe.nutrients?.[field] || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DrawerDetail;
