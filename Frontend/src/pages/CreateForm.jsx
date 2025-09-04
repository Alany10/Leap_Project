import React, { useState } from 'react';

const fieldLabels = {
  customer: 'Kund',
  consultant: 'Konsult',
  seller: 'Säljare',
  date: 'Datum',
  consultantInformedDate: 'Konsult informerad',
  startup: 'Uppstart - [Förståelse, startsträcka, rätt förutsättningar för att klara uppdraget, dator och miljöer]',
  result: 'Resultat - [Kompetens, levererar, kvalitet, tid]',
  responsibility: 'Ansvar - [Samarbete, hjälper och frågar, står för åtaganden, flaggar]',
  simplicity: 'Enkelhet - [Göra det svåra enkelt, enkel kommunikation]',
  joy: 'Glädje - [Tillför Energi, kul att jobba med]',
  innovation: 'Innovation - [Kreativ, kommer med förslag och idéer, kliver fram]',
  satisfactionConsult: 'Nöjdhet - [Hur nöjd med konsulten?]',
  satisfactionCompany: 'Nöjdhet - [Hur nöjd med HiQ?]',
  improvements: 'Förbättringar - [Vad kan förbättras?]',
  valueAssessmentPositive: 'Värdeomdömen - [Positivt]',
  valueAssessmentNegative: 'Värdeomdömen - [Negativt]',
  other: 'Övrigt',
  nextFollowUp: 'Nästa uppföljning',
};

