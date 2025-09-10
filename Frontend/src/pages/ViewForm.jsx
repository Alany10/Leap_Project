import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const fieldLabels = {
  customer: 'Kund',
  consultant: 'Konsult',
  seller: 'Säljare',
  date: 'Datum',
  consultantInformedDate: 'Konsult informerad',
  startup: 'Uppstart',
  result: 'Resultat',
  responsibility: 'Ansvar',
  simplicity: 'Enkelhet',
  joy: 'Glädje',
  innovation: 'Innovation',
  satisfactionConsult: 'Nöjdhet Konsult',
  satisfactionCompany: 'Nöjdhet HiQ',
  improvements: 'Förbättringar',
  valueAssessmentPositive: 'Värdeomdömen Positivt',
  valueAssessmentNegative: 'Värdeomdömen Negativt',
  other: 'Övrigt',
  nextFollowUp: 'Nästa uppföljning',
};

function ViewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const isNumber = (key) => key === 'satisfactionConsult' || key === 'satisfactionCompany';
  const isDate = (key) => key === 'date' || key === 'consultantInformedDate' || key === 'nextFollowUp';
  const renderLabel = (key) => <strong>{fieldLabels[key]}</strong>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetch(`http://localhost:8080/qualityFollowUp/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Formulär hittades inte');
        return res.json();
      })
      .then((data) => {
        setFormData(data);
        setOriginalData(data); // spara originaldata
        setLoading(false);
      })
      .catch(() => {
        setError('Misslyckades med att hämta formuläret / Problem med anslutning till databasen');
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    if (!window.confirm('Är du säker på att du vill spara ändringarna?')) return;

    try {
      const response = await fetch(`http://localhost:8080/qualityFollowUp/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        alert('Fel: ' + error);
      } else {
        const updatedForm = await response.json();
        setFormData(updatedForm);
        setOriginalData(updatedForm);
        setIsEditing(false);
        alert('Formulär uppdaterat!');
      }
    } catch (err) {
      console.error(err);
      alert('Något gick fel vid kommunikationen med backend');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Är du säker på att du vill radera detta formulär?')) return;

    try {
      const response = await fetch(`http://localhost:8080/qualityFollowUp/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.text();
        alert('Fel: ' + error);
      } else {
        alert('Formulär raderat!');
        navigate('/all');
      }
    } catch (err) {
      console.error(err);
      alert('Något gick fel vid kommunikationen med backend');
    }
  };

  if (loading) return <p>Laddar formulär...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Formulärdetaljer</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
  <button
    onClick={() => {
      if (isEditing) {
        setFormData(originalData); // återställ vid avbryt
      }
      setIsEditing(!isEditing);
    }}
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
    {isEditing ? 'Avbryt redigering' : 'Redigera'}
  </button>

  {isEditing && (
    <button
      onClick={handleSave}
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
      Spara ändringar
    </button>
  )}

  <button
    onClick={handleDelete}
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
    Radera
  </button>
</div>


      {/* Rad 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {['customer', 'consultant', 'seller', 'date', 'consultantInformedDate'].map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{renderLabel(key)}</label>
            <input
              type={isDate(key) ? 'date' : isNumber(key) ? 'number' : 'text'}
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder={isDate(key) ? 'YYYY-MM-DD' : isNumber(key) ? '1-10' : 'Ange text'}
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ffb6c1',
                backgroundColor: isEditing ? '#fff' : '#f5f5f5',
              }}
            />
          </div>
        ))}
      </div>

      {/* Rad 2–7 */}
      {['startup', 'result', 'responsibility', 'simplicity', 'joy', 'innovation'].map((key) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <label>{renderLabel(key)}</label>
          <input
            type="text"
            name={key}
            value={formData[key] || ''}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Ange text"
            style={{
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ffb6c1',
              width: '50%',
              backgroundColor: isEditing ? '#fff' : '#f5f5f5',
            }}
          />
        </div>
      ))}

      {/* Rad 8: satisfaction */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
        {['satisfactionConsult', 'satisfactionCompany'].map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{renderLabel(key)}</label>
            <input
              type="number"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="1-10"
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ffb6c1',
                width: '50%',
                backgroundColor: isEditing ? '#fff' : '#f5f5f5',
              }}
            />
          </div>
        ))}
      </div>

      {/* improvements */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
        <label>{renderLabel('improvements')}</label>
        <input
          type="text"
          name="improvements"
          value={formData['improvements'] || ''}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Ange text"
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ffb6c1',
            width: '50%',
            backgroundColor: isEditing ? '#fff' : '#f5f5f5',
          }}
        />
      </div>

      {/* valueAssessmentPositive & valueAssessmentNegative */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
        {['valueAssessmentPositive', 'valueAssessmentNegative'].map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{renderLabel(key)}</label>
            <input
              type="text"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Ange text"
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ffb6c1',
                backgroundColor: isEditing ? '#fff' : '#f5f5f5',
              }}
            />
          </div>
        ))}
      </div>

      {/* other */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
        <label>{renderLabel('other')}</label>
        <input
          type="text"
          name="other"
          value={formData['other'] || ''}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Ange text"
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ffb6c1',
            width: '50%',
            backgroundColor: isEditing ? '#fff' : '#f5f5f5',
          }}
        />
      </div>

      {/* nextFollowUp */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
        <label>{renderLabel('nextFollowUp')}</label>
        <input
          type="text"
          name="nextFollowUp"
          value={formData['nextFollowUp'] || ''}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="YYYY-MM-DD"
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ffb6c1',
            width: '20%',
            backgroundColor: isEditing ? '#fff' : '#f5f5f5',
          }}
        />
      </div>
    </div>
  );
}

export default ViewForm;
