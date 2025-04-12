import React from 'react';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#FF69B4', fontSize: '2.5rem', textAlign: 'center' }}>Reglas del Juego</h1>

      <section>
        <h2 style={{ color: '#FF69B4', fontSize: '1.5rem' }}>¿Cómo funciona?</h2>
        <p>
          En Fantasy Liga 1, creas un equipo virtual con jugadores reales de la Liga 1 peruana.
          Ganas puntos según su desempeño en los partidos reales. Elige estratégicamente a tus jugadores y
          compite por la mayor cantidad de puntos.
        </p>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#FF69B4', fontSize: '1.5rem' }}>Reglas de Selección</h2>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
          <li>Máximo 3 jugadores del mismo equipo.</li>
        </ul>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#FF69B4', fontSize: '1.5rem' }}>Sistema de Puntos</h2>
        <p>Los puntos se calculan según las siguientes acciones:</p>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
          <li><strong>Minutos jugados:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Hasta 60 minutos: +1 punto</li>
            <li>Más de 60 minutos: +2 puntos</li>
            <li>Partido completo (90 minutos): +1 punto adicional</li>
          </ul>
          <li><strong>Goles:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Arquero: +10 puntos</li>
            <li>Defensa: +6 puntos</li>
            <li>Mediocampo: +5 puntos</li>
            <li>Delantero: +4 puntos</li>
            <li>Gol fuera del área: +2 puntos adicionales</li>
          </ul>
          <li><strong>Asistencias:</strong> +3 puntos</li>
          <li><strong>Arco en cero:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Arquero: +5 puntos</li>
            <li>Defensa: +4 puntos</li>
            <li>Mediocampo: +1 punto</li>
          </ul>
          <li><strong>Atajadas (Arquero):</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Cada 3 atajadas: +1 punto</li>
            <li>Atajada de penal: +5 puntos</li>
          </ul>
          <li><strong>Pases (mínimo 30 intentos):</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>70-79% de precisión: +2 puntos</li>
            <li>80-89% de precisión: +4 puntos</li>
            <li>90% o más de precisión: +6 puntos</li>
          </ul>
          <li><strong>Tiros:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Tiro a puerta: +0.5 puntos</li>
            <li>Tiro desviado: +0.25 puntos</li>
          </ul>
          <li><strong>Faltas:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Falta recibida: +0.75 puntos</li>
            <li>Penal provocado: +1 punto</li>
            <li>Penal cometido: -0.5 puntos</li>
          </ul>
          <li><strong>Acciones defensivas:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Entradas exitosas: +1 punto</li>
            <li>Duelos aéreos ganados: +0.5 puntos</li>
          </ul>
          <li><strong>Infracciones:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>Tarjeta amarilla: -1 punto</li>
            <li>Tarjeta roja: -3 puntos</li>
            <li>Autogol: -2 puntos</li>
            <li>Conceder 2 goles (Arquero y Defensas): -2 puntos</li>
            <li>3 fueras de juego: -1 punto</li>
          </ul>
          <li><strong>Bonificaciones especiales:</strong></li>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
            <li>MVP del partido (Elegido por liga 1 max): +3 puntos</li>
            <li>Más puntos en el partido: +1.5 puntos</li>
            <li>Segundo más puntos en el partido: +1 punto</li>
            <li>Tercero más puntos en el partido: +0.5 puntos</li>
          </ul>
        </ul>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#FF69B4', fontSize: '1.5rem' }}>Multiplicadores por Resultado</h2>
        <p>El puntaje total de cada jugador se multiplicará según el resultado del partido:</p>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
          <li>Partido ganado: x1.1</li>
          <li>Partido empatado: x1</li>
          <li>Partido perdido: x0.9</li>
        </ul>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#FF69B4', fontSize: '1.5rem' }}>Cómo Participar</h2>
        <p>
          1. Inicia sesion con el codigo de acceso.<br />
          2. Ve a "Elige tu Equipo" y selecciona tus jugadores.<br />
          3. Sigue los partidos y acumula puntos.
        </p>
      </section>
    </div>
  );
};

export default Home;