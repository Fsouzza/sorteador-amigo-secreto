import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import { Formulario } from "./Formulario";

describe('O comportamento do Formulário', () => {
  test('Quando o input está vazio, novos participantes não podem ser inseridos', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
    // search Input on DOM
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    // Find Button
    const botao = screen.getByRole('button')
    // Input on file
    expect(input).toBeInTheDocument()
    //Button disabled
    expect(botao).toBeDisabled()
  });
  
  test('Adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
    // search Input on DOM
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    // Find Button
    const botao = screen.getByRole('button')
    // add value on input
    fireEvent.change(input, {
      target: {
        value: 'Ana Carolina'
      }
    })
    // click on sub
    fireEvent.click(botao)
    // input focus active
    expect(input).toHaveFocus()
    // input not value
    expect(input).toHaveValue('')
  });
  
  test('Nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
   
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Ana Carolina'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana Carolina'
      }
    })
    fireEvent.click(botao)
  
    const mensagemDeErro = screen.getByRole('alert')
  
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos')
  });
  
  test('A mensagem de erro deve desaparecer após o timers', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
   
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Ana Carolina'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana Carolina'
      }
    })
    fireEvent.click(botao)
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()
  
    act(() => {
      jest.runAllTimers()
    })
    
    //esperar N segundos
    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  })
})

// jest


