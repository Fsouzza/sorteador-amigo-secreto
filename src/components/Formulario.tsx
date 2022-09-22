import { useRef, useState } from "react"
import { useAdicionarPaticipante } from "../state/hook/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro";
import styles from './Formulario.module.scss';

export const Formulario = () => {
  const [nome, setNome] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const adicionarLista = useAdicionarPaticipante();
  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarLista(nome)
    setNome('');
    inputRef.current?.focus();
  }

  return(
    <form onSubmit={adicionarParticipante}>
      <div className={styles.inputBtn}>
        <input
          ref={inputRef}
          value={nome}
          onChange={evento => setNome(evento.target.value)}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
      </div>
        {mensagemDeErro && <p className={styles.alertaErro} role="alert">{mensagemDeErro}</p>}
    </form>
  )
}