import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setLength] = useState(8);
  const [allowNum, setAllowNum] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("")

  //useRef hook
  const copyRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNum) str+="0123456789";
    if (allowChar) str+="`~!@#$%^&*()[{]}'?+_=-";

    for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random()*str.length +1);
        pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,allowNum,allowChar,setPassword])

  const copyPassword = useCallback(()=>{
    copyRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,allowChar,allowNum,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-xl rounded-lg text-orange-600 px-4 py-4 my-5 bg-gray-600 font-bold' >
        <h1 className='text-center text-white'>Password Generator</h1>
        <div>
          <input 
          type="text"
          value={password}
          placeholder='password'
          ref={copyRef}
          className='outline-none w-80 py-1 px-3 my-2 mx-2 rounded-lg' />
          <button
          onClick={copyPassword}
          className='outline-none text-white bg-blue-700 px-2 py-1 rounded-md shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}} />
        <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={allowNum}
          id='NumInput'
          onChange={()=> {setAllowNum((prev)=>!prev);}} />
          <label htmlFor="">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={allowChar}
          id='NumInput'
          onChange={()=> {setAllowChar((prev)=>!prev);}} />
          <label htmlFor="">Charecters</label>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