function CreateForm() {
  const initialForm = {
    customer: '',
    consultant: '',
    seller: '',
    date: '',
    consultantInformedDate: '',
    startup: '',
    result: '',
    responsibility: '',
    simplicity: '',
    joy: '',
    innovation: '',
    satisfactionConsult: '',
    satisfactionCompany: '',
    improvements: '',
    valueAssessmentPositive: '',
    valueAssessmentNegative: '',
    other: '',
    nextFollowUp: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const isNumber = (key) =>
    key === 'satisfactionConsult' || key === 'satisfactionCompany';
  const isDate = (key) =>
    key === 'date' || key === 'consultantInformedDate' || key === 'nextFollowUp';

  const renderLabel = (key) => {
    const parts = fieldLabels[key].split(' - ');
    return (
      <>
        <strong>{parts[0]}</strong>
        {parts[1] ? ' - ' + parts[1] : ''}
      </>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nummerfält 1–10
    if (isNumber(name)) {
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: 'Värdet måste vara mellan 1 och 10' }));
      }
    }

    // Datumfält validering
    if (isDate(name)) {
      if (value) {
        const [year, month, day] = value.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);

        if (
          dateObj.getFullYear() === year &&
          dateObj.getMonth() === month - 1 &&
          dateObj.getDate() === day
        ) {
          if (year >= 2000 && year <= 2050) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
          } else {
            setErrors((prev) => ({ ...prev, [name]: 'Året måste vara mellan 2000 och 2050' }));
          }
        } else {
          setErrors((prev) => ({ ...prev, [name]: 'Ogiltigt datum' }));
        }
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Slutlig validering nummerfält
    const satisfactionFields = ['satisfactionConsult', 'satisfactionCompany'];
    for (const key of satisfactionFields) {
      const value = parseInt(formData[key], 10);
      if (isNaN(value) || value < 1 || value > 10) {
        setErrors((prev) => ({ ...prev, [key]: 'Värdet måste vara mellan 1 och 10' }));
        return;
      }
    }

    // Slutlig validering datumfält
    const dateFields = ['date', 'consultantInformedDate', 'nextFollowUp'];
    for (const key of dateFields) {
      if (formData[key]) {
        const [year, month, day] = formData[key].split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);

        if (
          dateObj.getFullYear() !== year ||
          dateObj.getMonth() !== month - 1 ||
          dateObj.getDate() !== day
        ) {
          setErrors((prev) => ({ ...prev, [key]: 'Ogiltigt datum' }));
          return;
        }

        if (year < 2000 || year > 2050) {
          setErrors((prev) => ({ ...prev, [key]: 'Året måste vara mellan 2000 och 2050' }));
          return;
        }
      }
    }

    try {
      const response = await fetch('http://localhost:8080/qualityFollowUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        alert('Fel: ' + error);
      } else {
        const savedForm = await response.json();
        alert('Formulär sparat med id: ' + savedForm.id);
        setFormData(initialForm);
        setErrors({});
      }
    } catch (err) {
      console.error(err);
      alert('Något gick fel vid kommunikationen med backend');
    }
  };

  return (
    <div>
      <h1>Skapa nytt formulär</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        {/* Rad 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {['customer', 'consultant', 'seller', 'date', 'consultantInformedDate'].map((key) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
              <label>{renderLabel(key)}</label>
              <input
                type={isDate(key) ? 'text' : 'text'} // type=text för manuell validering
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={isDate(key) ? 'YYYY-MM-DD' : isNumber(key) ? '1-10' : 'Ange text'}
                style={{
                  padding: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ffb6c1',
                }}
              />
              {errors[key] && <span style={{ color: 'red', fontSize: '12px' }}>{errors[key]}</span>}
            </div>
          ))}
        </div>

        {/* Rad 2–7 */}
        {['startup', 'result', 'responsibility', 'simplicity', 'joy', 'innovation'].map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{renderLabel(key)}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
                placeholder={isDate(key) ? 'YYYY-MM-DD' : isNumber(key) ? '1-10' : 'Ange text'}
              style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ffb6c1',
                width: '50%',
              }}
            />
          </div>
        ))}

        {/* Rad 8 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {['satisfactionConsult', 'satisfactionCompany'].map((key) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
              <label>{renderLabel(key)}</label>
                <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={isDate(key) ? 'YYYY-MM-DD' : isNumber(key) ? '1-10' : 'Ange text'}
                style={{
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ffb6c1',
                    width: '50%',
                }}
                />
              {errors[key] && <span style={{ color: 'red', fontSize: '12px' }}>{errors[key]}</span>}
            </div>
          ))}
        </div>

        {/* improvements på egen rad */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>{renderLabel('improvements')}</label>
        <input
            type="text"
            name="improvements"
            value={formData['improvements']}
            onChange={handleChange}
            placeholder={isDate('improvements') ? 'YYYY-MM-DD' : isNumber('improvements') ? '1-10' : 'Ange text'}
            style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ffb6c1',
            width: '50%',
            }}
        />
        {errors['improvements'] && <span style={{ color: 'red', fontSize: '12px' }}>{errors['improvements']}</span>}
        </div>

        {/* valueAssessmentPositive & valueAssessmentNegative på samma rad */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {['valueAssessmentPositive', 'valueAssessmentNegative'].map((key) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label>{renderLabel(key)}</label>
            <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={isDate(key) ? 'YYYY-MM-DD' : isNumber(key) ? '1-10' : 'Ange text'}
                style={{
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ffb6c1',
                }}
            />
            {errors[key] && <span style={{ color: 'red', fontSize: '12px' }}>{errors[key]}</span>}
            </div>
        ))}
        </div>

        {/* other på egen rad */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>{renderLabel('other')}</label>
        <input
            type="text"
            name="other"
            value={formData['other']}
            onChange={handleChange}
            placeholder={isDate('other') ? 'YYYY-MM-DD' : isNumber('other') ? '1-10' : 'Ange text'}
            style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ffb6c1',
            width: '50%',
            }}
        />
        {errors['other'] && <span style={{ color: 'red', fontSize: '12px' }}>{errors['other']}</span>}
        </div>

        {/* nextFollowUp på egen rad */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>{renderLabel('nextFollowUp')}</label>
        <input
            type="text"
            name="nextFollowUp"
            value={formData['nextFollowUp']}
            onChange={handleChange}
            placeholder={isDate('nextFollowUp') ? 'YYYY-MM-DD' : isNumber('nextFollowUp') ? '1-10' : 'Ange text'}
            style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ffb6c1',
            width: '10%',
            }}
        />
        {errors['nextFollowUp'] && <span style={{ color: 'red', fontSize: '12px' }}>{errors['nextFollowUp']}</span>}

        </div>
                <button
                type="submit"
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
                Skapa
                </button>
            </form>
            </div>
    );
}

export default CreateForm;
