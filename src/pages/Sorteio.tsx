import { useState } from "react";
import { Card } from "../components/Card";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import styles from './Soteio.module.scss';

export const Sorteio = () => {
  const participantes = useListaDeParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = useState('');
  const [amigoSecreto, setAmigoSecreto] = useState('');
  const resultado = useResultadoSorteio();
  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if(resultado.has(participanteDaVez)){
      setAmigoSecreto(resultado.get(participanteDaVez)!)
    }
  }

  return(
    <Card>
      <section className={styles.sorteio}>
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select 
            required 
            name='participanteDavez' 
            id='participanteDavez'
            placeholder='Selecione o seu nome'
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value) }
          >
          <option>Selecione o seu nome</option>
          {participantes.map(participante => <option key={participante}>{participante}</option>)}
          </select>
          <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
          <button className={styles.sorteio__botaoSortear}>Sortear</button>
        </form>
        {amigoSecreto && <p className={styles.sorteio__resultado} role='alert'>{amigoSecreto}</p>}
      </section>
      <footer className={styles.sorteio}>
        <img src="/imagens/aviao.png" className={styles.sorteio__aviao} alt='Um desenho de um avião de papel' />
      </footer>
    </Card>
  )
}