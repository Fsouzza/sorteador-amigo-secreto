import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";
import { useNavigate } from 'react-router-dom';
import styles from './Rodape.module.scss';
import { useSorteador } from "../../state/hook/useSorteador";



export const Rodape = () => {
  const participantes = useListaDeParticipantes();
  const navegarPara = useNavigate();
  const sortear = useSorteador();

  const iniciar = () => {
    sortear()
    navegarPara('/sorteio')
  }

  return(
    <footer className={styles.rodape}>
      <button className={styles.rodape__botao} disabled={participantes.length < 3} onClick={iniciar}>Iniciar Brincadeira</button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras"/>
    </footer>
  )
}