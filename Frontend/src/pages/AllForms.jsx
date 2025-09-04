import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AllForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchType, setSearchType] = useState('customer');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // default ascending

  const navigate = useNavigate();

  const fetchAllForms = () => {
    setLoading(true);
    fetch('http://localhost:8080/qualityFollowUp')
      .then((res) => {
        if (!res.ok) throw new Error('Misslyckad hämtning av formulär');
        return res.json();
      })
      .then((data) => {
        setForms(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Misslyckad hämtning av formulär / Problem med anslutning till databasen');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllForms();
  }, []);

  const handleSearch = () => {
    if (!searchQuery) {
      fetchAllForms();
      return;
    }

    setLoading(true);
    let url = `http://localhost:8080/qualityFollowUp/search/${searchType}?${searchType}=${searchQuery}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Fel vid sökning');
        return res.json();
      })
      .then((data) => {
        setForms(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Fel vid sökning / Problem med anslutning till databasen');
        setLoading(false);
      });
  };

  const handleSort = (order) => {
    setLoading(true);
    const url = `http://localhost:8080/qualityFollowUp/sort/date/${order}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Fel vid sortering');
        return res.json();
      })
      .then((data) => {
        setForms(data);
        setSortOrder(order);
        setLoading(false);
      })
      .catch(() => {
        setError('Fel vid sortering / Problem med anslutning till databasen');
        setLoading(false);
      });
  };

  if (loading) return <p>Laddar formulär...</p>;

  return (
    <div style={{ padding: '20px' }}>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {/* Sök och sortering */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
      {/* Dropdown för söktyp */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ffb6c1',
          backgroundColor: '#ffe6f0', // ljusrosa
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        <option value="customer">Kund</option>
        <option value="consultant">Konsult</option>
        <option value="seller">Säljare</option>
      </select>

      {/* Textfält för sök */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`Sök efter ${searchType === 'customer' ? 'kund' 
          : searchType === 'consultant' ? 'konsult' : 'säljare'}`}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ffb6c1',
          width: '200px',
        }}
      />

      {/* Sök-knapp */}
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff69b4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transition: 'transform 0.1s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Sök
      </button>

      {/* Sortering */}
      <select
        value={sortOrder}
        onChange={(e) => handleSort(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ffb6c1',
          backgroundColor: '#ffe6f0', // ljusrosa
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        <option value="asc">Datum ↑</option>
        <option value="desc">Datum ↓</option>
      </select>
    </div>


      {/* Inga formulär */}
      {forms.length === 0 && !error && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Inga formulär tillgängliga.</p>
          <button
            onClick={() => navigate('/create')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff69b4',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Skapa nytt formulär
          </button>
        </div>
      )}

      {/* Lista över formulär */}
      {forms.length > 0 && (
        <div
          style={{
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
        >
          {forms.map((form) => (
            <div
              key={form.id}
              onClick={() => navigate(`/view/${form.id}`)}
              style={{
                padding: '15px',
                border: '1px solid #ffb6c1',
                borderRadius: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <p><strong>Kund:</strong> {form.customer}</p>
              <p><strong>Konsult:</strong> {form.consultant}</p>
              <p><strong>Säljare:</strong> {form.seller}</p>
              <p><strong>Datum:</strong> {form.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllForms;
