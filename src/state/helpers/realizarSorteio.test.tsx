import { realizarSorteio } from "./realizarSorteio"

describe('Dado um sorteio de amigo secreto', () => {

  test('Cada participante não sorteia o prórprio nome', () => {
    const participantes = [
      'Ana',
      'Catarina',
      'Juliana',
      'Joao',
      'Vinicius',
      'Nathalia'
    ]

    const sorteio = realizarSorteio(participantes)
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante)
      expect(amigoSecreto).not.toEqual(participante)
    })
  })
})