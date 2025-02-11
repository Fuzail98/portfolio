import { SetStateAction } from 'react';
import Nav from '../components/Nav';
import '../styles/global.css';

export default function Projects() {
  return (
    <div className='container'>
      <Nav darkMode={false} setDarkMode={function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
      }} />
      <h1>My Projects</h1>
      <p>Check out some of the projects I've worked on them for real!</p>
    </div>
  );
}
