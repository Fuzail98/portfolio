import { SetStateAction } from 'react';
import Nav from '../components/Nav';
import '../styles/global.css';

export default function About() {
  return (
    <div className='container'>
      <Nav darkMode={false} setDarkMode={function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
      }} />
      <h1>About Me</h1>
      <p>Here's a little bit about myself.</p>
    </div>
  );
}
