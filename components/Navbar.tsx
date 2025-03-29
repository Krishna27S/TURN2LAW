import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/consult">Consult</Link>
            <Link href="/chatbot">Chatbot</Link>
        </nav>
    );
}

