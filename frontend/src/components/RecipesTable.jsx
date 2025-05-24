import React, { useEffect, useState } from 'react';
import { fetchRecipes, searchRecipes } from '../api/recipes';
import StarRating from './StarRating';
import DrawerDetail from './DrawerDetail';
import FilterInputs from './FilterInputs';
import { truncate, formatTime } from '../utils/helpers';

const DEFAULT_LIMITS = [15, 25, 50];

const RecipesTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMITS[0]);
  const [filters, setFilters] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      let response;
      const hasFilters = Object.values(filters).some((val) => val && val.trim() !== '');

      if (hasFilters) {
        const params = {
          ...filters,
          page,
          limit,
        };
        response = await searchRecipes(params);
        const data = response.data.data || [];
        setRecipes(data);
        setTotal(data.length); 
        setNoData(data.length === 0);
      } else {
        response = await fetchRecipes({ page, limit });
        const { data, total: tot } = response.data;
        setRecipes(data);
        setTotal(tot);
        setNoData(tot === 0);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setRecipes([]);
      setTotal(0);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, limit, filters]);

  const handleRowClick = (recipe) => setSelectedRecipe(recipe);
  const closeDrawer = () => setSelectedRecipe(null);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <FilterInputs filters={filters} setFilters={setFilters} />

      {loading && <p>Loading recipes...</p>}

      {!loading && noData && <p>No recipes found matching your criteria.</p>}

      {!loading && !noData && (
        <>
          <table className="recipes-table">
            <thead>
              <tr>
                <th style={{ maxWidth: '150px' }}>Title</th>
                <th>Cuisine</th>
                <th>Rating</th>
                <th>Total Time</th>
                <th>Serves</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((r) => (
                <tr key={r.id || r._id?.$oid} onClick={() => handleRowClick(r)} tabIndex={0}>
                  <td title={r.title}>{truncate(r.title, 20)}</td>
                  <td>{r.cuisine || '-'}</td>
                  <td><StarRating rating={r.rating || 0} /></td>
                  <td>{formatTime(r.total_time)}</td>
                  <td>{r.serves || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              Prev
            </button>

            <span>Page {page} of {totalPages || 1}</span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
              aria-label="Next page"
            >
              Next
            </button>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1); 
              }}
              aria-label="Select results per page"
            >
              {DEFAULT_LIMITS.map((opt) => (
                <option key={opt} value={opt}>{opt} per page</option>
              ))}
            </select>
          </div>
        </>
      )}

      <DrawerDetail recipe={selectedRecipe} onClose={closeDrawer} />
    </div>
  );
};

export default RecipesTable;
