import Nav from '~/components/Nav';
// import '../styles/global.css';

export default function Index() {
  return (
    <div>
      <Nav />
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p>I’m Mohamed Fuzail Shareef, a passionate techie.</p>
      </div>
    </div>
  );
}
