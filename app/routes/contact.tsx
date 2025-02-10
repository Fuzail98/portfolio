import { SetStateAction } from 'react';
import Nav from '../components/Nav';
import '../styles/global.css';

export default function Contact() {
  return (
    <div className='container'>
      <Nav darkMode={false} setDarkMode={function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
      }} />
      <h1>Contact Me</h1>
      <p>You can reach me at fuzi98@gmail.com .</p>
    </div>
  );
}
