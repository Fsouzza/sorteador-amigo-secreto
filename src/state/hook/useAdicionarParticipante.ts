import { useRecoilValue, useSetRecoilState} from 'recoil';
import { erroState, listaParticipantesState } from '../atom';

export const useAdicionarPaticipante = () => {
  const setLista = useSetRecoilState(listaParticipantesState);
  const lista = useRecoilValue(listaParticipantesState);
  const setErro = useSetRecoilState(erroState)

  return (nomePaticipante: string) => {
    if(lista.includes(nomePaticipante)){
      setErro('Nomes duplicados não são permitidos');
      setTimeout(() => {
        setErro('')
      }, 5000)
      return
    }
    return setLista(listaAtual => [...listaAtual, nomePaticipante])
  }
}