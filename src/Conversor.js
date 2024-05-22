import { useEffect, useState } from 'react'

export default function Conversor() {
  const [moedas, setMoedas] = useState([]);
  const [deMoeda, setDeMoeda] = useState('BRL');
  const [paraMoeda, setParaMoeda] = useState('USD');
  const [quantidade, setQuantidade] = useState(1);
  const [resultado, setResultado] = useState(0);
  const API_KEY = '22966a870df0702931eb497b';

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${deMoeda}`)
      .then(response => response.json())
      .then(data => {
        setMoedas([...Object.keys(data.conversion_rates)]);
      })
      .catch(error => console.error('Erro ao buscar moedas:', error));
  }, [deMoeda, API_KEY]);

  const converterMoeda = () => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${deMoeda}/${paraMoeda}/${quantidade}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === "success") {
          setResultado(parseFloat(data.conversion_result).toFixed(2));
        } else {
          console.error('Erro ao converter moeda:', data.error);
        }
      })
      .catch(error => console.error('Erro ao converter moeda:', error));
  };

  return (
    <div>
      <h1>Conversor de Moedas</h1>
      <div className='box'>
        <div className='box-inside'>
          <div>
            <input className='valor' type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
          </div>
          <div className='selecionar'>
            <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
              {moedas.map(moeda => (
                <option key={moeda} value={moeda}>{moeda}</option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill='white' d="M24 12l-9-8v6h-15v4h15v6z"/></svg>
            <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
              {moedas.map(moeda => (
                <option key={moeda} value={moeda}>{moeda}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={converterMoeda}>Converter</button>
      </div>
      <div>
        <h2>Resultado:</h2>
        <p>{paraMoeda} {resultado}</p>
      </div>
    </div>
  );
}