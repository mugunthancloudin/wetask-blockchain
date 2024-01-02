import React from 'react' ; 
import './login.css'

export default function Login() {
  return (
    <>
      <div className='container-fluid text-white'>
        <div className='model-box'>
            <div className='box-tittle mt-2'>
                <h5>Log in to Taskon</h5>
            </div>
            <p className='head1 mt-3'>With wallet</p> 
            <div className='box-button1'>
                <div>   
                    <button>Twitter</button>
                    <button>Discord</button>
                </div>
                <div>
                    <button>Telegram</button>
                    <button>Email</button>
                </div>
            </div>
            <p className='head1 mt-3'>With wallet</p>
            <div className='box-button2'>
                <div>
                    <button>WalletConnect</button>
                    <button>Bitget wallet</button>
                </div>
                <div>
                    <button>TronLink</button>
                    <button>OKX Wallet</button>
                </div>
            </div>
            <div>
            <input type='checkbox'/><p>I agree to the Terms of Service and Privacy Policy</p>
            </div>
        </div>
      </div>
    </>
  )
}
