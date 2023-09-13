import { useState } from 'react'
import './App.css'
import { BsCheck2All } from "react-icons/bs";
import { BiError } from "react-icons/bi";

function App() {
  const [number, setNumber] = useState<number | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [validateNumber, setValidateNumber] = useState<boolean | null>(null)
  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const validationNumber = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setDisabledButton(true)

    if(number !== null) {
      if (number === 0 || number === 100) {
        setResult(`O número não pode ser ${number}!`);
      } else if (number % 2 === 0 && number < 0) {
        setResult(`O número precisa ser positivo!`);
      } else if (number % 2 !== 0 && number > 0 && number < 100) {
        setResult(`O número ${number} não é par!`);
      } else if (number % 2 === 0 && (number < 0 || number > 100)){
        setResult(`O número ${number} não está entre 0 e 100!`);
      } else if (number % 2 !== 0 && (number < 0 || number > 100)){
        setResult(`O número precisa ser par e está entre 0 e 100!`);
      } else {        
        setResult(`O número ${number} atende aos requisitos!`);
      }

      if(number % 2 === 0 && number > 0 && number < 100 ){
        setValidateNumber(true);
      } else {
        setValidateNumber(false);
      }

    setTimeout(() => {
      setValidateNumber(null);
      setDisabledButton(false)
    }, 3000);
    }
  }
  return (
    <div className="flex justify-center  items-center h-screen bg-slate-950 text-slate-300">
      <form className={`flex justify-center flex-col items-center w-4/5 md:w-3/5 lg:w-2/5 bg-slate-900 p-5
        border-solid border-2 border-slate-700 rounded-lg`}>
          <h1 className='text-3xl uppercase mb-5 mt-5'>Valide seu Número</h1>
          <p className='text-center mb-2'>O valor digitado precisa ser:</p>
          <ol className='mb-5'>
            <li>Um número par;</li>
            <li>Um número positivo;</li>
            <li>Um número entre 0 e 100.</li>
          </ol>
          <input type="number" placeholder="Digite um número.." className={`p-3 bg-gray-300 placeholder:text-slate-600
          rounded-lg mb-5 text-gray-900`} onChange={(e) => setNumber(parseInt(e.target.value))} />
          <button onClick={validationNumber} className={`mb-5 bg-green-300 px-5 py-2
           text-gray-700 rounded-lg disabled:bg-gray-400`}
          disabled={disabledButton}>Validar</button>
          
          
          <div className='h-14'>
            {validateNumber !== null && (
              <div
                className={`px-4 py-2 rounded-lg border-solid border-2 ${
                  validateNumber ? "bg-green-300 text-green-900 border-green-900" : "bg-red-300 text-red-900 border-red-900"
                }`}
              >
                <p className='flex items-center gap-2'>{validateNumber ? <BsCheck2All size={30}/> : <BiError size={30}/>} {result}</p>
              </div>
            )}
          </div>
      </form>
    </div>
  )
}

export default App
