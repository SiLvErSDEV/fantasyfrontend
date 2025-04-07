import React, { useState, useEffect } from 'react';

const TeamSelection = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    goalkeepers: false,
    defenders: false,
    midfielders: false,
    forwards: false,
  });
  const [expandedTeams, setExpandedTeams] = useState({});
  const [fieldPlayers, setFieldPlayers] = useState({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://fantasyfootball-comc.onrender.com/api/players');
        if (!response.ok) {
          throw new Error('Error al cargar los jugadores');
        }
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Estilos generales
  const containerStyle = {
    display: 'flex',
    backgroundColor: '#000000',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '20px',
  };

  const leftSectionStyle = {
    flex: 1,
    paddingRight: '20px',
    position: 'sticky',
    top: '20px',
    alignSelf: 'flex-start',
  };

  const rightSectionStyle = {
    flex: 1,
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 40px)',
    paddingBottom: '20px',
  };

  // Estilos del campo
  const fieldStyle = {
    width: '100%',
    height: '70vh',
    backgroundColor: '#228B22',
    position: 'relative',
    border: '2px solid #ffffff',
    borderRadius: '10px',
  };

  const positionSlotStyle = {
    position: 'absolute',
    width: '40px',
    height: '60px',
    border: '2px dashed #ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#ffffff',
    fontSize: '10px',
    cursor: 'pointer',
    padding: '2px',
  };

  const jerseyStyle = {
    width: '30px',
    height: '40px',
    objectFit: 'contain',
  };

  const playerInfoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: '8px',
    textAlign: 'center',
  };

  const flagStyle = {
    width: '20px',
    height: '12px',
    objectFit: 'contain',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#FF69B4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
  };

  // Estilos de las tablas
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    backgroundColor: '#1a1a1a',
  };

  const thStyle = {
    padding: '10px',
    borderBottom: '1px solid #FF69B4',
    textAlign: 'left',
    color: '#FF69B4',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #333333',
    color: '#ffffff',
    cursor: 'grab',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const headerStyle = {
    color: '#FF69B4',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#2a2a2a',
    borderRadius: '5px',
  };

  const teamHeaderStyle = {
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#3a3a3a',
  };

  const teamLogoStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  };

  // Filtrar y organizar jugadores por posición y equipo
  const groupByTeam = (playersList) => {
    return playersList.reduce((acc, player) => {
      (acc[player.team] = acc[player.team] || []).push(player);
      return acc;
    }, {});
  };

  const goalkeepers = groupByTeam(players.filter(player => player.position === 'G'));
  const defenders = groupByTeam(players.filter(player => player.position === 'D'));
  const midfielders = groupByTeam(players.filter(player => player.position === 'M'));
  const forwards = groupByTeam(players.filter(player => player.position === 'F'));

  // Funciones para drag and drop con validaciones
  const handleDragStart = (e, player) => {
    e.dataTransfer.setData('player', JSON.stringify(player));
  };

  const handleDrop = (e, positionKey) => {
    e.preventDefault();
    const player = JSON.parse(e.dataTransfer.getData('player'));

    // Verificar límite de 3 jugadores por equipo
    const teamCount = Object.values(fieldPlayers).filter(p => p.team === player.team).length;
    if (teamCount >= 3) return;

    // Verificar que la posición coincida
    if (player.position === positionKey.charAt(0)) {
      setFieldPlayers(prev => ({ ...prev, [positionKey]: player }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemovePlayer = (positionKey) => {
    setFieldPlayers(prev => {
      const newField = { ...prev };
      delete newField[positionKey];
      return newField;
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleTeam = (team) => {
    setExpandedTeams(prev => ({
      ...prev,
      [team]: !prev[team],
    }));
  };

  const handleConfirmTeam = async () => {
    const selectedPlayers = Object.values(fieldPlayers);

    // Verificar si hay usuario logueado
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.idusuario) {
      alert('Por favor inicia sesión primero');
      return;
    }

    try {
      const response = await fetch('https://fantasyfootball-comc.onrender.com/api/team-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.idusuario,
          players: selectedPlayers
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        alert('Equipo enviado con éxito');
      } else {
        throw new Error('Error al enviar el equipo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el equipo');
    }
  };


  const renderCollapsibleTable = (playersByTeam, title, sectionKey) => (
    <div style={sectionStyle}>
      <div style={headerStyle} onClick={() => toggleSection(sectionKey)}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span>{expandedSections[sectionKey] ? '▲' : '▼'}</span>
      </div>
      {expandedSections[sectionKey] && (
        Object.keys(playersByTeam).length > 0 ? (
          Object.entries(playersByTeam).map(([team, teamPlayers]) => (
            <div key={team}>
              <div style={teamHeaderStyle} onClick={() => toggleTeam(team)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={`/images/logos/${team}.png`}
                    alt={`${team} logo`}
                    style={teamLogoStyle}
                    onError={(e) => (e.target.src = '/images/logos/default.png')}
                  />
                  <h4 style={{ margin: 0 }}>{team}</h4>
                </div>
                <span>{expandedTeams[team] ? '▲' : '▼'}</span>
              </div>
              {expandedTeams[team] && (
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamPlayers.map((player) => (
                      <tr
                        key={player.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, player)}
                      >
                        <td style={tdStyle}>{player.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))
        ) : (
          <p style={{ color: '#aaaaaa', padding: '10px' }}>No hay jugadores en esta posición</p>
        )
      )}
    </div>
  );

  const renderPositionSlot = (positionKey, left, top, transform = '') => (
    <div
      style={{ ...positionSlotStyle, left, top, transform }}
      onDrop={(e) => handleDrop(e, positionKey)}
      onDragOver={handleDragOver}
      onClick={() => fieldPlayers[positionKey] && handleRemovePlayer(positionKey)}
    >
      {fieldPlayers[positionKey] ? (
        <>
          <img
            src={`/images/shirts/${fieldPlayers[positionKey].team}.png`}
            alt="Jersey"
            style={jerseyStyle}
            onError={(e) => (e.target.src = '/images/shirts/default_jersey.png')}
          />
          <div style={playerInfoStyle}>
            <span>{fieldPlayers[positionKey].shortname || 'N/A'}</span>
            <img
              src={`/images/flags/${fieldPlayers[positionKey].country}.png`}
              alt={`${fieldPlayers[positionKey].country} flag`}
              style={flagStyle}
              onError={(e) => (e.target.src = '/images/flags/default.png')}
            />
          </div>
        </>
      ) : (
        positionKey.charAt(0)
      )}
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Sección izquierda - Campo de fútbol */}
      <div style={leftSectionStyle}>
        <h2 style={{ color: '#FF69B4', fontSize: '1.5rem', marginBottom: '20px' }}>
          Tu Formación (4-3-3)
        </h2>
        <div style={fieldStyle}>
          {renderPositionSlot('G1', '10%', '40%', 'translateX(-50%)')}
          {renderPositionSlot('D1', '30%', '10%')}
          {renderPositionSlot('D2', '30%', '30%')}
          {renderPositionSlot('D3', '30%', '50%')}
          {renderPositionSlot('D4', '30%', '70%')}
          {renderPositionSlot('M1', '50%', '20%')}
          {renderPositionSlot('M2', '50%', '40%')}
          {renderPositionSlot('M3', '50%', '60%')}
          {renderPositionSlot('F1', '75%', '20%')}
          {renderPositionSlot('F2', '75%', '40%')}
          {renderPositionSlot('F3', '75%', '60%')}
        </div>
        <button style={buttonStyle} onClick={handleConfirmTeam}>
          Confirmar Equipo
        </button>
      </div>

      {/* Sección derecha - Tablas de jugadores */}
      <div style={rightSectionStyle}>
        <h1 style={{ color: '#FF69B4', fontSize: '2.5rem', textAlign: 'center' }}>
          Elige tu Equipo
        </h1>
        <section>
          <h2 style={{ color: '#FF69B4', fontSize: '1.5rem' }}>
            Selecciona tus Jugadores
          </h2>
          <p>Aquí podrás elegir a los mejores jugadores de la Liga 1 para tu equipo fantasy.</p>

          {loading ? (
            <div style={{ marginTop: '20px', color: '#aaaaaa' }}>
              <p>Cargando jugadores...</p>
            </div>
          ) : error ? (
            <div style={{ marginTop: '20px', color: '#ff4444' }}>
              <p>Error: {error}</p>
            </div>
          ) : (
            <div style={{ marginTop: '20px' }}>
              {renderCollapsibleTable(goalkeepers, 'Arqueros (G)', 'goalkeepers')}
              {renderCollapsibleTable(defenders, 'Defensas (D)', 'defenders')}
              {renderCollapsibleTable(midfielders, 'Mediocampistas (M)', 'midfielders')}
              {renderCollapsibleTable(forwards, 'Delanteros (F)', 'forwards')}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TeamSelection;